import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import config from '../../../brbox.config.json';

import {useGame} from '../../Contexts/Game';
import {useTerm} from '../../Contexts/TermProvider';
import {useTheme} from '../../Contexts/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface GameTimeCardProps {
  onPress?: () => void;
}

export default function GameTimeCard({onPress}: GameTimeCardProps) {
  const {getTerm} = useTerm();
  const {darkMode} = useTheme();
  const {gameTime, rate} = useGame();

  const color = darkMode ? config.subTitleMainColor : config.dark;

  function formatGameTime() {
    if (!gameTime) return;

    switch (true) {
      case gameTime >= 0 && gameTime <= 2:
        return '0 - 2';
        break;
      case gameTime >= 2 && gameTime <= 5:
        return '2 - 5';
        break;
      case gameTime >= 5 && gameTime <= 8:
        return '5 - 8';
        break;
      case gameTime >= 8 && gameTime <= 12:
        return '8 - 12';
        break;
      case gameTime >= 12 && gameTime <= 20:
        return '12 - 20';
        break;
      case gameTime >= 20 && gameTime <= 50:
        return '20 - 50';
        break;
      case gameTime >= 50 && gameTime <= 100:
        return '50 - 100';
        break;
      case gameTime > 100:
        return '100+';
        break;
    }
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={[styles.card]}>
        <View style={[styles.gameTimeInfo]}>
          <Text style={[styles.rate]}>
            <Text style={[styles.rateBig]}>
              {typeof rate === 'number' ? rate : 0}
            </Text>
            /10
          </Text>
          <View style={[styles.gameTimeContainer]}>
            <Text
              style={[
                styles.text,
                {color, textDecorationLine: !gameTime ? 'underline' : 'none'},
              ]}>
              {getTerm(!gameTime ? 100138 : 100140).replace(
                '%1',
                String(formatGameTime()),
              )}
            </Text>
            <Icon name="progress-clock" color={color} size={35} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
