import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

import config from '../../../brbox.config.json';
import {Params} from '../../utils/types';
import {useTheme} from '../../Contexts/Theme';

export default function BottomMenu() {
  const navigation = useNavigation<any>();

  const {darkMode} = useTheme();

  const iconColor = darkMode ? '#fff' : config.mainIconColor;
  const backgroundColor = {backgroundColor: darkMode ? config.dark : '#fff'};

  function goTo(route: string, params?: Params) {
    return navigation.reset({
      index: 0,
      routes: [{name: 'Home'}, {name: route, params}],
    });
  }

  return (
    <View style={[styles.bottomMenuContainer, backgroundColor]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => goTo('SearchGame')}>
        <Icon name="magnify" size={35} color={iconColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          goTo('Home', {filterUser: true});
        }}>
        <Icon name="checkbox-outline" size={35} color={iconColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          goTo('Home', {watchlist: true});
        }}>
        <Icon name="star-outline" size={35} color={iconColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          goTo('Recommended');
        }}>
        <Icon name="thumb-up-outline" size={35} color={iconColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          goTo('Share');
        }}>
        <Icon name="export" size={35} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}
