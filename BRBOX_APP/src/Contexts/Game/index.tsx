import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import config from "../../../brbox.config.json";
import { getMaxId, removeObjectFromArray, splitText } from '../../utils/functions';
import { ImageType, LinkType, Platform } from '../../utils/types';
import Carousel from 'react-native-reanimated-carousel';
import CarouselImage from '../../components/CarouselImage';

import { useTerm } from '../TermProvider';
import { useRequest } from '../Request';
import { useAuth } from '../Auth';
import { useTheme } from '../Theme';

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

  renderLinks: () => React.ReactElement[];
  renderImages: (allowRemove: boolean) => React.ReactElement | undefined;
  clearGameContext: () => void;
}

type GameProviderProps = {
  children: ReactNode;
}

const GameContext = createContext({} as GameData);

export const GameProvider: React.FC<GameProviderProps> = ({children}) =>
{
  const {getTerm} = useTerm();
  const {user, setUser} = useAuth();
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

  function renderLinks() {
    const links = new Array();

    for (const link of linkList) {
      if (link.link) {
        links.push(
          <View style={styles.linkContainer} key={link.id}>
            <Text style={[styles.linkText, textColorStyle]}>{splitText(link.platformName, 40)}</Text>
            <TouchableOpacity style={styles.xButton} onPress={() => removeObjectFromArray(link.id, linkList, setLinkList)}>
              <Icon name="close" size={35} color={"#686868"}/>
            </TouchableOpacity>
          </View>
        );
      }
    }

    return links;
  }

  function renderImages(allowRemove = false) {
    if (images.length > 0) {
      return (
        <Carousel
            style={{width: "100%", marginBottom: 30}}
            loop
            pagingEnabled={true}
            snapEnabled={true}
            autoPlay={false}
            mode="parallax"
            modeConfig={{
                parallaxScrollingScale: 1,
                parallaxScrollingOffset: 0,
            }}
            data={images}
            height={allowRemove ? 230 : 180}
            width={340}
            windowSize={1}
            renderItem={
              ({item}: any) => {
                if (!item.link) return <View />;
                return (
                  <CarouselImage
                    key={item.id}
                    imageUri={item.link}
                    allowRemove={allowRemove}
                    callback={() => removeObjectFromArray(item.id, images, setImages)}
                  />
                )
              }
            }
          />
      )
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

  /* useEffect(() => {
    console.log(linkList);
  }, [linkList]); */

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