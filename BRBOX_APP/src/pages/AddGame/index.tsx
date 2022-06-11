import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import MainView from '../../components/MainView';
import { useAuth } from '../../Contexts/Auth';
import { useRequest } from '../../Contexts/Request';
import { useTerm } from '../../Contexts/TermProvider';

import config from "../../../brbox.config.json";
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ImageType, LinkType, Params, Platform } from '../../utils/types';
import { getMaxId, removeObjectFromArray, splitText } from '../../utils/functions';
import CarouselImage from '../../components/CarouselImage';
import PlatformsModal from '../../components/PlatformsModal';

const AddGame = () => {
  const navigation = useNavigation<any>();
  const {user, setUser} = useAuth();
  const {getTerm} = useTerm();
  const {get, put, post} = useRequest();
  const route = useRoute();
  const params = route.params as Params;

  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [linkList, setLinkList] = useState([] as LinkType[]);
  const [link, setLink] = useState("");
  const [platform, setPlatform] = useState<Platform | null>();
  const [images, setImages] = useState([] as ImageType[]);
  const [imageName, setImageName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [modal, setModal] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const textColorStyle = {
    color: isDarkMode ? "#fff" : config.dark,
  };

  function addLink() {
    if (!platform) {
      return Alert.alert("Faltou a plataforma", "Escolha uma plataforma para adicionar o link");
    }

    if (!link.trim()) {
      return Alert.alert("Faltou o link", "Preencha o link da plataforma para adicionar o link a lista");
    }

    setLinkList([...linkList, {id: getMaxId(linkList), platform: platform.id, link: link}]);
    setLink("");
    setPlatform(null);
  }

  function addImage() {
    if (!imageName.trim()) {
      return Alert.alert("Faltou o nome da imagem", "Dê um nome para a imagem para adicioná-la na lista");
    }

    if (!imageLink.trim()) {
      return Alert.alert("Faltou o link da imagem", "Adicione o link de uma imagem para adicioná-la na lista");
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
            <Text style={[styles.linkText, textColorStyle]}>{splitText(link.link, 40)}</Text>
            <TouchableOpacity style={styles.xButton} onPress={() => removeObjectFromArray(link.id, linkList, setLinkList)}>
              <Icon name="close" size={35} color={"#686868"}/>
            </TouchableOpacity>
          </View>
        );
      }
    }

    return links;
  }

  function renderImages() {
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
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
            }}
            data={images}
            height={300}
            width={340}
            windowSize={1}
            renderItem={
              ({item}: any) => {
                if (!item.link) return <View />;
                return (
                  <CarouselImage
                    imageUri={item.link}
                    callback={() => removeObjectFromArray(item.id, images, setImages)}
                  />
                )
              }
            }
          />
      )
    }
  }

  async function loadGame()
  {
    try {
      const response = await get(`/game/${params.id}`, setLoading);

      setId(response.id);
      setName(response.name);
      setLinkList(response.linkList.externalLinks);
      setImages(response.imageList.images);
      if (!params) {
        setUser({...response, auth_token: user?.auth_token});
      }
    } catch (error) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function deleteGame()
  {
    /* try {
      if (!password && !params) {
        return Alert.alert("Faltou a senha cabaço");
      }

      await post(`user/destroy`, setLoading, {
        id, password
      });

      if (!params) return signOut();

      navigation.goBack();
    } catch (error) {
      signOut();
    } */
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
        setLinkList(response.linkList.externalLinks);
        setImages(response.imageList.images);
      }
    } catch (error: any) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
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
        setLinkList(response.linkList.externalLinks);
        setImages(response.imageList.images);
      }

    } catch (error) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  useEffect(() => {
    if (isFocused && params.id) loadGame();
  }, [isFocused]);

  return (
    <MainView loading={loading}>

      <PlatformsModal
        setModal={() => setModal(!modal)}
        visible={modal}
        setPlatform={setPlatform}
      />

      <ScrollView style={[styles.container]}>
        <Text
          style={[styles.title, textColorStyle]}
        >
          {getTerm((params && params.new && !id ? 100054 : 100043)).replace("%2", name)}
        </Text>

        <Input
          placeholderText={100013}
          value={name}
          onChangeText={setName}
        />

        {renderLinks()}

        <Input
          placeholderText={100049}
          value={link}
          onChangeText={setLink}
          onSubmitEditing={addLink}
        />

        <TouchableOpacity onPress={() => setModal(!modal)}>
          <View pointerEvents="none">
            <Input
              placeholderText={100050}
              value={platform?.name}
              onSubmitEditing={addLink}
            />
          </View>
        </TouchableOpacity>

        <Button
          text={100048}
          extraStyle={{marginBottom: 15}}
          extraTextStyle={{color: "#fff"}}
          buttonColor="#17A2B8"
          onPress={addLink}
        />

        {renderImages()}

        <Input
          placeholderText={100051}
          value={imageName}
          onChangeText={setImageName}
          onSubmitEditing={addImage}
        />

        <Input
          placeholderText={100052}
          value={imageLink}
          onChangeText={setImageLink}
          onSubmitEditing={addImage}
        />

        <Button
          text={100053}
          onPress={addImage}
          extraStyle={{marginBottom: 15}}
          extraTextStyle={{color: "#fff"}}
          buttonColor="#17A2B8"
        />

        <Button
          text={id ? 100015 : 100026}
          onPress={id ? updateGame : createGame}
          extraStyle={{marginBottom: 80}}
        />
      </ScrollView>
    </MainView>
  );
};

export default AddGame;