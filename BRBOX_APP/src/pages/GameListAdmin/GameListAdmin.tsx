import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import {
  RefreshControl,
  View
} from 'react-native';

import GameCardAdmin from '../../components/GameCardAdmin';
import MainView from '../../components/MainView';

import { useAuth } from '../../Contexts/Auth';
import { useTerm } from '../../Contexts/TermProvider';
import { useRequest } from '../../Contexts/Request';
import { Game, Params } from '../../utils/types';

import Input from '../../components/Input';
import Loading from '../../components/Loading';

import styles from './styles';
import useDelay from '../../hooks/Delay';
import deedLinking from '../../utils/deepLinking';

const GameListAdmin = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const params = route.params as Params;

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [loadingNoMore, setLoadingNoMore] = useState(false);

  const [amount] = useState(10);
  const [order] = useState("name");
  const [page, setPage] = useState(1);

  const [games, setGames] = useState<Game[]>([]);
  const [gameName, setGameName] = useState("");
  const [gameSearch, setGameSearch] = useState("");

  const { get } = useRequest();
  const { getTerm } = useTerm();
  const { signOut, user } = useAuth();

  async function getGames(loadingMoreGames: boolean = false)
  {
    try {
      if (loadingNoMore) {
        setLoadingMore(false);
        setLoading(false);
        return;
      };

      const response = await get(
        `/game?page=${gameName ? 1 : page}&name=${gameName}&ammount=${amount}&order=${order}&userId=${params && params.filterUser ? user?.id : ""}`,
        loadingMoreGames ? setLoadingMore : setLoading
      );

      const gamesList = gameName ? [] : games;

      if (response.games.length < amount) {
        setLoadingNoMore(true);
      }

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
              <GameCardAdmin
                id={item.id}
                title={item.name}
                imgUri={item.image}
                reload={getGames}
                extraCallbackOnNavigate={resetGameList}
              />
            )
          }
        }
        onEndReached={() => getGames(true)}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loadingMore && !loadingNoMore ? <Loading styles={{marginBottom: 15}} /> : null}
      />);
  }

  function navigateToGame(): void
  {
    navigation.navigate("AddGame", {new: true});
  }

  function header()
  {
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
      setLoadingNoMore(false);
      getGames();
    }
  }, [isFocused, gameSearch]);

  useEffect(() => {
    setLoadingNoMore(false);

    useDelay(gameName, setGameSearch);
  }, [gameName]);

  useEffect(() => {
    deedLinking(navigation);
  }, []);

  return (
    <MainView
      showTitle
      showBottom
      headerTitle={getTerm(100153)}
      headerAddButtonAction={navigateToGame}
      headerAddButtonIcon={"plus"}
    >
      {header()}

      {loading
        ? <Loading />
        : <View style={styles.container}>
            {renderGames()}
          </View>
        }

    </MainView>
  );
};

export default GameListAdmin;