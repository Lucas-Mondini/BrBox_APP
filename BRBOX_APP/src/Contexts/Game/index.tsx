import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Alert, Linking, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import config from "../../../brbox.config.json";
import { getMaxId, removeObjectFromArray, splitText } from '../../utils/functions';
import { ImageType, LinkType, Platform } from '../../utils/types';

import { useTerm } from '../TermProvider';
import { useRequest } from '../Request';
import { useTheme } from '../Theme';
import ImageCarousel from '../../components/ImageCarousel';
import ImageCarouselPreview from '../../components/ImageCarouselPreview';

type GameData = {
  id: number;
  name: string;
  link: string;
  images: ImageType[];
  loading: boolean;
  linkList: LinkType[];
  platform: Platform | null;
  imageName: string;
  imageLink: string;
  tagValueList: number;

  setId: (value: number) => void;
  setName: (value: string) => void;
  setLink: (value: string) => void;
  setImages: (value: ImageType[]) => void;
  setLoading: (value: boolean) => void;
  setPlatform: (value: Platform | null) => void;
  setLinkList: (value: LinkType[]) => void;
  setImageName: (value: string) => void;
  setImageLink: (value: string) => void;
  setTagValueList: (value: number) => void;

  addLink: () => void;
  addImage: () => void;
  loadGame: (id: number) => Promise<void>;
  createGame: () => Promise<void>;
  updateGame: () => Promise<void>;
  deleteGame: (callback?: () => void) => Promise<void>;

  renderLinks: (allowRemove?: boolean) => React.ReactElement[];
  renderImages: (allowRemove?: boolean) => React.ReactElement | undefined;
  clearGameContext: () => void;
}

type GameProviderProps = {
  children: ReactNode;
}

const GameContext = createContext({} as GameData);

export const GameProvider: React.FC<GameProviderProps> = ({children}) =>
{
  const {getTerm} = useTerm();
  const {get, put, post, destroy} = useRequest();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [images, setImages] = useState([] as ImageType[]);
  const [linkList, setLinkList] = useState([] as LinkType[]);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [tagValueList, setTagValueList] = useState(0);

  const [loading, setLoading] = useState(false);

  const { darkMode } = useTheme();

  const textColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  function addLink() {
    if (!platform) {
      return Alert.alert(getTerm(100063), getTerm(100064));
    }

    if (!link.trim()) {
      return Alert.alert(getTerm(100065), getTerm(100066));
    }

    setLinkList([...linkList, {id: getMaxId(linkList), platform: platform.id, platformName: platform.name, link: link}]);
    setLink("");
    setPlatform(null);
  }

  function addImage() {
    if (!imageName.trim()) {
      return Alert.alert(getTerm(100067), getTerm(100068));
    }

    if (!imageLink.trim()) {
      return Alert.alert(getTerm(100069), getTerm(100070));
    }

    setImageName("");
    setImageLink("");
    setImages([...images, {id: getMaxId(images), name: imageName, link: imageLink}]);
  }

  function renderLinks(allowRemove = false) {
    const links = new Array();

    for (const link of linkList) {
      if (link.link) {
        links.push(
          <TouchableOpacity style={styles.linkContainer}
            key={link.id}
            activeOpacity={allowRemove ? 1 : 0.8}
            onPress={async () => {
              if (!allowRemove) {
                await Linking.openURL(link.link);
              }
            }}
          >
            <Text style={[styles.linkText, textColorStyle]}>{splitText(link.platformName, 40)}</Text>
            {allowRemove &&
              <TouchableOpacity style={styles.xButton} onPress={() => removeObjectFromArray(link.id, linkList, setLinkList)}>
                <Icon name="close" size={35} color={"#686868"}/>
              </TouchableOpacity>
            }
          </TouchableOpacity>
        );
      }
    }

    return links;
  }

  function renderImages(isEdit?: boolean)
  {
    if (images.length > 0) {
      return !isEdit
      ? (
        <ImageCarousel
          data={images}
        />
      )
      : (
        <ImageCarouselPreview
          images={images}
          setImages={setImages}
        />
      );
    }
  }

  async function loadGame(id: number)
  {
    try {
      const response = await get(`/game/${id}`, setLoading);

      setId(response.id);
      setName(response.name);
      setLinkList(response.linkList.externalLinks);
      setImages(response.imageList.images);
      setTagValueList(response.tagList.id);
    } catch (error) {
      Alert.alert(getTerm(100071), getTerm(100072));
    }
  }

  async function deleteGame(callback?: () => void)
  {
    try {
      const defaultFunction = () => {};
      await destroy(`game/destroy/${id}`, callback || defaultFunction, setLoading);
    } catch (err) {
      Alert.alert(getTerm(100073), getTerm(100074));
    }
  }

  async function updateGame()
  {
    try {
      const externalLinks = linkList.filter(link => link.link !== "");
      const imageList = images.filter(image => image.link !== "");

      if (imageList.length > 0 && externalLinks.length > 0) {
        const response = await put(`/game/update`, setLoading, {
          id, new_name: name, new_description: name, externalLinks, images: imageList
        });

        setId(response.id);
        setName(response.name);
        setImages(response.imageList.images);
        setLinkList(response.linkList.externalLinks);
        setTagValueList(response.tagList.id);
      }
    } catch (error) {
      Alert.alert(getTerm(100075), getTerm(100076));
    }
  }

  async function createGame()
  {
    try {
      const externalLinks = linkList.filter(link => link.link !== "");
      const imageList = images.filter(image => image.link !== "");

      if (imageList.length > 0 && externalLinks.length > 0) {
        const response = await post(`/game/create`, setLoading, {
          name, externalLinks, images: imageList
        });

        setId(response.id);
        setName(response.name);
        setImages(response.imageList.images);
        setLinkList(response.linkList.externalLinks);
        setTagValueList(response.tagList.id);
      }
    } catch (error) {
      Alert.alert(getTerm(100077), getTerm(100078));
    }
  }

  function clearGameContext()
  {
      setId(0);
      setName("");
      setLinkList([]);
      setImages([]);
      setTagValueList(0);
  }

  return (
    <GameContext.Provider value={{
      id, name, link, imageName, imageLink, loading, images, linkList, platform, tagValueList,
      setId, setName, setLink, setImageName, setImageLink, setLoading, setImages, setLinkList, setPlatform, setTagValueList,
      addLink, addImage, renderLinks, renderImages, loadGame, createGame, updateGame, deleteGame, clearGameContext
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = ()=> {
  return useContext(GameContext);
};