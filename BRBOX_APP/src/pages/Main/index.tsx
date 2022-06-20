import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';

import MainView from '../../components/MainView';
import { useTerm } from '../../Contexts/TermProvider';

//@ts-ignore
import bg from "../../../assets/img/loginbackground.png";
import config from "../../../brbox.config.json";

import styles from './styles';
import Button from '../../components/Button';
import { useTheme } from '../../Contexts/Theme';

const Main = () => {
  const { darkMode } = useTheme();
  const navigation = useNavigation<any>();

  const {getTerm} = useTerm();

  const registerTextColorStyle = {
    color: !darkMode ? config.dark : config.mediumGreen,
  };

  return (
    <MainView>
      <ImageBackground source={bg} style={[styles.container]} resizeMode='cover'>
        <Button
          text={100009}
          onPress={()=>{navigation.navigate("Login")}}
          extraStyle={{marginTop: "70%"}}
        />

        <TouchableOpacity style={styles.registerButton} onPress={()=>{navigation.navigate("Register")}}>
          <Text style={[styles.buttonText, registerTextColorStyle]}>{getTerm(100010)}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </MainView>
  );
}

export default Main;