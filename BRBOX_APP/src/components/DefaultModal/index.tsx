import React from 'react';
import { Modal, View } from 'react-native';

import Loading from '../Loading';
import config from "../../../brbox.config.json";

import styles from './styles';
import { useTheme } from '../../Contexts/Theme';

type ModalProps = {
  visible: boolean;
  loading: boolean;
  setModal: () => void;
  children: React.ReactElement | React.ReactElement[];
  animationType?: "slide" | "none" | "fade";
  style?: object;
}

const DefaultModal: React.FC<ModalProps> = ({visible, loading, setModal, children, animationType, style}) =>
{
  const { darkMode } = useTheme();
  const color = darkMode ? "#fff" : config.dark;
  return (
    <Modal
      style={[styles.modal, {backgroundColor: color}]}
      transparent
      onRequestClose={setModal}
      visible={visible}
      animationType={animationType || "slide"}
    >
      <View
        style={styles.modalBackground}
      >
        <View style={[styles.modalContent, style ? style : {flex: 1}]}>
          {loading ? <Loading styles={{borderRadius: 8}} /> : children}
        </View>
      </View>
    </Modal>
  );
}

export default DefaultModal;