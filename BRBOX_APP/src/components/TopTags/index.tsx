import React, { useState } from "react";
import { Dimensions, View } from "react-native";

import styles from "./styles";
import { Tag as TagType, TagValue } from "../../utils/types";
import Tag from "../Tag";
import TagInfoModal from "../TagInfoModal";

interface TopTagsProps {
  tags?: TagValue[];
  home?: boolean;
  large?: boolean;
  voteCount: number;
}

export default function TopTags({tags, home, large, voteCount}: TopTagsProps)
{
  if (!tags) return null;

  function returnTags(tag?: TagValue)
  {
    if (!tag) return null;

    const style: any = {
      "up": "greenBar",
      "neutral": "yellow",
      "down": "lightRed",
      "user": "orange",
    }

    return (
      <View style={{marginHorizontal: 5}}>
        <Tag
          tag={tag}
          home={home}
          showTotalVotes
          topTags
          noEvaluations
          specificStyle={style[tag.value]}
          large={large}
        />
      </View>
    );
  }

  return (
    <View style={[large ? styles.tagsContainerLarge : styles.tagsContainerSmall]}>
      {returnTags(tags[0])}
      {returnTags(tags[1])}
      {returnTags(tags[2])}
      {(voteCount > 0) && <>
        { /*@ts-ignore*/}
        {returnTags({total: voteCount, value: "user", icon: 100})}</>
      }
    </View>
  );
}