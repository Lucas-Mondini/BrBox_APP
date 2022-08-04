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
  extraStyles?: object;
  callback?: () => void;
}

export default function TagLarge({tag, userVoteValue, callback, extraStyles}: TagLargeProps)
{
  const { darkMode } = useTheme();

  const bg = {
    0: "#696969",
    1: config.greenBar,
    2: config.yellow,
    3: config.red,
  }
  function formatVotes(vote: number): string
  {
    return String(vote >= 1000 ? (vote >= 1000000 ? vote/1000000 + "M" : vote/1000 + "K") : vote);
  }

  if (!tag) return null;

  return (
    <View style={[styles.tagContainer, {backgroundColor: darkMode ? config.darkGray : config.light}]}>
      <View style={styles.imgContainer}>
        <View
          style={[styles.img, {backgroundColor: bg[userVoteValue || 0]}]}
        >
          <Icon
            size={18}
            color={"#000"}
            name={getIcon(tag.icon)}
          />
        </View>

        <Text style={styles.tagName}>{tag.name}</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={callback} disabled={!callback}
          style={[styles.tag, {overflow:"hidden"}, extraStyles]}
        >
          <View style={[{height: 20, flexDirection: "row", width: "100%"}]}>
            <View style={{backgroundColor: tag.count ? config.darkGreen : bg[0], flex: tag.upVotes ? tag.upVotes : 1}}/>
            <View style={{backgroundColor: config.yellow, flex: tag.neutralVotes}}/>
            <View style={{backgroundColor: config.lightRed, flex: tag.downVotes}}/>
          </View>
        </TouchableOpacity>

        <Text>{formatVotes(tag.upVotes)}/{formatVotes(tag.neutralVotes)}/{formatVotes(tag.downVotes)}</Text>
      </View>
    </View>
  );
}