import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";
import { getMaxId, removeObjectFromArray } from '../../utils/functions';
import { BusinessModel, GenreMode, ImageType, LinkType, Platform } from '../../utils/types';

import { useTerm } from '../TermProvider';
import { useRequest } from '../Request';
import { useTheme } from '../Theme';
import ImageCarousel from '../../components/ImageCarousel';
import BusinessModelCard from '../../components/BusinessModelCard';
import PlatformLinkList from '../../components/PlatformLink/PlatformLinkList';
import GenreModeCard from '../../components/GenreModeCard';

type GameData = {
  id: number;
  name: string;
  link: string;
  images: ImageType[];
  loading: boolean;
  linkList: LinkType[];
  gameTime: Number | string | null;
  modeList: GenreMode[];
  platform: Platform | null;
  genreList: GenreMode[];
  imageName: string;
  imageLink: string;
  tagValueList: number;
  businessModel: BusinessModel | null;
  businessModelId: number;
  businessModelList: BusinessModel[];

  setId: (value: number) => void;
  setName: (value: string) => void;
  setLink: (value: string) => void;
  setImages: (value: ImageType[]) => void;
  setLoading: (value: boolean) => void;
  setGameTime: (value: Number| string | null) => void;
  setPlatform: (value: Platform | null) => void;
  setModeList: (value: GenreMode[]) => void;
  setLinkList: (value: LinkType[]) => void;
  setGenreList: (value: GenreMode[]) => void;
  setImageName: (value: string) => void;
  setImageLink: (value: string) => void;
  setTagValueList: (value: number) => void;
  setBusinessModel: (value: BusinessModel | null) => void;
  setBusinessModelList: (value: BusinessModel[]) => void;

  addLink: () => void;
  addImage: () => void;
  loadGame: (id: number) => Promise<void>;
  createGame: () => Promise<void>;
  updateGame: () => Promise<void>;
  deleteGame: (callback?: () => void, gameId?: number) => Promise<void>;
  addBusinessModel: () => void;

  renderLinks: (allowRemove?: boolean) => React.ReactElement;
  renderImages: (allowRemove?: boolean) => React.ReactElement | undefined;
  renderBusinessModel: (isEdit?: boolean, showTitle?: boolean) => React.ReactElement;
  renderGenreMode: (isGenre: boolean) => React.ReactElement;

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
  const [images, setImages] = useState([] as ImageType[]);
  const [gameTime, setGameTime] = useState<Number | string | null>(null);
  const [linkList, setLinkList] = useState([] as LinkType[]);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [modeList, setModeList] = useState<GenreMode[]>([]);
  const [genreList, setGenreList] = useState<GenreMode[]>([]);
  const [imageName, setImageName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [tagValueList, setTagValueList] = useState(0);
  const [businessModel, setBusinessModel] = useState<BusinessModel | null>(null);
  const [businessModelId, setBusinessModelId] = useState(0);
  const [businessModelList, setBusinessModelList] = useState<BusinessModel[]>([]);

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

  function addBusinessModel()
  {
    if (!businessModel) {
      return Alert.alert(getTerm(100125), getTerm(100126));
    }

    setBusinessModelList([...businessModelList, businessModel]);
    setBusinessModel(null);
  }

  function renderLinks(allowRemove = false) {
    return (
      <PlatformLinkList
        linkList={linkList}
        setLinkList={setLinkList}
        allowRemove={allowRemove}
      />
    )
  }

  function renderImages(isEdit?: boolean)
  {
    if (images.length > 0) {
      return (
        <ImageCarousel
          imageCarouselPreview={isEdit}
          data={images}
          setData={setImages}
        />
      );
    }
  }

  function renderBusinessModel(isEdit?: boolean, showTitle?: boolean)
  {
    let content;

    if (businessModelList.length == 0) {
      content = (
        <Text
          style={[styles.noContentText]}
        >
          {getTerm(100122)}
        </Text>
      );
    } else {
      content = businessModelList.map((businessModel) => (
        <BusinessModelCard
          hideBottom
          id={businessModel.id}
          key={businessModel.id}
          name={businessModel.name}
          onPress={() => {}}
          disabled={!isEdit}
          description={businessModel.description}
          setLoading={setLoading}
          deleteCustomFunction={isEdit ? () => removeObjectFromArray(businessModel.id, businessModelList, setBusinessModelList) : () => {}}
        />
      ));
    }

    return (
      <View>
        {showTitle &&
          <Text
            style={[styles.subtitle, textColorStyle]}
          >
            {getTerm(100121)}:
          </Text>}

        {content}
      </View>
    );
  }

  function renderGenreMode(isGenre: boolean)
  {
    let content;

    const list = isGenre ? genreList : modeList;

    if (list.length == 0) {
      content = (
        <Text
          style={[styles.noContentText]}
        >
          {getTerm(100122)}
        </Text>
      );
    } else {
      content = list.map((item) => (
        <GenreModeCard
          hideBottom
          id={item.id}
          key={item.id}
          name={item.name}
          disabled={true}
          setLoading={setLoading}
          deleteCustomFunction={() => removeObjectFromArray(item.id, isGenre ? genreList : modeList, isGenre ? setGenreList : setModeList)}
        />
      ));
    }

    return (
      <View>
        {content}
      </View>
    );
  }

  async function loadGame(id: number)
  {
    setLoading(true);

    try {
      const response = await get(`/game/${id}`);

      setId(response.id);
      setName(response.name);
      setImages(response.imageList.images);
      setModeList(response.modes);
      setGameTime(response.gameTime);
      setLinkList(response.linkList.externalLinks);
      setGenreList(response.genres);
      setTagValueList(response.tagList.id);
      setBusinessModelId(response.businessModelList.id);
      setBusinessModelList(response.businessModelList.businessModels);
    } catch (error) {
      Alert.alert(getTerm(100071), getTerm(100072));
    }

    setLoading(false);
  }

  async function deleteGame(callback?: () => void, gameId?: number)
  {
    Alert.alert(getTerm(100061), getTerm(100154), [
      {text: getTerm(100040), onPress: async () => {
        try {
          const defaultFunction = () => {};
          await destroy(`game/destroy/${gameId || id}`, callback || defaultFunction, setLoading);
        } catch (error) {
          Alert.alert(getTerm(100073), getTerm(100074));
        }
      }},
      {text: getTerm(100041)}
    ]);
  }

  async function updateGame()
  {
    try {
      const externalLinks = linkList.filter(link => link.link !== "");
      const imageList = images.filter(image => image.link !== "");

      if (validateGame(externalLinks, imageList)) {
        const businessModel = businessModelList.map(businessModel => businessModel.id);

        const response = await put(`/game/update`, setLoading, {
          id, new_name: name, new_description: name, externalLinks,
          images: imageList, businessModel, genres: genreList.map(genre => genre.id), modes: modeList.map(mode => mode.id)
        });

        setId(response.id);
        setName(response.name);
        setImages(response.imageList.images);
        setModeList(response.modes);
        setGameTime(response.gameTime);
        setLinkList(response.linkList.externalLinks);
        setGenreList(response.genres);
        setTagValueList(response.tagList.id);
        setBusinessModelId(response.businessModelList.id);
        setBusinessModelList(response.businessModelList.businessModels);
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

      if (validateGame(externalLinks, imageList)) {
        const businessModel = businessModelList.map(businessModel => businessModel.id);

        const response = await post(`/game/create`, setLoading, {
          name, externalLinks, images: imageList, businessModel, genres: genreList.map(genre => genre.id), modes: modeList.map(mode => mode.id)
        });

        setId(response.id);
        setName(response.name);
        setImages(response.imageList.images);
        setModeList(response.modes);
        setGameTime(response.gameTime);
        setLinkList(response.linkList.externalLinks);
        setGenreList(response.genres);
        setTagValueList(response.tagList.id);
        setBusinessModelId(response.businessModelList.id);
        setBusinessModelList(response.businessModelList.businessModels);
      }
    } catch (error) {
      Alert.alert(getTerm(100077), getTerm(100078));
    }
  }

  function validateGame(externalLinks: LinkType[], imageList: ImageType[])
  {
    if (!name.trim()) {
      Alert.alert(getTerm(100093), getTerm(100094));
      return false;
    }

    if (externalLinks.length === 0) {
      Alert.alert(getTerm(100089), getTerm(100090));
      return false;
    }

    if (imageList.length === 0) {
      Alert.alert(getTerm(100091), getTerm(100092));
      return false;
    }

    return true;
  }

  function clearGameContext()
  {
    setId(0);
    setName("");
    setImages([]);
    setLinkList([]);
    setLoading(true);
    setTagValueList(0);
    setBusinessModel(null);
    setBusinessModelId(0);
    setBusinessModelList([]);
  }

  return (
    <GameContext.Provider value={{
      id, name, link, imageName, imageLink, loading, images, linkList, platform, genreList,
      tagValueList,businessModel, businessModelList, businessModelId, gameTime, modeList,
      setId, setName, setLink, setImageName, setImageLink, setLoading, setImages, setGameTime,
      setLinkList, setPlatform, setBusinessModel, setTagValueList, setBusinessModelList, setGenreList,
      addLink, addImage, renderLinks, renderImages, renderBusinessModel, loadGame, renderGenreMode,
      createGame, updateGame, deleteGame, clearGameContext, addBusinessModel, setModeList
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = ()=> {
  return useContext(GameContext);
};