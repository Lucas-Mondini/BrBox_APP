import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { TagValue } from "../../utils/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getIcon } from "../../utils/functions";
import { useTheme } from "../../Contexts/Theme";

interface TagLargeProps {
  tag: TagValue;
  userVote?: boolean;
  userVoteId?: number;
  userVoteValue?: 1 | 2 | 3;
  callback?: () => void;
}

export default function TagLarge({ tag, userVoteValue, callback }: TagLargeProps) {

  const {
    greenBar,
    yellow,
    red,
    subTitleMainColor,
    darkGray,
    darkGreen,
    lightRed } = useTheme();

  const color = subTitleMainColor;

  const bg = {
    0: "#696969",
    1: greenBar,
    2: yellow,
    3: red,
  }
  function formatVotes(vote: number): string {
    return String(vote >= 1000 ? (vote >= 1000000 ? vote / 1000000 + "M" : vote / 1000 + "K") : vote);
  }

  if (!tag) return null;

  return (
    <TouchableOpacity
      onPress={callback}
      disabled={!callback}
      style={[styles.tagContainer, { backgroundColor: darkGray }]}
    >
      <View style={styles.imgContainer}>
        <View
          style={[styles.img, { backgroundColor: bg[userVoteValue || 0] }]}
        >
          <Icon
            size={18}
            color={"#000"}
            name={getIcon(tag.icon)}
          />
        </View>

        <Text style={[styles.tagName, { color }]}>{tag.name}</Text>
      </View>

      <View style={styles.container}>
        <View
          style={[styles.tag]}
        >
          <View style={styles.bar}>
            <View style={{ backgroundColor: tag.count ? darkGreen : bg[0], flex: tag.count ? tag.upVotes : 1 }} />
            <View style={{ backgroundColor: yellow, flex: tag.neutralVotes }} />
            <View style={{ backgroundColor: lightRed, flex: tag.downVotes }} />
          </View>
        </View>

        <Text style={[styles.evaluations, { color }]}>{formatVotes(tag.upVotes)}/{formatVotes(tag.neutralVotes)}/{formatVotes(tag.downVotes)}</Text>
      </View>
    </TouchableOpacity>
  );
}