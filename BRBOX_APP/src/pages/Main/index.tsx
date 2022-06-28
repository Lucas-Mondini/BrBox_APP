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
import { useAuth } from '../../Contexts/Auth';
import Loading from '../../components/Loading';

const Main = () => {
  const navigation = useNavigation<any>();
  const { darkMode } = useTheme();
  const {firstLoad} = useAuth();
  const {getTerm} = useTerm();

  const registerTextColorStyle = {
    color: !darkMode ? config.dark : config.mediumGreen,
  };

  return (
    <MainView>
      <ImageBackground source={bg} style={[styles.container]} resizeMode='cover'>
        { firstLoad
        ? <Loading
            styles={{backgroundColor: "transparent", marginTop: "70%"}}
          />
        : <>
          <Button
            text={100009}
            onPress={()=>{navigation.navigate("Login")}}
            extraStyle={{marginTop: "70%"}}
          />

          <TouchableOpacity style={styles.registerButton} onPress={()=>{navigation.navigate("Register")}}>
            <Text style={[styles.buttonText, registerTextColorStyle]}>{getTerm(100010)}</Text>
          </TouchableOpacity>
        </> }
      </ImageBackground>
    </MainView>
  );
}

export default Main;