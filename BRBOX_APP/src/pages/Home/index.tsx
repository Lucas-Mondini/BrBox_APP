import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
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
import { useGame } from '../../Contexts/Game';

const Home = () => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);

  const {get} = useRequest();
  const {signOut, user} = useAuth();
  const {clearGameContext} = useGame();

  async function getGames()
  {
    try {
      const response = await get("/game", setLoading);

      setGames(response.games);
    } catch (err) {
      //return signOut();
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
                imgUri={item.Image.link}
                editGame={!user?.admin}
              />
            )
          }
        }
      />);
  }

  useEffect(() => {
    if (isFocused) {
      getGames();
      clearGameContext();
    }
  }, [isFocused]);

  return (
    <MainView
      showTitle
      showBottom
      loading={loading}
    >
      <View style={styles.container}>
        {renderGames()}
      </View>

    </MainView>
  );
};

export default Home;