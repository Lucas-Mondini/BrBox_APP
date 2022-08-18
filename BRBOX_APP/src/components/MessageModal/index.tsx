import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../Contexts/Theme';
import Button from '../Button';
import DefaultModal from '../DefaultModal';
import config from "../../../brbox.config.json";

import styles from './styles';
import { useTerm } from '../../Contexts/TermProvider';

type MessageModalProps = {
  message: {title: number, message: number} | null;
  visible: boolean;
  setModal: () => void;
  buttonCustomText?: number;
  buttonCustomFunction?: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({message, visible, setModal, buttonCustomText, buttonCustomFunction}) =>
{
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();
  const backgroundColor = darkMode ? config.dark : "#fff";
  const textColor = !darkMode ? config.dark : "#fff";

  if (!message) return null;

  return (
    <DefaultModal
      setModal={setModal}
      visible={visible}
      animationType={"slide"}
      style={[styles.modal, {backgroundColor: backgroundColor}]}
    >
      <View style={[styles.titleView]}>
        <Text style={[styles.messageTitle, {color: textColor}]}>{getTerm(message.title)}</Text>
      </View>

      <Text style={[styles.message, {color: textColor}]}>{getTerm(message.message)}</Text>

      <Button
        text={buttonCustomText || 100170}
        onPress={buttonCustomFunction || setModal}
      />
    </DefaultModal>
  );
}

export default MessageModal;