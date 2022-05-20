import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { NativeModules, Platform } from 'react-native';
import config from '../../../brbox.config.json';

type TermData = {
  getTerm: (code: number) => string;
}

type TermProviderProps = {
  children: ReactNode;
}

const TermContext = createContext({} as TermData);

export const TermProvider: React.FC<TermProviderProps> = ({children}) =>
{
  const [terms, setTerms] = useState([]);
  const locale = Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
   || NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

  function getAllTherms()
  {
    const terms = require(`../../term`);

    if (!terms.default[locale]) {
      return setTerms(terms.default[config.defaultLanguage]);
    }

    setTerms(terms.default[locale]);
  }

  function getTerm(code: number)
  {
    return terms[code];
  }

  useEffect(() => {
    getAllTherms();
  }, []);

  return (
    <TermContext.Provider value={{
      getTerm
    }}>
      {children}
    </TermContext.Provider>
  );
}

export const useTerm = ()=> {
  return useContext(TermContext);
};