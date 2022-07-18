import React from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import DefaultModal from '../DefaultModal';
import { useTheme } from '../../Contexts/Theme';
import { TagValue } from '../../utils/types';
import CardsButton from '../CardsButton';
import { useTerm } from '../../Contexts/TermProvider';
import Bar from '../Bar';
import Button from '../Button';

interface PlatformsModalProps {
  setModal: () => void;
  tagInfo: TagValue;
}

export default function PlatformsModal({setModal, tagInfo}: PlatformsModalProps) {
  const { darkMode } = useTheme();

  const color = darkMode ? config.dark : "#fff";
  const titleColor = darkMode ? "#fff" : config.dark;
  const descriptionColor = darkMode ? config.subTitleMainColor : config.dark;

  const {getTerm} = useTerm();

  function description(vote: "up" | "up-down" | "down")
  {
    const backgroundColor = {
      "up": config.darkGreen,
      "up-down": config.yellow,
      "down": config.red,
    }

    return (
      <View style={styles.descriptionContainer}>
        <Text style={[styles.descriptionText, {color: descriptionColor}]}>{tagInfo.description}</Text>

        <View>
          <CardsButton
            disabled
            iconName={`arrow-${vote}`}
            iconLibrary="MaterialCommunityIcons"
            style={{backgroundColor: backgroundColor[vote]}}
          />
        </View>
      </View>
    );
  }

  function evaluations(count: number, term: number)
  {
    return (
      <View style={[styles.descriptionContainer]}>
        <Text style={[styles.descriptionText, {color: descriptionColor, width: "100%"}]}>{count} {getTerm(term)}</Text>
      </View>
    );
  }

  return (
    <DefaultModal
      setModal={setModal}
      visible={true}
      loading={false}
    >
      <ScrollView style={[styles.container, {backgroundColor: color}]}>
        <Text style={[styles.title, {color: titleColor}]}>{tagInfo.name}</Text>

        <Text style={[styles.subTitle, {color: titleColor}]}>{getTerm(100114)}:</Text>
        {description("up")}
        {description("up-down")}
        {description("down")}

        <Bar
          counts={[tagInfo.upVotes, tagInfo.neutralVotes, tagInfo.downVotes]}
          colors={[config.darkGreen, config.yellow, config.red]}
        />

        <View style={[styles.evaluations]}>
          {evaluations(tagInfo.upVotes, 100115)}
          {evaluations(tagInfo.neutralVotes, 100116)}
          {evaluations(tagInfo.downVotes, 100117)}
        </View>

        <View style={[styles.evaluations]}>
          <Button
            text={100045}
            onPress={setModal}
            extraStyle={[{marginTop: 10}]}
            extraTextStyle={{textDecorationLine: 'underline', color: titleColor}}
            buttonColor={"transparent"}
            disabled={false}
          />
        </View>
      </ScrollView>
    </DefaultModal>
  );
};