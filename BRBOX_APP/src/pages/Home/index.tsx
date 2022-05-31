import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  useColorScheme,
} from 'react-native';

import BottomMenu from '../../components/BottomMenu';
import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';
import { useTerm } from '../../Contexts/TermProvider';
import styles from './styles';

import config from "../../../brbox.config.json";
import {games} from "../../../mockdata.json";
import { useAuth } from '../../Contexts/Auth';
import { Game } from '../../utils/types';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();
  const [games, setGames] = useState<Game[]>([]);
  const isFocused = useIsFocused()

  const {signOut} = useAuth();

  const {getTerm} = useTerm();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? config.dark : "#fff",
  };

  const titleColorStyle = {
    color: !isDarkMode ? config.dark : "#fff",
  };

  async function getGames()
  {
    const gamesList = require("../../../mockdata.json").games;

    setGames(gamesList);
  }

  function renderGames()
  {
    return (
      <FlatList style={[styles.list]}
        data={games}
        keyExtractor={(game: any) => game.id}
        renderItem={
          ({item}: any) => {
            return (
              <GameCard
                title={item.title}
                year={item.year}
                tag1={item.tag1}
                tag2={item.tag2}
                moreTags={item.moreTags}
                evaluations={item.evaluations}
                imgUri={item.img}
              />
            )
          }
        }
      />);
  }

  useEffect(()=>{
    if (isFocused) getGames();
  }, [isFocused]);

  return (
    <MainView>
      <ScrollView style={[styles.container, backgroundStyle]}>
        <Text style={[styles.title, titleColorStyle]}>{getTerm(100008)}</Text>

        <ScrollView horizontal style={{width: "100%", height: "100%"}}>
          {renderGames()}
        </ScrollView>
      </ScrollView>
      <BottomMenu/>
    </MainView>
  );
};

export default Home;