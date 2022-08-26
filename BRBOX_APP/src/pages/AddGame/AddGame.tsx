import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
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
import { useLinking } from '../../Contexts/LinkingProvider';
import GenreModeModal from '../../components/GenreModeModal';
import Checkbox from '../../components/Checkbox';

const AddGame = () => {
  const {
    id, name, link, loading, imageName, imageLink, platform, businessModel, businessModelList, linkList, genreList, modeList,
    setName, setLink, setPlatform, setImageName, setImageLink, setLoading, renderBusinessModel, addBusinessModel, setGenreList,
    addLink, addImage, loadGame, createGame, updateGame, deleteGame, renderLinks, renderImages, setBusinessModel, setModeList,
    renderGenreMode, isDlc, setIsDlc
  } = useGame();

  const route = useRoute();
  const {getTerm} = useTerm();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const {deepLinking} = useLinking();

  const params = route.params as Params;

  const [modal, setModal] = useState<React.ReactElement | null>(null);

  const { darkMode } = useTheme();

  const textColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  function deleteGameCallback()
  {
    deleteGame(() => navigation.goBack());
  }

  function errorMessage()
  {
    Alert.alert(getTerm(100071), getTerm(100072));
  }

  useEffect(() => {
    if (isFocused && params.id && !params.new) {
      loadGame(params.id, errorMessage);
    }

    if (params.new) setLoading(false);
  }, [isFocused]);

  function showModal(modalType: "Platforms" | "BusinessModel" | "Modes" | "Genres")
  {
    let modalEl = null;

    switch (modalType) {
      case "Platforms":
        modalEl = (
          <PlatformsModal
            visible={true}
            setModal={() => setModal(null)}
            usedPlatforms={linkList}
            setPlatform={setPlatform}
          />
        );
        break;
      case "BusinessModel":
        modalEl = (
          <BusinessModelModal
            visible={true}
            setModal={() => setModal(null)}
            setBusinessModel={setBusinessModel}
            usedBusinessModels={businessModelList}
          />
        );
        break;
      case "Modes":
      case "Genres":
        const isGenre = modalType === "Genres";

        modalEl = (
          <GenreModeModal
            visible={true}
            isGenre={isGenre}
            setModal={() => setModal(null)}
            usedData={isGenre ? genreList : modeList}
            setGenreMode={isGenre ? setGenreList : setModeList}
          />
        );
        break;
    }

    setModal(modalEl);
  }

  useEffect(() => {
    deepLinking(navigation);
  }, []);

  useEffect(() => {
    if (businessModel) addBusinessModel();
  }, [businessModel]);

  return (
    <MainView
      showTitle
      showBottom
      headerTitle={name}
      loading={loading}
    >
      <ScrollView
        style={[styles.container]}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => {
            if (isFocused && params.id && !params.new) loadGame(params.id, errorMessage);
          }}/>
        }
      >
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

        <ToggleContent
          title={100105}
          content={
            <>
              {renderLinks(true)}

              <Input
                placeholderText={100049}
                value={link}
                onChangeText={setLink}
                onSubmitEditing={addLink}
              />

              <TouchableOpacity onPress={() => showModal("Platforms")}>
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
            </>
          }
        />

        <ToggleContent
          title={100152}
          content={
            <>
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
            </>
          }
        />

        <ToggleContent
          title={100119}
          content={
            <View>
              {renderBusinessModel(true, true)}

              <TouchableOpacity onPress={() => showModal("BusinessModel")}>
                <View pointerEvents="none">
                  <Input
                    placeholderText={100118}
                  />
                </View>
              </TouchableOpacity>
            </View>
          }
        />

        <ToggleContent
          title={100155}
          content={
            <View>
              {renderGenreMode(true)}

              <TouchableOpacity onPress={() => showModal('Genres')}>
                <View pointerEvents="none">
                  <Input
                    placeholderText={100162}
                  />
                </View>
              </TouchableOpacity>
            </View>
          }
        />

        <ToggleContent
          title={100156}
          content={
            <View>
              {renderGenreMode(false)}

              <TouchableOpacity onPress={() => showModal('Modes')}>
                <View pointerEvents="none">
                  <Input
                    placeholderText={100161}
                  />
                </View>
              </TouchableOpacity>
            </View>
          }
        />

        <Checkbox
          text={100174}
          handleCheckbox={() => setIsDlc(!isDlc)}
          checked={isDlc}
          extraText={isDlc ? "!" : "?"}
        />

        <Button
          text={id ? 100015 : 100026}
          onPress={id ? updateGame : createGame}
          extraStyle={{marginVertical: 15, marginTop: 25}}
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