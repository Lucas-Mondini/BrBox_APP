import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { TagValue } from "../../utils/types";
import { splitText } from "../../utils/functions";
import { useTheme } from "../../Contexts/Theme";

interface GameCardProps {
  id: number;
  title: string;
  tag1?: TagValue;
  tag2?: TagValue;
  tag3?: TagValue;
  editGame?: boolean;
  imgUri: string;
}

export default function GameCard({id, title, tag1, tag2, tag3, editGame, imgUri}:GameCardProps)
{
  const { darkMode } = useTheme();
  const navigation = useNavigation<any>();

  const textColor = {color: darkMode ? "#fff" : config.dark}
  const cardBackgroundColor = {backgroundColor: darkMode ? config.darkGray : config.light}

  function navigateToGameInfo() {
    return navigation.navigate(editGame ? "AddGame" : "GameInfo", {id, tags: [tag1, tag2, tag3]});
  }

  function formatVotes(vote: number) {
    return String(vote > 1000 ? vote/1000 + "K" : vote);
  }

  return (
    <TouchableOpacity style={[styles.gameCard, cardBackgroundColor]} onPress={navigateToGameInfo}>
      <View style={styles.container}>
        <View>
          <Image style={styles.img} source={{uri: imgUri}} />
        </View>
        <View style={styles.info}>
          <View>
            <Text style={[styles.title, textColor]}>{splitText(title, 25)}</Text>
            <View style={styles.tagsContainer}>
              {Boolean(tag1) && <Text style={[styles.tag, {backgroundColor: config.mediumGreen}]}>{formatVotes(tag1?.total || 0)} {splitText(tag1?.tag || "", 10)}</Text>}
              {Boolean(tag2) && <Text style={[styles.tag, {backgroundColor: config.yellow}]}>{formatVotes(tag1?.total || 0)} {splitText(tag2?.tag || "", 10)}</Text>}
              {Boolean(tag3) && <Text style={[styles.tag, {backgroundColor: config.lightRed}]}>{formatVotes(tag1?.total || 0)} {splitText(tag3?.tag || "", 10)}</Text>}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}