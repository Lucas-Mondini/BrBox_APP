import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import DefaultModal from '../DefaultModal';
import { useTheme } from '../../Contexts/Theme';

interface IconsModalProps {
  visible: boolean;
  setModal: () => void;
  setIcon: (icon: number) => void;
}

import icons from '../../utils/tagsIcons.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getIcon } from '../../utils/functions';

export default function IconsModal({setModal, visible, setIcon}: IconsModalProps) {
  const { darkMode } = useTheme();

  const color = darkMode ? config.dark : "#fff";

  function renderIcons()
  {
    let iconList = [];

    for (let index in icons) {
      const iconName = getIcon(Number(index));

      iconList.push(
        <TouchableOpacity
          onPress={() => {
            setIcon(Number(index));
            setModal();
          }}
          key={index}
        >
          <Icon
            name={iconName}
            size={45}
            color={darkMode ? "#fff" :config.dark}
          />
        </TouchableOpacity>
      );
    }

    return (
      <Text>
        {iconList}
      </Text>
    );
  }

  return (
    <DefaultModal
      setModal={setModal}
      visible={visible}
      loading={false}
      style={{}}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={[{backgroundColor: color}]}
      >
        {renderIcons()}
      </ScrollView>
    </DefaultModal>
  );
};