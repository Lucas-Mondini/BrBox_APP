import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { TagValue } from "../../utils/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getIcon } from "../../utils/functions";
import Tag from "../Tag";

interface TopTagsProps {
  tags?: TagValue[];
  large?: boolean;
}

export default function TopTags({tags, large}: TopTagsProps)
{
  if (!tags) return null;

  return (
    <View style={large ? styles.tagsContainerLarge : styles.tagsContainerSmall}>
      <Tag
        tag={tags[0]}
        specificStyle="greenBar"
        large={large}
      />
      <Tag
        tag={tags[1]}
        specificStyle="mediumGreen"
        large={large}
      />
      <Tag
        tag={tags[2]}
        specificStyle="lightRed"
        large={large}
      />
    </View>
  );
}