import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
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
import { Params } from '../../utils/types';
import { getMaxId, removeObjectFromArray } from '../../utils/functions';

const AddGame = () => {
  const navigation = useNavigation<any>();
  const {user, setUser, signOut} = useAuth();
  const {getTerm} = useTerm();
  const {get, put, post} = useRequest();
  const route = useRoute();
  const params = route.params as Params;

  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [linkList, setLinkList] = useState([{id: 0, platform: 0, link: ""}]);
  const [link, setLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [images, setImages] = useState([{id: 0, name: "", link: ""}]);
  const [imageName, setImageName] = useState("");
  const [imageLink, setImageLink] = useState("");
  

  const [idMock, setIdMock] = useState(0);

  const isDarkMode = useColorScheme() === 'dark';

  const textColorStyle = {
    color: isDarkMode ? "#fff" : config.dark,
  };

  function addLink() {
    if (!platform.trim()) {
      return Alert.alert("Faltou a plataforma", "Escolha uma plataforma para adicionar o link");
    }

    if (!link.trim()) {
      return Alert.alert("Faltou o link", "Preencha o link da plataforma para adicionar o link a lista");
    }

    setLink("");
    setPlatform("");
    setLinkList([...linkList, {id: getMaxId(linkList), platform: Number(platform), link: link}]);
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
            <Text style={[styles.linkText, textColorStyle]}>{link.link}</Text>
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
    const imageList = new Array();

    for (const image of images) {
      if (image.link) {
        imageList.push(
          <View style={styles.linkContainer} key={image.id}>
            <Text style={[styles.linkText, {marginRight: 5}, textColorStyle]}>{image.name}</Text>
            <Text style={[styles.linkText, textColorStyle]}>{image.link}</Text>
            <TouchableOpacity onPress={() => removeObjectFromArray(image.id, images, setImages)}>
              <Icon name="close" size={35} color={"#686868"}/>
            </TouchableOpacity>
          </View>
        );
      }
    }

    return imageList;
  }

  async function loadGame()
  {
    try {
      const response = await get(`/user/${!params ? user?.id : params.id}`, setLoading);

      setId(response.id);
      setName(response.name);

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
    /* try {
      const response = await put(`/user/update`, setLoading, {
        id, name, email, password, new_password: newPassword, confirm_new_password: confirmPassword
      });

      if (!params) {
        setUser(response);
      } else {
        setId(response.id);
        setName(response.name);
        setEmail(response.email);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    } */
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
    //console.log(linkList);
  }, [linkList]);
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <MainView loading={loading}>
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

        <Input
          placeholderText={100050}
          value={platform}
          onChangeText={setPlatform}
          onSubmitEditing={addLink}
        />

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
        />
      </ScrollView>
    </MainView>
  );
};

export default AddGame;