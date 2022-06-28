import AsyncStorage from '@react-native-community/async-storage';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { User } from '../utils/types';

type AuthData = {
  signed: boolean;
  user: User | null;
  temporaryToken: string;
  loading: boolean;
  firstLoad: boolean;
  setLoading: (value: boolean) => void;
  signIn: (email: string, pass: string, errorCallback?: Function) => void;
  register: (name: string, email: string, pass: string, confPass: string, errorCallback?: Function) => void;
  signOut: () => void;
  checkLogin: () => void;
  string: string;
  setString: (value: string) => void;
  setTemporaryToken: (value: string) => void;
  setUser: (info: User) => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthData);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) =>
{
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [string, setString] = useState('');
  const [temporaryToken, setTemporaryToken] = useState('');

  async function checkLogin() {
    try {
      setLoading(true);

      const userData = await AsyncStorage.getItem('user');

      if(userData) {
        const userJson = JSON.parse(userData);

        let response = await api.get(`/user/${userJson.id}`, {headers: {auth_token: userJson.auth_token}});

        setUser({...response.data, auth_token: userJson.auth_token});
      }

      setLoading(false);
    } catch(err) {
      return signOut();
    }

    setFirstLoad(false);
  }

  async function signIn(email: string, password: string, errorCallback?: Function) {
    try {
      setLoading(true);

      const response = await api.post(`/user/login`,{
        email, password
      });

      setUser(response.data);
      await AsyncStorage.setItem("user", JSON.stringify(response.data));

      setLoading(false);
    } catch (err) {
      signOut();
      setLoading(false);
      if (errorCallback) errorCallback();
    }
  }

  async function register(username: string, email: string, password: string, confirm_password: string, errorCallback?: Function) {
    try {
      setLoading(true);

      if (password !== confirm_password) {
        setLoading(false);
        if (errorCallback) return errorCallback(401);
      }

      const response = await api.post(`/user/create`,{
        username, email, password,
        confirm_password
      });

      setUser(response.data);
      await AsyncStorage.setItem('user', JSON.stringify(response.data));

      setLoading(false);
    } catch (err: any) {
      signOut();
      setLoading(false);
      if (errorCallback) errorCallback();
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.clear();
    return;
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{
      signed: Boolean(user),
      user,
      temporaryToken,
      loading,
      firstLoad,
      setLoading,
      signIn,
      signOut,
      checkLogin,
      register,
      string,
      setTemporaryToken,
      setString,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = ()=> {
  return useContext(AuthContext);
};