import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  RefreshControl,
  ScrollView,
  Text
} from 'react-native';

import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';

import { Game } from '../../utils/types';
import { useTerm } from '../../Contexts/TermProvider';
import { useRequest } from '../../Contexts/Request';

import { useTheme } from '../../Contexts/Theme';
import { useLinking } from '../../Contexts/LinkingProvider';

import styles from './styles';
import config from "../../../brbox.config.json";

const Home = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);

  const [top3, setTop3] = useState<Game[]>([]);
  const [top5, setTop5] = useState<Game[]>([]);

  const { post } = useRequest();
  const { getTerm } = useTerm();
  const { subTitleMainColor } = useTheme();
  const { deepLinking } = useLinking();

  const color = subTitleMainColor;

  async function getGames() {
    try {
      let response = null;

      response = await post(`/game/userTop3`, () => { }, {});

      setTop3(response.games);

      response = await post(`/game/top5`, () => { }, {});

      setTop5(response.games);
    } catch (err) {
      return;
    }

    setLoading(false);
  }

  function renderGames(gameList: Game[]) {
    return gameList.sort((a, b) => {
      if (a.votecount < b.votecount) {
        return 1;
      } else if (a.votecount > b.votecount) {
        return -1;
      } else { 
        return b.score - a.score;
      }
    }).map(game => (
      <GameCard
        id={game.id}
        key={game.id}
        tags={game.tags}
        title={game.name}
        score={game.score}
        imgUri={game.image}
        voteCount={game.votecount}
      />
    ));
  }

  useEffect(() => {
    if (isFocused) getGames();
  }, [isFocused]);

  useEffect(() => {
    deepLinking(navigation);
  }, [isFocused]);

  return (
    <MainView
      showTitle
      loading={loading}
      headerTitle={100007}
      showBottom
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getGames} />
        }
        style={styles.container}
      >
        <Text style={[styles.title, { color }]}>{getTerm(100172)}</Text>
        {renderGames(top5)}

        <Text style={[styles.title, { color }]}>{getTerm(100171)}</Text>
        {renderGames(top3)}
      </ScrollView>

    </MainView>
  );
};

export default Home;