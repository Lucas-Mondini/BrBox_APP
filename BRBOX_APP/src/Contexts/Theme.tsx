import AsyncStorage from '@react-native-community/async-storage';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import config from "../../brbox.config.json";

const defaultTheme: ThemeData = {
  dark: "#191A19",
  darkGray: "#242424",
  mediumGray: "#3A3A3A",
  light: "#E7E7E7",
  greenLight: "#D8E9A8",
  mediumGreen: "#85F482",
  darkGreen: "#1E5128",
  greenBar: "#4E9F3D",
  red: "#FF3636",
  lightRed: "#FE8787",
  yellow: "#FECE87",
  yellowBright: "#F7D609",
  orange: "#FF6600",
  mainIconColor: "#686868",
  placeholdersColor: "#7F7F7F",
  subTitleMainColor: "#BFBFBF"
}

export type ThemeData = {
  dark: string,
  darkGray: string,
  mediumGray: string,
  light: string,
  greenLight: string,
  mediumGreen: string,
  darkGreen: string,
  greenBar: string,
  red: string,
  lightRed: string,
  yellow: string,
  yellowBright: string,
  orange: string,
  mainIconColor: string,
  placeholdersColor: string,
  subTitleMainColor: string,
}

interface ThemeContextData extends ThemeData {
  setTheme: (a: ThemeData) => void
}

type ThemeProviderProps = {
  children: ReactNode;
}

const ThemeContext = createContext({} as ThemeContextData);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState<ThemeData>(defaultTheme)

  return (
    <ThemeContext.Provider value={{
      ...theme,
      setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );

}

export const useTheme = () => {
  return useContext(ThemeContext);
};