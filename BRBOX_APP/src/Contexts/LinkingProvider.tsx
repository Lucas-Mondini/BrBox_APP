import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Linking, Share } from 'react-native';

import config from "../../brbox.config.json";

type LinkingData = {
  gameId: number | null;
  recommendIndex: number;
  share: (message: string, endpoint: "playStore" | "api", extraUrl?: string) => Promise<void>;
  openUrl: (url: string) => Promise<void>;
  deepLinking: (navigation?: any) => void;
  setRecommendIndex: (value: number) => void;
  removeLinkingListener: () => void;
}

type LinkingProviderProps = {
  children: ReactNode;
}

const LinkingContext = createContext({} as LinkingData);

export const LinkingProvider: React.FC<LinkingProviderProps> = ({children}) =>
{
  const [gameId, setGameId] = useState<number|null>(null);
  const [recommendIndex, setRecommendIndex] = useState(0);

  /**
   * Extract info from the provide url
   * @return object
  */
  function extractInfo(url: string)
  {
    const route = url.replace(/.*?:\/\//g, '') || "";

    const routeMatch = route.match(/\/([^\/]+)\/?$/);
    const id = routeMatch && routeMatch[1]  ? routeMatch[1] : "0";

    const routeName = route.split('/')[0];

    return {id: Number(id), routeName: routeName};
  }

  /**
   * Create the eventListener for the url change
   * @param navigation
   */
  function deepLinking(navigation?: any): void
  {
    Linking.addEventListener("url", (event: any) => {
      removeLinkingListener();

      const {id, routeName} = extractInfo(event.url);

      if (routeName === 'gameinfo') {
        if (Boolean(navigation)) navigation.push('GameInfo', { id });
        else setGameId(id);
      }
    });
  }

  /**
   * Opens a given URL
   * @param url
   */
  async function openUrl(url: string): Promise<void>
  {
    await Linking.openURL(url);
  }

  /**
   * Share a given endpoint url with a message
   * @param message
   * @param endpoint
   */
  async function share(message: string, endpoint: "playStore" | "api", extraUrl?: string): Promise<void>
  {
    const endpoints = {
      "playStore": config.playStoreUrl,
      "api": config.apiUrl,
    }

    await Share.share({
      message: message+"\n\n\n"+endpoints[endpoint]+extraUrl,
    });
  }

  /**
   * Removes the url event listener from the deep linking
   * @return void
   */
  function removeLinkingListener(): void
  {
    setGameId(null);
    Linking.removeAllListeners('url');
  }

  /**
   * Function execute on app start
   * @return void
   */
  async function onLoad(): Promise<void>
  {
    const {id} = extractInfo(await Linking.getInitialURL() || "");

    if (id) setGameId(id);
  }

  /**
   * Saves recommend index
   * @return void
   */
  async function saveRecommendedIndex()
  {
    AsyncStorage.setItem('recommendedIndex', String(recommendIndex));
  }

  /**
   * Loads recommended index
   * @return void
   */
  async function getRecommendedIndex()
  {
    const recommendedIndexSaved = await AsyncStorage.getItem('recommendedIndex');

    setRecommendIndex(Number(recommendedIndexSaved) || 0);
  }

  useEffect(() => {
    onLoad();
    getRecommendedIndex();
  }, []);

  useEffect(() => {
    saveRecommendedIndex();
  }, [recommendIndex]);

  return (
    <LinkingContext.Provider value={{
      gameId,
      recommendIndex,
      share,
      openUrl,
      deepLinking,
      setRecommendIndex,
      removeLinkingListener
    }}>
      {children}
    </LinkingContext.Provider>
  );

}

export const useLinking = ()=> {
  return useContext(LinkingContext);
};