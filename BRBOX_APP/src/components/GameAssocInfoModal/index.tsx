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

interface GameAssocInfoModalProps {
  visible: boolean;
  setModal: () => void;
}

export default function GameAssocInfoModal({visible, setModal}: GameAssocInfoModalProps) {
  const { getTerm } = useTerm();
  const { dark,light} = useTheme();
  const { businessModelList, renderBusinessModel, genreList, modeList } = useGame();

  const color = dark;
  const titleColor = light;

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
          key={item.id}
          name={item.name}
          disabled
          genre={isGenre}
          description={item.description}
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
      style={styles.container}
    >
      <ScrollView style={[{backgroundColor: color, borderRadius: 8, height: "100%"}]}>
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