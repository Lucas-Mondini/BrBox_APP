import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { getIcon, splitText } from "../../utils/functions";
import CardsButton from "../CardsButton";
import { useRequest } from "../../Contexts/Request";
import { useTheme } from "../../Contexts/Theme";
import Loading from "../Loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../Button";
import { useTerm } from "../../Contexts/TermProvider";

interface TagEvaluationCardProps {
  id: number;
  icon: number;
  evaluationId?: number;
  title: string;
  value?: number;
  description: string;
  tagValueListId: number;
  remove: () => void;
  extraCallback?: () => void;
}

export default function TagEvaluationCard({id, evaluationId, title, icon, value, description, tagValueListId, remove, extraCallback}: TagEvaluationCardProps)
{
  const iconColors: any = {
    0: "#FFF",
    1: config.greenBar,
    2: config.yellow,
    3: config.red,
  }

  const { darkMode } = useTheme();
  const [selectedEvaluationVote, setSelectedEvaluationVote] = useState(value || 0);
  const [loading, setLoading] = useState(false);
  const [loadingVote, setLoadingVote] = useState(0);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [sendRequest, setSendRequest] = useState(Boolean(evaluationId));
  const [evalId, setEvalId] = useState(evaluationId || 0);
  const [showButtons, setShowButtons] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { post } = useRequest();
  const { getTerm } = useTerm();

  const textColor = {color: darkMode ? "#fff" : config.dark}
  const descriptionColor = {color: darkMode ? config.subTitleMainColor : config.dark}
  const iconColor = (value: number) => darkMode || selectedEvaluationVote === value ? "#fff" : config.mainIconColor;
  const actionsColor = darkMode ? "#fff" : config.mainIconColor;
  const {width} = Dimensions.get('window');

  async function saveVote(vote: number) {
    setLoading(true);
    setLoadingVote(vote);

    try {
      const response = await post("tagValue/add", setLoading, {
        tagValueListId, tag: id, value: vote
      });

      setEvalId(response.tagValueId);
      setSelectedEvaluationVote(response.value);
      setSendRequest(true);
      setShowButtons(false);
    } catch (error: any) {
      setSelectedEvaluationVote(vote);
    }

    if (extraCallback) extraCallback();

    setLoading(false);
    setLoadingVote(0);
  }

  async function deleteVote() {
    setLoading(true);
    setLoadingDelete(true);

    try {
      if (evalId && sendRequest) {
        await post("tagValue/remove", setLoading, {
          tagValueListId, tagValueId: evalId
        });
      }
    } catch (e : any) {
    }

    setLoading(false);
    setLoadingDelete(false);
    remove();
  }

  function toggleButtons()
  {
    setShowButtons(!showButtons);
  }

  function getImage()
  {
    return (
      <Icon
        color={iconColors[selectedEvaluationVote] || "#FFF"}
        size={showInfo ? 60 : 30}
        name={getIcon(icon)}
      />
    );
  }

  function returnInfoButton(text: number, backgroundColor: string, callback: () => void, deleteButton?: boolean)
  {
    if (showInfo) {
      return (
        <Button
          text={text}
          onPress={callback}
          loading={deleteButton && loadingDelete}
          extraStyle={[loading ? {marginTop: 10} : {marginTop: 10}]}
          extraTextStyle={!deleteButton ? [textColor, {textDecorationLine: 'underline'}] : {}}
          buttonColor={backgroundColor}
          disabled={loading}
        />
      );
    }

    if (!deleteButton) return null;

    return (
      <CardsButton
        iconName={"trash"}
        iconColor={actionsColor}
        iconLibrary={"Ionicons"}
        onPress={callback}
        style={loading ? {opacity: 0} : {}}
        disabled={loading}
      />
    );
  }

  function returnButton(desc: string, icon: string, iconLibrary: any, buttonIndex: number)
  {
    return (
      <View  style={showInfo ? styles.infoButtonView: {}}>
        {showInfo &&
          <View style={styles.descriptionsView}>
            <Text style={[styles.description, styles.descriptionInfo, descriptionColor]}>{desc}</Text>
          </View>
        }
        <View style={showInfo ? styles.button : {}}>
          {loadingVote === buttonIndex
            ? <Loading styles={{width: 45, height: 40}}/>
            : <CardsButton
                iconName={icon}
                iconLibrary={iconLibrary}
                iconColor={iconColor(buttonIndex)}
                onPress={() => saveVote(buttonIndex)}
                style={selectedEvaluationVote === buttonIndex ? {backgroundColor: iconColors[buttonIndex]} : {}}
              />
          }
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity style={[showInfo ? styles.tagCardFull : styles.tagCard]} disabled={showInfo} onPress={() => setShowInfo(!showInfo)}>
      {(!showButtons || showInfo) &&
        <View style={[showInfo ? styles.axesViewInfo : styles.axesView, showInfo ? {} : {backgroundColor: darkMode ? config.darkGray : config.light}]}>
          {getImage()}
        </View>
      }

      <View>
        <Text style={[styles.title, textColor, showInfo ? styles.titleInfo : {}]}>
          {showInfo ? title : splitText(title, width >= 400 ? 20 : 15)}
        </Text>

        {!showInfo &&
          <Text
            style={[styles.description, descriptionColor]}
          >
            {getTerm(100113)}
          </Text>
        }
      </View>

      <View style={[showInfo ? styles.buttonViewFull : styles.buttonView, {backgroundColor: !darkMode ? "#fff" : config.dark}]}>
      {showButtons || showInfo ?
        <>{loading && !showInfo
          ? <Loading
              styles={{paddingRight: 35}}
            />
          : <>
            {returnButton(description, "arrow-up", "MaterialCommunityIcons", 1)}
            {returnButton(description, "arrow-up-down", "MaterialCommunityIcons", 2)}
            {returnButton(description, "arrow-down", "MaterialCommunityIcons", 3)}

            {returnInfoButton(100032, config.red, deleteVote, true)}
            {returnInfoButton(100112, "transparent", () => setShowInfo(!showInfo))}
          </>}

          {!showInfo &&
            <CardsButton
              iconColor={actionsColor}
              iconName="close"
              iconLibrary="MaterialIcons"
              onPress={toggleButtons}
              style={loading ? {opacity: 0} : {}}
              disabled={loading}
              />
          }
            </>
          : <CardsButton
              iconColor={actionsColor}
              iconName="options-vertical"
              iconLibrary="SimpleLineIcons"
              onPress={toggleButtons}
              style={loading ? {opacity: 0} : {}}
              disabled={loading}
            />
      }
      </View>
    </TouchableOpacity>
  );
}