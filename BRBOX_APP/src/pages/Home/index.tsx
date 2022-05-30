import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import BottomMenu from '../../components/BottomMenu';
import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';
import { useTerm } from '../../Contexts/TermProvider';
import styles from './styles';

import config from "../../../brbox.config.json";
import { useAuth } from '../../Contexts/Auth';
import { Game } from '../../utils/types';
import { FlatList } from 'react-native-gesture-handler';

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
    const games = [
      {id: 1,  title: "Halo Infinite", year: 2021, tag1: "Tiro", tag2: "FPS", moreTags: 2, evaluations: 10},
      {id: 2,  title: "Minecraft", year: 2011, tag1: "Sobrevivência", tag2: "Terror", moreTags: 2, evaluations: 10},
      {id: 3,  title: "18 wheels \nof steel", year: 2002, tag1: "", tag2: "", moreTags: 0, evaluations: 50},
      {id: 4,  title: "Halo Infinite", year: 2021, tag1: "Tiro", tag2: "FPS", moreTags: 2, evaluations: 10},
      {id: 5,  title: "Halo Infinite", year: 2021, tag1: "Tiro", tag2: "FPS", moreTags: 2, evaluations: 10},
      {id: 6,  title: "Halo Infinite", year: 2021, tag1: "Tiro", tag2: "FPS", moreTags: 2, evaluations: 10},
      {id: 7,  title: "Halo Infinite", year: 2021, tag1: "Tiro", tag2: "FPS", moreTags: 2, evaluations: 10},
      {id: 8,  title: "Halo Infinite", year: 2021, tag1: "Tiro", tag2: "FPS", moreTags: 2, evaluations: 10},
      {id: 9,  title: "Halo Infinite", year: 2021, tag1: "Tiro", tag2: "FPS", moreTags: 2, evaluations: 10},
      {id: 10, title: "Halo Infinite", year: 2021, tag1: "Tiro", tag2: "FPS", moreTags: 2, evaluations: 10},
    ]

    setGames(games);
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