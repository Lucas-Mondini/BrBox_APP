import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  Text,
  useColorScheme,
} from 'react-native';

import BottomMenu from '../../components/BottomMenu';
import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';
import { useTerm } from '../../Contexts/TermProvider';
import styles from './styles';

import config from "../../../brbox.config.json";

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();

  const {getTerm} = useTerm();

  function navigate()
  {
    navigation.navigate("GameInfo");
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? config.dark : "#fff",
  };

  return (
    <MainView>
      <ScrollView style={[styles.container, backgroundStyle]}>
        <Text style={styles.title}>{getTerm(100008)}</Text>

        <GameCard
          title="Halo Infinite"
          year="2021"
          tag1="Tiro"
          tag2="FPS"
          moreTags={2}
          evaluations={10}
        />
        <GameCard
          title="Minecraft"
          year="2011"
          tag1="Sobrevivência"
          tag2="Terror"
          moreTags={2}
          evaluations={10}
        />
        <GameCard
          title={"18 wheels \nof steel"}
          year="2002"
          evaluations={99}
        />
      </ScrollView>
      <BottomMenu/>
    </MainView>
  );
};

export default Home;