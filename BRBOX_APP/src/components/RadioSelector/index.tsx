import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import { useTheme } from '../../Contexts/Theme';
import { RadioOption } from '../../utils/types';

interface RadioSelectorProps {
  options: RadioOption[];
  selectedOption: number;
  setOption: (value: number) => void;
}

export default function RadioSelector({options, selectedOption, setOption}: RadioSelectorProps) {
  const { darkMode } = useTheme();
  const color = darkMode ? "#fff" : config.dark;

  function renderOptions()
  {
    return options.map(option => (
      <TouchableOpacity
        style={styles.option}
        onPress={() => setOption(option.value)}
      >
        <View style={[styles.select, {backgroundColor: selectedOption === option.value ? config.greenBar : config.mainIconColor}]}/>
        <Text style={[styles.text, {color: color}]}>{option.text}</Text>
      </TouchableOpacity>
    ));
  }

  return (
    <View style={[styles.container]}>
      {renderOptions()}
    </View>
  );
};