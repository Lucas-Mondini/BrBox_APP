import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  View
} from 'react-native';

import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';
import styles from './styles';

import { useAuth } from '../../Contexts/Auth';
import { Game, Params } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';
import { useGame } from '../../Contexts/Game';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import { useTerm } from '../../Contexts/TermProvider';

const Home = () => {
  const isFocused = useIsFocused();
  const route = useRoute();

  const params = route.params as Params;

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(10);
  const [order, setOrder] = useState("name");
  const [gameName, setGameName] = useState("");
  const [hideButton, setHideButton] = useState(params ? params.search : false);

  const {get} = useRequest();
  const {getTerm} = useTerm();
  const {signOut, user} = useAuth();
  const {clearGameContext} = useGame();

  async function getGames(loadingMoreGames: boolean = false)
  {
    try {
      const response = await get(
        `/game?page=${gameName ? 1 : page}&name=${gameName}&ammount=${amount}&order=${order}&userId=${params && params.filterUser ? user?.id : ""}`,
        loadingMoreGames ? setLoadingMore : setLoading
      );

      const gamesList = gameName ? [] : games;

      setGames([...gamesList, ...response.games]);
      setPage(page+1);
    } catch (err) {
      return signOut();
    }

    setLoading(false);
  }

  function resetGameList()
  {
    setGames([]);
    setLoading(true);
    setLoadingMore(true);
    setPage(1);
    setGameName("");
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
                tags={item.tags}
                imgUri={item.image}
                extraCallbackOnNavigate={resetGameList}
              />
            )
          }
        }
        onEndReached={() => getGames(true)}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loadingMore ? <Loading styles={{marginBottom: 15}} /> : null}
      />);
  }

  function toggleSearch()
  {
    setGameName("");
    setHideButton(!hideButton);
  }

  function header()
  {
    if (!hideButton) {
      return;
    }

    return (
      <View style={[styles.inputView]}>
        <Input
          placeholder={getTerm(100110)}
          extraStyles={styles.input}
          value={gameName}
          onChangeText={setGameName}
        />
      </View>
    );
  }

  useEffect(() => {
    if (isFocused) {
      getGames();
      clearGameContext();
    }
  }, [isFocused, gameName]);

  return (
    <MainView
      showTitle
      showBottom
      loading={loading}
      customHeader={header()}
      hideMenuButton={hideButton}
      headerAddButtonAction={toggleSearch}
      headerAddButtonIcon={hideButton ? "x" : "search"}
    >
      <View style={styles.container}>
        {renderGames()}
      </View>

    </MainView>
  );
};

export default Home;