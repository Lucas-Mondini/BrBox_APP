import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import { useGame } from '../../Contexts/Game';
import { useTerm } from '../../Contexts/TermProvider';
import { useTheme } from '../../Contexts/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface GameTimeCardProps {
  onPress?: () => void;
}

export default function GameTimeCard({onPress}: GameTimeCardProps) {
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();
  const { gameTime, rate } = useGame();

  const color = darkMode ? config.subTitleMainColor : config.dark;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.card,]}>
        <View style={[styles.gameTimeInfo]}>
          <Text style={[styles.rate]}><Text style={[styles.rateBig]}>{rate}</Text>/10</Text>
          <View style={[styles.gameTimeContainer]}>
            <Text style={[styles.text, {color, textDecorationLine: !gameTime ? "underline" : "none"}]}>{getTerm(!gameTime ? 100138 : 100140).replace("%1", String(gameTime))}</Text>
            <Icon name="progress-clock" color={color} size={35} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};