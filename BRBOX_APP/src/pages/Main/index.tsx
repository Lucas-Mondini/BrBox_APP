import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MainView from '../../components/MainView';
import { useTerm } from '../../Contexts/TermProvider';

import config from "../../../brbox.config.json";

import styles from './styles';
import Button from '../../components/Button';
import { useTheme } from '../../Contexts/Theme';
import { useAuth } from '../../Contexts/Auth';
import Loading from '../../components/Loading';
import getImage from '../../utils/getImage';

const Main = () => {
  const navigation = useNavigation<any>();
  const { light ,mediumGreen} = useTheme();
  const {firstLoad} = useAuth();
  const {getTerm} = useTerm();
  const [title, setTitle] = useState({first: "BR", last: "BOX"});

  const registerTextColorStyle = {
    color: mediumGreen,
  };


  useEffect(() => {
    setTimeout(() => {
      setTitle({first: "GAME", last: "SCORE"});
    }, 2500);
  }, []);

  return (
    <MainView>
      <ImageBackground source={getImage("loginbackground")} style={[styles.container]} resizeMode='cover'>
        <View style={[styles.titleContainer]}>
          <Text style={[styles.title, {color: light}]}>{title.first}</Text>
          <View  style={[styles.last]}>
            <Text style={[styles.title, {color: light}]}>{title.last}</Text>
          </View>
        </View>

        { firstLoad
        ? <Loading
            styles={{flex: 0, marginTop: "70%"}}
          />
        : <>
          <Button
            text={100009}
            onPress={()=>{navigation.navigate("Login")}}
            extraStyle={{marginTop: "60%"}}
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