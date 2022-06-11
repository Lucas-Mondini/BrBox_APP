import React, { createContext, ReactNode, useContext } from 'react';

import api from '../services/api';
import { useAuth } from './Auth';

type RequestData = {
  get: (route: string, setLoading: Function) => any;
  put: (route: string, setLoading: Function, data: any, allowNoUser?: boolean) => any;
  post: (route: string, setLoading: Function, data: any, allowNoUser?: boolean) => any;
  destroy: (route: string, callback: Function, setLoading?: Function) => any;
}

type RequestProviderProps = {
  children: ReactNode;
}

const RequestContext = createContext({} as RequestData);

export const RequestProvider: React.FC<RequestProviderProps> = ({children}) =>
{
  const {user, temporaryToken} = useAuth();

  async function get(route: string, setLoading: Function)
  {
    try {
      setLoading(true);

      if (!user) {
        setLoading(false);
        throw new Error("User not found");
      }

      const result = await api.get(route, {
        headers: {auth_token: user.auth_token}
      });

      if (!result || !result.data) {
        setLoading(false);
        throw new Error("No data");
      }

      setLoading(false);
      return result.data;
    } catch (error: any) {
      setLoading(false);

      throw new Error(JSON.stringify({status: error.response.status, error: error.response.message}));
    }
  }

  async function post(route: string, setLoading: Function, data: any, allowNoUser?: boolean)
  {
    try {
      setLoading(true);

      if (!user && !allowNoUser) {
        setLoading(false);
        throw new Error("User not found");
      }

      const result = await api.post(route, data, allowNoUser ? {} : {headers: {auth_token: user?.auth_token ? user?.auth_token : temporaryToken}});

      setLoading(false);
      return result.data;
    } catch (error: any) {
      setLoading(false);
      throw new Error(JSON.stringify({status: error.response.status, error: error.response.message}));
    }
  }

  async function put(route: string, setLoading: Function, data: any)
  {
    try {
      setLoading(true);

      if (!user && !temporaryToken) {
        setLoading(false);
        throw new Error("User not found");
      }

      const result = await api.put(route, data, {headers: {auth_token: user?.auth_token ? user?.auth_token : temporaryToken}});

      setLoading(false);
      return result.data;
    } catch (error: any) {
      setLoading(false);
      throw new Error(JSON.stringify({status: error.response.status, error: error.response.message}));
    }
  }

  async function destroy(route: string, callback: Function, setLoading?: Function)
  {
    try {
      if (setLoading) setLoading(true);

      if (!user) {
        throw new Error("User not found");
      }

      await api.delete(route, {headers: {auth_token: user.auth_token}});

      if (setLoading) setLoading(false);
      callback();
    } catch (error: any) {
      if (setLoading) setLoading(false);
      throw new Error(JSON.stringify({status: error.response.status, error: error.response.message}));
    }
  }

  return (
    <RequestContext.Provider value={{
      get,
      put,
      post,
      destroy
    }}>
      {children}
    </RequestContext.Provider>
  );

}

export const useRequest = () => {
  return useContext(RequestContext);
};