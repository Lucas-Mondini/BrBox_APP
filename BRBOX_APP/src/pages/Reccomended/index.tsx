import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import {
  RefreshControl,
  View
} from 'react-native';

import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';

import { useRequest } from '../../Contexts/Request';
import { Game, Params } from '../../utils/types';

import styles from './styles';
import { useLinking } from '../../Contexts/LinkingProvider';

const Recommended = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const params = route.params as Params;

  const [loading, setLoading] = useState(true);

  const [games, setGames] = useState<Game[]>([]);
  const [roll, setRoll] = useState(Math.round(Math.random() * 10));

  const { post } = useRequest();
  const { deepLinking } = useLinking();

  function rollDice() {
    setRoll(Math.round(Math.random() * 10));
  }

  async function getGames()
  {
    try {
      const response = await post(
        `/game/reccomended`,
        setLoading,
        {roll}
      );

      setGames(response.games);
    } catch (err) {
      params && navigation.reset({index: 0, routes: [{name: "Home"}]});
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
                tags={item.tags}
                imgUri={item.image}
                score={Number(item.score)}
                voteCount={item.votecount}
              />
            )
          }
        }
      />);
  }

  useEffect(() => {
    if (isFocused) getGames();
  }, [isFocused]);

  useEffect(() => {
    getGames();
  }, [roll]);

  useEffect(() => {
    deepLinking(navigation);
  }, [loading, isFocused]);

  return (
    <MainView
      showTitle
      showBottom
      loading={loading}
      headerTitle={100003}
      headerAddButtonAction={rollDice}
      headerAddButtonIcon={"dice-5"}
    >
      <View style={styles.container}>
        {renderGames()}
      </View>
    </MainView>
  );
};

export default Recommended;