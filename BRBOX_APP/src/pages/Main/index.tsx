import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import MainView from '../../components/MainView';
import { useTerm } from '../../Contexts/TermProvider';

import game from "../../../assets/img/game.png";

import config from "../../../brbox.config.json";

import styles from './styles';

const Main = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();

  const {getTerm} = useTerm();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? config.dark : config.greenLight,
  };

  const fontColorStyle = {
    color: !isDarkMode ? config.dark : "#fff",
  };

  return (
    <MainView>
      <View style={[backgroundStyle, styles.container]}>
        <Image source={game} style={styles.gameImg}/>
        <TouchableOpacity onPress={()=>{navigation.navigate("Login")}} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>{getTerm(100009)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={()=>{navigation.navigate("Register")}}>
          <Text style={[styles.registerButtonText, fontColorStyle]}>{getTerm(100010)}</Text>
        </TouchableOpacity>
      </View>
    </MainView>
  );
}

export default Main;