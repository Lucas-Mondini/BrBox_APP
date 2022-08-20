import React, { useEffect, useRef } from 'react';
import { Animated, Modal, View } from 'react-native';

import Loading from '../Loading';
import config from "../../../brbox.config.json";

import styles from './styles';
import { useTheme } from '../../Contexts/Theme';

type ModalProps = {
  visible: boolean;
  loading?: boolean;
  setModal: () => void;
  children: React.ReactElement | React.ReactElement[];
  animationType?: "slide" | "none" | "fade";
  style?: object;
}

const DefaultModal: React.FC<ModalProps> = ({visible, loading, setModal, children, animationType, style}) =>
{
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { darkMode } = useTheme();
  const color = darkMode ? "#fff" : config.dark;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 1,
      duration: 1000
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 0
    }).start();
  };

  useEffect(() => {
    if (visible) fadeIn();
    else fadeOut();
  }, [visible]);

  return (
    <Modal
      style={[styles.modal, {backgroundColor: color}]}
      transparent
      onRequestClose={setModal}
      visible={visible}
      animationType={animationType || "fade"}
    >
      <View style={styles.modalBackground}>
        <Animated.View style={{opacity: fadeAnim}}>
          <View style={[styles.modalContent, style || {flex: 1}]}>
            {loading ? <Loading styles={{borderRadius: 8}} /> : children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default DefaultModal;