import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View
} from 'react-native';

import BottomMenu from '../../components/BottomMenu';
import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';
import styles from './styles';

import { useAuth } from '../../Contexts/Auth';
import { Game } from '../../utils/types';

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const isFocused = useIsFocused()

  const {signOut} = useAuth();

  async function getGames()
  {
    const gamesList = require("../../../mockdata.json").games;

    setGames(gamesList);
  }

  function renderGames()
  {
    return (
      <FlatList
        data={games}
        keyExtractor={(game: any) => game.id}
        renderItem={
          ({item}: any) => {
            return (
              <GameCard
                id={item.id}
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
    <MainView showTitle>
      <View style={styles.container}>
        {renderGames()}
      </View>

      <BottomMenu/>
    </MainView>
  );
};

export default Home;