import React, { useState } from 'react';
import {
  Alert,
  Text,
  View
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import Button from '../Button';
import DefaultModal from '../DefaultModal';

import { useGame } from '../../Contexts/Game';
import { useTerm } from '../../Contexts/TermProvider';
import { useTheme } from '../../Contexts/Theme';
import { useRequest } from '../../Contexts/Request';
import RadioSelector from '../RadioSelector';

interface GameTimeModalProps {
  visible: boolean;

  setModal: () => void;
}

export default function GameTimeModal({visible, setModal}: GameTimeModalProps) {
  const { post } = useRequest();
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();
  const { id, gameTime, setGameTime } = useGame();

  const color = darkMode ? config.dark : "#fff";

  const textColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  const hours = (time: string) => time + " " + getTerm(100168);

  const [loading, setLoading] = useState(false);
  const [userGameTime, setUserGameTime] = useState(gameTime || 0);

  async function saveGameTime()
  {
    try {
      const response = await post("/gameTime/create", setLoading, {
        gameId: id, time: Number(userGameTime)
      });

      setGameTime(response.time);
      setLoading(false);
      setModal();
    } catch (err) {
      return Alert.alert(getTerm(100109), getTerm(100078));
    }
  }

  return (
    <DefaultModal
      setModal={setModal}
      visible={visible}
      style={[styles.modal, {backgroundColor: color}]}
    >
      <Text style={[styles.title, textColorStyle]}>{getTerm(100169)}:</Text>

      <RadioSelector
        options={[
          {value: 1, text: hours("0 - 2")},
          {value: 3, text: hours("2 - 5")},
          {value: 7, text: hours("5 - 8")},
          {value: 9, text: hours("8 - 12")},
          {value: 13, text: hours("12 - 20")},
          {value: 21, text: hours("20 - 50")},
          {value: 55, text: hours("50 - 100")},
          {value: 112, text: hours("100+")}
        ]}
        selectedOption={userGameTime}
        setOption={setUserGameTime}
      />

      <Button
        text={100026}
        onPress={saveGameTime}
        loading={loading}
        extraStyle={{marginTop: 15}}
      />
    </DefaultModal>
  );
};