import AsyncStorage from '@react-native-community/async-storage';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import config from "../../brbox.config.json";

type ThemeData = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

type ThemeProviderProps = {
  children: ReactNode;
}

const ThemeContext = createContext({} as ThemeData);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) =>
{
  const [darkMode, setDarkMode] = useState(false);

  async function getDarkMode()
  {
    try {
      const savedDarkMode = JSON.parse(await AsyncStorage.getItem('darkMode') || config.isDarkModeDefault);

      setDarkMode(savedDarkMode);
    } catch (e) {
      return false;
    }
  }

  async function saveDarkMode()
  {
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (e) {
      return;
    }
  }

  useEffect(() => {
    getDarkMode();
  }, []);

  useEffect(() => {
    saveDarkMode();
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{
      darkMode,
      setDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  );

}

export const useTheme = ()=> {
  return useContext(ThemeContext);
};