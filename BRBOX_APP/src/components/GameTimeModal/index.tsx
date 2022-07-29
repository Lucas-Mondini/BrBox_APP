import React, { useState } from 'react';
import {
  Alert,
  View
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import Input from '../Input';
import Button from '../Button';
import DefaultModal from '../DefaultModal';

import { useGame } from '../../Contexts/Game';
import { useTerm } from '../../Contexts/TermProvider';
import { useTheme } from '../../Contexts/Theme';
import { useRequest } from '../../Contexts/Request';

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

  const [loading, setLoading] = useState(false);
  const [userGameTime, setUserGameTime] = useState(gameTime ? String(gameTime) : "");

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
      style={styles.modal}
    >
      <View style={[styles.container, {backgroundColor: color}]}>
        <Input
          placeholderText={100139}
          value={userGameTime}
          onChangeText={(value) => setUserGameTime(value.replace(/\D/g, ''))}
          keyboardType="numeric"
        />

        <Button
          text={100026}
          onPress={saveGameTime}
          loading={loading}
          extraStyle={{marginTop: 15}}
        />
      </View>
    </DefaultModal>
  );
};