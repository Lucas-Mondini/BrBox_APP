import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { RefreshControl, View } from 'react-native';

import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';

import { useTerm } from '../../Contexts/TermProvider';
import { useRequest } from '../../Contexts/Request';
import { Game, Params } from '../../utils/types';

import Input from '../../components/Input';
import Loading from '../../components/Loading';

import styles from './styles';
import useDelay from '../../hooks/Delay';
import { useLinking } from '../../Contexts/LinkingProvider';

const MostRated = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const params = route.params as Params;

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [loadingNoMore, setLoadingNoMore] = useState(false);

  const [amount] = useState(500);
  const [order] = useState('id');
  const [page, setPage] = useState(1);

  const [games, setGames] = useState<Game[]>([]);
  const [gameName, setGameName] = useState('');
  const [gameSearch, setGameSearch] = useState('');

  const [hideButton, setHideButton] = useState(false);

  const { get, post } = useRequest();
  const { getTerm } = useTerm();
  const { deepLinking, gameId, removeLinkingListener } = useLinking();

  function getTitle() {
    if (params) {
      if (params.watchlist) return 100173;
      else if (params.filterUser) return 100002;
    }
    else return 100001
  }

  async function getGames(loadingMoreGames: boolean = false) {
    try {
      let response: any;

      if (loadingNoMore) {
        setLoadingMore(false);
        setLoading(false);
        return;
      }

      if (params && params.filterUser) {
        response = await post(
          `/game/userRatings?page=${page}&name=${gameName}&ammount=${amount}&order=${order}`,
          loadingMoreGames ? setLoadingMore : setLoading,
          {},
        );
      } else if (params && params.watchlist) {
        response = await get(
          `/watchlist?page=${page}&ammount=${amount}&order=${order}`,
          loadingMoreGames ? setLoadingMore : setLoading,
        );
      } else {
        response = await get(
          `/game?page=${gameName ? 1 : page
          }&name=${gameName}&ammount=${amount}&order=${order}`,
          loadingMoreGames ? setLoadingMore : setLoading,
        );
      }

      const gamesList = gameName ? [] : games;

      if (response.games.length < amount) {
        setLoadingNoMore(true);
      }

      setGames([...gamesList, ...response.games]);
      setPage(page + 1);
    } catch (err) {
      params && navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }

    setLoading(false);
  }

  function resetGameList() {
    setGames([]);
    setLoading(true);
    setLoadingMore(true);
    setPage(1);
    setGameName('');
  }

  function renderGames() {
    return (
      <FlatList
        data={games.sort((a, b) => {
          if (a.votecount < b.votecount) {
            return 1;
          } else if (a.votecount > b.votecount) {
            return -1;
          } else {
            return b.score - a.score;
          }
        })}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getGames} />
        }
        keyExtractor={(game: any) => game.id}
        renderItem={({ item }: any) => {
          return (
            <GameCard
              id={item.id}
              title={item.name}
              tags={item.tags}
              imgUri={item.image}
              score={Number(item.score)}
              voteCount={item.votecount}
              watchlist={item.watchlist}
              showWatchlist={!params || !params.watchlist}
              extraCallbackOnNavigate={!params ? resetGameList : undefined}
            />
          );
        }}
        onEndReached={() => getGames(true)}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loadingMore && !loadingNoMore ? (
            <Loading styles={{ marginBottom: 15 }} />
          ) : null
        }
      />
    );
  }

  function toggleSearch() {
    setGameName('');
    setHideButton(!hideButton);
  }

  function header() {
    if (!hideButton) {
      return;
    }

    return (
      <View style={[styles.inputView]}>
        <Input
          autoFocus
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
    if (!loading && isFocused) {
      if (gameId) {
        removeLinkingListener();
        navigation.navigate('GameInfo', { id: gameId });
      } else {
        deepLinking(navigation);
      }
    }
  }, [loading, isFocused]);

  return (
    <MainView
      showTitle
      showBottom
      loading={loading}
      headerTitle={getTitle()}
      customHeader={header()}
      hideMenuButton={hideButton}
      headerAddButtonAction={!params ? toggleSearch : undefined}
      headerAddButtonIcon={hideButton ? 'close' : 'magnify'}>
      <View style={styles.container}>{renderGames()}</View>
    </MainView>
  );
};

export default MostRated;
