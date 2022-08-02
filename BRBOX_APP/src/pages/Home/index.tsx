import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import {
  RefreshControl,
  View
} from 'react-native';

import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';

import { useAuth } from '../../Contexts/Auth';
import { useTerm } from '../../Contexts/TermProvider';
import { useRequest } from '../../Contexts/Request';
import { Game, Params } from '../../utils/types';

import Input from '../../components/Input';
import Loading from '../../components/Loading';

import styles from './styles';
import useDelay from '../../hooks/Delay';

const Home = () => {
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

  const [hideButton, setHideButton] = useState(params ? params.search : false);

  const {get} = useRequest();
  const {getTerm} = useTerm();
  const {signOut, user, link, setLink} = useAuth();

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
        ListFooterComponent={loadingMore && !loadingNoMore ? <Loading styles={{marginBottom: 15}} /> : null}
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
    }
  }, [isFocused, gameSearch]);

  useEffect(() => {
    setLoadingNoMore(false);

    useDelay(gameName, setGameSearch);
  }, [gameName]);

  function navigate(url: string)
  {
    const route = url.replace(/.*?:\/\//g, '') || "";
    //@ts-ignore
    const id = route.match(/\/([^\/]+)\/?$/)[1];

    const routeName = route.split('/')[0];

    if (routeName === 'gameinfo') {
      navigation.navigate('GameInfo', { id });
    };
  }

  useEffect(() => {
    setTimeout(() => {
      if (link) {
        navigate(link);
        setLink(null)
      }
    }, 2500);
  }, []);

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