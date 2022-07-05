import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { TagValue } from "../../utils/types";
import { splitText } from "../../utils/functions";
import { useTheme } from "../../Contexts/Theme";
import TopTags from "../TopTags";

interface GameCardProps {
  id: number;
  title: string;
  tags: TagValue[];
  editGame?: boolean;
  imgUri: string;
}

export default function GameCard({id, title, tags, editGame, imgUri}:GameCardProps)
{
  const { darkMode } = useTheme();
  const navigation = useNavigation<any>();

  const textColor = {color: darkMode ? "#fff" : config.dark}
  const cardBackgroundColor = {backgroundColor: darkMode ? config.darkGray : config.light}

  function navigateToGameInfo() {
    return navigation.navigate(editGame ? "AddGame" : "GameInfo", {id, tags});
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

            <TopTags
              tags={tags}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}