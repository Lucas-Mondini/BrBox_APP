import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { TagValue } from "../../utils/types";
import getImages from "../../utils/getImage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getIcon } from "../../utils/functions";

interface TopTagsProps {
  tags?: TagValue[];
  large?: boolean;
}

export default function TopTags({tags, large}: TopTagsProps)
{
  function formatVotes(vote: number): string
  {
    return String(vote > 1000 ? vote/1000 + "K" : vote);
  }

  function returnTags(tag: TagValue, specificStyle: string, image: string)
  {
    // @ts-ignore
    const bg = {backgroundColor: config[specificStyle]};

    if (!tag) return null;

    const icon = Math.round(Math.random() * 81);

    return (
      <View style={[styles.tag, large ? styles.tagLarge : styles.tagSmall, bg]}>
        <Icon
          name={getIcon(icon)}
          size={large ? 18 : 16}
          color={"#000"}
          style={large ? styles.imgLarge : styles.imgSmall}
        />

        <Text style={[styles.tagText, large ? styles.tagTextLarge : styles.tagTextSmall]}>
          {formatVotes(tag.total || 0)}
        </Text>
      </View>
    )
  }

  if (!tags) return null;

  return (
    <View style={large ? styles.tagsContainerLarge : styles.tagsContainerSmall}>
      {returnTags(tags[0], "greenBar", "controls")}
      {returnTags(tags[1], "mediumGreen", "book")}
      {returnTags(tags[2], "lightRed", "sword")}
    </View>
  );
}