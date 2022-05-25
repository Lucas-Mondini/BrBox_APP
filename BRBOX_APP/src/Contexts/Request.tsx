import React, { createContext, ReactNode, useContext } from 'react';
//import storage from '@react-native-firebase/storage';

import api from '../services/api';
import { useAuth } from './Auth';
//import { PhotoType } from '../utils/types';

type RequestData = {
  get: (route: string, setLoading: Function) => any;
  put: (route: string, setLoading: Function, data: any, allowNoUser?: boolean) => any;
  post: (route: string, setLoading: Function, data: any, allowNoUser?: boolean) => any;
  destroy: (route: string, callback: Function, setLoading?: Function) => any;
  //uploadPhoto: (route: string, setLoading: Function, photo: PhotoType | undefined) => any;
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
      console.log(error.message);
      throw new Error(error.response.status);
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
      console.log(error);
      //throw new Error(error.response.status);
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
      throw new Error(error.response.status);
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
      throw new Error(error.response.status);
    }
  }

  /* async function uploadPhoto(route: string, setLoading: Function, photo: PhotoType | undefined)
  {
      if (!photo) {
        throw new Error("Photo not found");
      }

      setLoading(true);

      if (!user) {
        throw new Error("User not found");
      }

      const reference = storage().ref(route);

      try {
        await reference.delete();
      } finally {
        if (!photo || !photo.uri) return;

        const pathToFile = photo.uri;

        await reference.putFile(pathToFile);

        return await reference.getDownloadURL();
      }

  } */

  return (
    <RequestContext.Provider value={{
      get,
      put,
      post,
      destroy,
      //uploadPhoto
    }}>
      {children}
    </RequestContext.Provider>
  );

}

export const useRequest = () => {
  return useContext(RequestContext);
};