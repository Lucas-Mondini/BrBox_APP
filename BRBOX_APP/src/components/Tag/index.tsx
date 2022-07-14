import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { TagValue } from "../../utils/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getIcon } from "../../utils/functions";

interface TagProps {
  tag: TagValue;
  specificStyle?: string;
  large?: boolean;
  showName?: boolean;
  showTotalVotes?: boolean;
  extraStyles?: object;
  callback?: () => void;
}

export default function Tag({tag, specificStyle, large, showName, showTotalVotes, callback, extraStyles}: TagProps)
{
  // @ts-ignore
  const bg = specificStyle ? {backgroundColor: config[specificStyle]} : {};

  function formatVotes(vote: number): string
  {
    return String(vote > 1000 ? vote/1000 + "K" : vote);
  }

  if (!tag) return null;

  return (
    <TouchableOpacity
      onPress={callback}
      disabled={!callback}
      style={[styles.tag, extraStyles, large ? styles.tagLarge : styles.tagSmall, bg]}
    >
      <Icon
        name={getIcon(tag.icon)}
        size={large ? 18 : 16}
        color={"#000"}
        style={large ? styles.imgLarge : styles.imgSmall}
      />

      <Text style={[styles.tagText, large ? styles.tagTextLarge : styles.tagTextSmall]}>
        {showName ? ((showTotalVotes ? tag.count + " " : "") + tag.name) : formatVotes(tag.total || 0)}
      </Text>
    </TouchableOpacity>
  );
}