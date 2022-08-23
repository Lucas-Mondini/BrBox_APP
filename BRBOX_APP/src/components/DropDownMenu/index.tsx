import React, { useEffect, useRef, useState } from "react";
import { Animated, Modal, Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../Contexts/Theme";
import DropDownMenuButtons from "./DropDownMenuButtons";

interface DropDownMenuProps {
  visible: boolean;
  setModal: (value: any) => void;
  setHideMenu: (value: any) => void;
}

export default function DropDownMenu({visible, setModal, setHideMenu}: DropDownMenuProps)
{
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(visible);

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
      toValue: 0,
      duration: 300
    }).start();
  };

  const { darkMode } = useTheme();

  const backgroundColor = !darkMode ? "#fff" : config.darkGray;

  useEffect(() => {
    if (show) grow();
    else fadeOut();
  }, [show]);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setModal(false);
      }, 350);
    }
  }, [show]);

  return (
    <Modal
      transparent onRequestClose={() => setShow(false)}
      visible={visible}
      animationType="fade"
    >
      <TouchableOpacity style={styles.menuCloseButton} onPress={()=>{setShow(false)}}>
        <Icon name={show ? "close" : "menu"} color={darkMode ? config.mediumGreen : config.darkGreen} size={35}/>
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
          visible={show}
          setHideMenu={setHideMenu}
        />
        <Text style={[styles.menuButtonText, {color: "#686868", textAlign: "center", marginVertical: 5}]}>V {config.version}</Text>
      </Animated.View>
      <TouchableOpacity style={styles.closeModal} onPress={()=>{setShow(false)}} />
    </Modal>
  );
}