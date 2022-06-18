import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  View
} from 'react-native';

import BottomMenu from '../../components/BottomMenu';
import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';
import styles from './styles';

import { useAuth } from '../../Contexts/Auth';
import { Game } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';

const Home = () => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);

  const {get} = useRequest();
  const {signOut} = useAuth();

  async function getGames()
  {
    try {
      const response = await get("/game", setLoading);
      console.log(response.games[0].tags);
      setGames(response.games);
    } catch (err) {
      return signOut();
    }
  }

  function renderGames()
  {
    return (
      <FlatList
        data={games}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getGames}/>
        }
        keyExtractor={(game: any) => game.id}
        renderItem={
          ({item}: any) => {
            return (
              <GameCard
                id={item.id}
                title={item.name}
                tag1={item.tags[0]}
                tag2={item.tags[1]}
                tag3={item.tags[2]}
                evaluations={1}
                imgUri={item.Image.link}
              />
            )
          }
        }
      />);
  }

  useEffect(() => {
    if (isFocused) getGames();
  }, [isFocused]);

  return (
    <MainView
      showTitle
      loading={loading}
    >
      <View style={styles.container}>
        {renderGames()}
      </View>

      <BottomMenu/>
    </MainView>
  );
};

export default Home;