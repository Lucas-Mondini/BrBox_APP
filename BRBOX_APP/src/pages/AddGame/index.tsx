import { useIsFocused, useRoute } from '@react-navigation/native';
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

const AddGame = () => {
  const {
    id, name, link, loading, imageName, imageLink, platform,
    setName, setLink, setPlatform, setImageName, setImageLink,
    addLink, addImage, loadGame, createGame, updateGame, deleteGame, renderLinks, renderImages
  } = useGame();

  const route = useRoute();
  const {getTerm} = useTerm();
  const isFocused = useIsFocused();

  const params = route.params as Params;

  const [modal, setModal] = useState(false);

  const { darkMode } = useTheme();

  const textColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  useEffect(() => {
    if (isFocused && params.id) {
      loadGame(params.id);
    }
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

        <Button
          text={id ? 100015 : 100026}
          onPress={id ? updateGame : createGame}
          extraStyle={{marginBottom: 15}}
        />

        {Boolean(id) ? <>
          {/* <Button
            text={100062}
            onPress={() => navigation.navigate("TagAssoc")}
            buttonColor="#17A2B8"
            extraStyle={{marginBottom: 80}}
            extraTextStyle={{color: "#fff"}}
          /> */}

          <DarkZone
            message={100060}
            itemName={name}
            callback={deleteGame}
            buttonText={100061}
          /></> : <View style={{marginBottom: 100}}></View>}
      </ScrollView>
    </MainView>
  );
};

export default AddGame;