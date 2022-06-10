import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
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
import { useRequest } from '../../Contexts/Request';

const Home = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);

  const {get} = useRequest();
  const {signOut} = useAuth();

  async function getGames()
  {
    try {
      const response = await get("/game", setLoading);

      setGames(response);
    } catch (err) {
      return signOut();
    }
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
                title={item.name}
                year={1}
                tag1={"1"}
                tag2={"2"}
                moreTags={1}
                evaluations={1}
                imgUri={item.imageList.images[0].link}
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