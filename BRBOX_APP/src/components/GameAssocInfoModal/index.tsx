import React from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import { useTerm } from '../../Contexts/TermProvider';
import { useGame } from '../../Contexts/Game';
import { useTheme } from '../../Contexts/Theme';

import Button from '../Button';
import DefaultModal from '../DefaultModal';
import ToggleContent from '../ToggleContent';
import GenreModeCard from '../GenreModeCard';

interface PlatformsModalProps {
  visible: boolean;
  setModal: () => void;
}

export default function PlatformsModal({visible, setModal}: PlatformsModalProps) {
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();
  const { businessModelList, renderBusinessModel, genreList, modeList } = useGame();

  const color = darkMode ? config.dark : "#fff";
  const titleColor = darkMode ? "#fff" : config.dark;

  function renderGenreMode(isGenre?: boolean)
  {
    const list = isGenre ? genreList : modeList;
    let listEl = null;

    if (list.length == 0) {
      listEl = (
        <Text
          style={[styles.noContentText]}
        >
          {getTerm(isGenre ? 100165 : 100166)}
        </Text>
      );
    } else {
      listEl = list.map(item => (
        <GenreModeCard
          hideBottom
          setLoading={() => {}}
          id={item.id}
          name={item.name}
        />
      ));
    }

    return (
      <ToggleContent
        title={isGenre ? 100155 : 100156}
        colapseOnStart={list.length == 0}
        content={<>{listEl}</>}
      />
    );
  }

  return (
    <DefaultModal
      setModal={setModal}
      visible={visible}
      loading={false}
    >
      <ScrollView style={[styles.container, {backgroundColor: color}]}>
        <View style={[styles.evaluations]}>
          {renderGenreMode(true)}
          {renderGenreMode()}

          <ToggleContent
            title={100121}
            colapseOnStart={businessModelList.length == 0}
            content={renderBusinessModel(false)}
          />

        </View>
      </ScrollView>

      <View style={[styles.leaveButtonView, {backgroundColor: color}]}>
        <Button
          text={100025}
          onPress={setModal}
          extraStyle={[{marginTop: 10}]}
          extraTextStyle={{textDecorationLine: 'underline', color: titleColor}}
          buttonColor={"transparent"}
        />
      </View>
    </DefaultModal>
  );
};