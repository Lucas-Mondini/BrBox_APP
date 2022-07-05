import React from "react";
import { Image, Text, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { TagValue } from "../../utils/types";
import getImages from "../../utils/getImage";

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

    return (
      <View style={[styles.tag, large ? styles.tagLarge : styles.tagSmall, bg]}>
        <Image
          source={getImages(image)}
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