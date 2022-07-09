import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { TagValue } from "../../utils/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getIcon } from "../../utils/functions";

interface TagProps {
  tag: TagValue;
  specificStyle?: string;
  large?: boolean;
}

export default function Tag({tag, specificStyle, large}: TagProps)
{
  // @ts-ignore
  const bg = specificStyle ? {backgroundColor: config[specificStyle]} : {};

  function formatVotes(vote: number): string
  {
    return String(vote > 1000 ? vote/1000 + "K" : vote);
  }

  if (!tag) return null;

  return (
    <View style={[styles.tag, large ? styles.tagLarge : styles.tagSmall, bg]}>
      <Icon
        name={getIcon(tag.icon)}
        size={large ? 18 : 16}
        color={"#000"}
        style={large ? styles.imgLarge : styles.imgSmall}
      />

      <Text style={[styles.tagText, large ? styles.tagTextLarge : styles.tagTextSmall]}>
        {formatVotes(tag.total || 0)}
      </Text>
    </View>
  );
}