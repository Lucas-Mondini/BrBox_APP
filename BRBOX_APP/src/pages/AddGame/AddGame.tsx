import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import MainView from '../../components/MainView';
import { useGame } from '../../Contexts/Game';
import { useTerm } from '../../Contexts/TermProvider';

import config from "../../../brbox.config.json";
import styles from './styles';

import { Params } from '../../utils/types';

import PlatformsModal from '../../components/PlatformsModal';
import DarkZone from '../../components/DarkZone';
import { useTheme } from '../../Contexts/Theme';
import BusinessModelModal from '../../components/BusinessModelModal';
import ToggleContent from '../../components/ToggleContent';

const AddGame = () => {
  const {
    id, name, link, loading, imageName, imageLink, platform, businessModel, businessModelList, linkList,
    setName, setLink, setPlatform, setImageName, setImageLink, setLoading, renderBusinessModel, addBusinessModel,
    addLink, addImage, loadGame, createGame, updateGame, deleteGame, renderLinks, renderImages, setBusinessModel
  } = useGame();

  const route = useRoute();
  const {getTerm} = useTerm();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const params = route.params as Params;

  const [modal, setModal] = useState<React.ReactElement | null>(null);

  const { darkMode } = useTheme();

  const textColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  function deleteGameCallback()
  {
    deleteGame(navigation.reset({index: 0, routes: [{name: "Home"}]}));
  }

  useEffect(() => {
    if (isFocused && params.id && !params.new) {
      loadGame(params.id);
    }

    if (params.new) setLoading(false);
  }, [isFocused]);

  function showModal(platform?: boolean)
  {
    let modalEl = null;

    if (platform) {
      modalEl = (
        <PlatformsModal
          visible={true}
          setModal={() => setModal(null)}
          usedPlatforms={linkList}
          setPlatform={setPlatform}
        />
      );
    } else {
      modalEl = (
        <BusinessModelModal
          visible={true}
          setModal={() => setModal(null)}
          setBusinessModel={setBusinessModel}
          usedBusinessModels={businessModelList}
        />
      );
    }

    setModal(modalEl);
  }

  return (
    <MainView loading={loading}>
      <ScrollView style={[styles.container]}>
        {modal && modal}

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

        {renderLinks(true)}

        <Input
          placeholderText={100049}
          value={link}
          onChangeText={setLink}
          onSubmitEditing={addLink}
        />

        <TouchableOpacity onPress={() => showModal(true)}>
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

        {renderImages(true)}

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

        <ToggleContent
          title={100119}
          colapseOnStart
          content={
            <View>
              {renderBusinessModel(true, true)}

              <TouchableOpacity onPress={() => showModal()}>
                <View pointerEvents="none">
                  <Input
                    placeholderText={100118}
                    value={businessModel?.name}
                  />
                </View>
              </TouchableOpacity>

              <Button
                text={100119}
                onPress={addBusinessModel}
                extraStyle={{marginBottom: 15, paddingHorizontal: 10}}
                extraTextStyle={{color: "#fff"}}
                buttonColor="#17A2B8"
              />
            </View>
          }
        />

        <Button
          text={id ? 100015 : 100026}
          onPress={id ? updateGame : createGame}
          extraStyle={{marginVertical: 15}}
        />

        {Boolean(id) ? <>
          <DarkZone
            message={100060}
            itemName={name}
            callback={deleteGameCallback}
            buttonText={100061}
          /></> : <View style={{marginBottom: 100}}></View>}
      </ScrollView>
    </MainView>
  );
};

export default AddGame;