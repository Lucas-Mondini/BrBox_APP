import React, { useState } from 'react';
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
import { useRequest } from '../../Contexts/Request';
import { useGame } from '../../Contexts/Game';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getIcon } from '../../utils/functions';

interface TagInfoModalProps {
  setModal: () => void;
  reloadGameInfo: () => void;
  tagInfo: TagValue;
}

export default function TagInfoModal({setModal, reloadGameInfo, tagInfo}: TagInfoModalProps) {
  const iconColors: any = {
    0: "#FFF",
    1: config.greenBar,
    2: config.yellow,
    3: config.red,
  }

  const { post } = useRequest();
  const { darkMode } = useTheme();
  const { tagValueList } = useGame();

  const [tagInformation, setTagInformation] = useState(tagInfo);
  const [loading, setLoading] = useState(0);
  const [evaluationId, setEvaluationId] = useState(tagInformation.userVoteId || 0);
  const [userEvaluation, setUserEvaluation] = useState(tagInformation.userVoteValue || 0);

  const color = darkMode ? config.dark : "#fff";
  const titleColor = darkMode ? "#fff" : config.dark;
  const actionsColor = darkMode ? "#fff" : config.mainIconColor;
  const descriptionColor = darkMode ? config.subTitleMainColor : config.dark;
  const iconColor = (value: number) => darkMode || userEvaluation === value ? "#fff" : config.mainIconColor;

  const {getTerm} = useTerm();

  async function saveVote(vote: number) {
    setLoading(vote);

    try {
      const response = await post("tagValue/add", () =>{}, {
        tagValueListId: tagValueList, tag: tagInformation.id, value: vote
      });

      setEvaluationId(response.tagValueId);
      setUserEvaluation(response.value);
    } catch (error: any) {
      setUserEvaluation(vote);
    }

    setLoading(0);
    reloadGameInfo();
  }

  async function deleteVote() {
    setLoading(4);

    try {
      await post("tagValue/remove", ()=>{}, {
        tagValueListId: tagValueList, tagValueId: evaluationId
      });
    } catch (e : any) {
    }

    setLoading(0);
    setEvaluationId(0);
    setUserEvaluation(0);

    reloadGameInfo();
  }

  function description(vote: "up" | "up-down" | "down")
  {
    const backgroundColor = {
      "up": config.darkGreen,
      "up-down": config.yellow,
      "down": config.red,
    }

    const description = {
      "up": tagInformation.description_positive,
      "up-down": tagInformation.description_neutral,
      "down": tagInformation.description_negative,
    }

    return (
      <View style={styles.descriptionContainer}>
        <View>
          <CardsButton
            disabled
            iconName={`arrow-${vote}`}
            iconLibrary="MaterialCommunityIcons"
            style={{backgroundColor: backgroundColor[vote]}}
          />
        </View>

        <Text style={[styles.descriptionText, {color: descriptionColor, textAlign: "left", paddingLeft: 10}]}>{description[vote]}</Text>
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
        <View style={[styles.titleContainer]}>
          <Text style={[styles.title, {width: "65%", color: titleColor}]}>{tagInformation.name}</Text>
          <View style={[styles.icon, {backgroundColor: darkMode ? config.darkGray : config.light}]}>
            <Icon
              name={getIcon(tagInformation.icon)}
              size={40}
              color={iconColors[userEvaluation]}
            />
          </View>
        </View>

        <Text style={[styles.subTitle, {color: titleColor}]}>{getTerm(100114)}:</Text>
        {description("up")}
        {description("up-down")}
        {description("down")}

        {!tagInformation.count
          ? <Text style={[styles.subTitle, {color: descriptionColor, textAlign: "center"}]}>{getTerm(100151)}</Text>
          : <>
            <Bar
              counts={[tagInformation.upVotes, tagInformation.neutralVotes, tagInformation.downVotes]}
              colors={[config.darkGreen, config.yellow, config.red]}
            />

            <View style={[styles.evaluations]}>
              {evaluations(tagInformation.upVotes, 100115)}
              {evaluations(tagInformation.neutralVotes, 100116)}
              {evaluations(tagInformation.downVotes, 100117)}
            </View>
          </>
        }

        <View>
          <Text style={[styles.title, styles.evaluationTitles, {color: titleColor}]}>{getTerm(100150)}:</Text>

          <View style={[styles.evaluationContainer]}>
            <CardsButton
              onPress={() => saveVote(1)}
              loading={loading == 1}
              iconName={`arrow-up`}
              iconColor={iconColor(1)}
              iconLibrary="MaterialCommunityIcons"
              style={{backgroundColor: userEvaluation === 1 && !loading ? config.greenBar : "transparent"}}
            />
            <CardsButton
              onPress={() => saveVote(2)}
              loading={loading == 2}
              iconName={`arrow-up-down`}
              iconColor={iconColor(2)}
              iconLibrary="MaterialCommunityIcons"
              style={{backgroundColor: userEvaluation === 2 && !loading ? config.yellow : "transparent"}}
            />
            <CardsButton
              onPress={() => saveVote(3)}
              loading={loading == 3}
              iconName={`arrow-down`}
              iconColor={iconColor(3)}
              iconLibrary="MaterialCommunityIcons"
              style={{backgroundColor: userEvaluation === 3 && !loading ? config.red : "transparent"}}
            />

            {Boolean(evaluationId) &&
              <CardsButton
                onPress={deleteVote}
                loading={loading == 4}
                iconName={`trash`}
                iconLibrary={"Ionicons"}
                iconColor={actionsColor}
              />
            }
          </View>
        </View>

        <View style={[styles.evaluations, styles.leaveButtonView]}>
          <Button
            text={100025}
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