import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  View
} from 'react-native';

import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';
import styles from './styles';

import { useAuth } from '../../Contexts/Auth';
import { Game } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';
import { useGame } from '../../Contexts/Game';
import Loading from '../../components/Loading';

const Home = () => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(30);
  const [order, setOrder] = useState("name");

  const {get} = useRequest();
  const {signOut, user} = useAuth();
  const {clearGameContext} = useGame();

  async function getGames()
  {
    try {
      const response = await get(`/game?page=${page}&ammount=${amount}&order=${order}`, setLoadingMore);

      setGames([...games, ...response.games]);
      setPage(page+1);
    } catch (err) {
      return signOut();
    }

    setLoading(false);
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
                editGame={user?.admin}
              />
            )
          }
        }
        onEndReached={getGames}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <Loading styles={{marginBottom: 15}} /> : null}
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