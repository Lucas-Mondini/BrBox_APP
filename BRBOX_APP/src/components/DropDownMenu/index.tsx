import React, { useEffect, useRef } from "react";
import { Animated, Modal, Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import Icon from "react-native-vector-icons/AntDesign";
import { useTheme } from "../../Contexts/Theme";
import DropDownMenuButtons from "./DropDownMenuButtons";

interface DropDownMenuProps {
  visible: boolean;
  setModal: (value: any) => void;
}

export default function DropDownMenu({visible, setModal}: DropDownMenuProps)
{
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const grow = () => {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 270,
      duration: 500
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 0
    }).start();
  };

  const { darkMode } = useTheme();

  const backgroundColor = !darkMode ? "#fff" : config.darkGray;

  useEffect(() => {
    if (visible) grow();
    else fadeOut();
  }, [visible]);

  return (
    <Modal
      transparent onRequestClose={() => setModal(false)}
      visible={visible}
      animationType="fade"
    >
      <TouchableOpacity style={styles.menuCloseButton} onPress={()=>{setModal(null)}}>
        <Icon name="close" color={darkMode ? config.mediumGreen : config.darkGreen} size={35}/>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.menuContainer,
          {
            backgroundColor,
            width: fadeAnim
          }
      ]}>
        <DropDownMenuButtons
          visible={visible}
          setModal={setModal}
        />
        <Text style={[styles.menuButtonText, {color: "#686868", textAlign: "center", marginVertical: 5}]}>V {config.version}</Text>
      </Animated.View>
      <TouchableOpacity style={styles.closeModal} onPress={()=>{setModal(null)}} />
    </Modal>
  );
}