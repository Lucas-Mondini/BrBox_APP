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
  evaluations?: TagType[];
}

export default function TopTags({tags, home, large, evaluations}: TopTagsProps)
{
  const {width} = Dimensions.get('window');

  const [modal, setModal] = useState<React.ReactElement | null>(null);

  if (!tags) return null;

  function returnTags(tag?: TagValue)
  {
    if (!tag) return null;

    const style: any = {
      "up": "greenBar",
      "neutral": "yellow",
      "down": "lightRed"
    }

    return (
      <Tag
        tag={tag}
        home={home}
        showTotalVotes
        topTags
        noEvaluations
        specificStyle={style[tag.value]}
        large={large}
        callback={!large ? () => {} : () => {
          if (!evaluations) return null;

          const tagInfoObj: any = evaluations.filter(e => e.name === tag.tag)[0];

          setModal(
            <TagInfoModal
              setModal={() => setModal(null)}
              tagInfo={tagInfoObj}
            />
          );
        }}
      />
    );
  }

  return (
    <View style={[large ? styles.tagsContainerLarge : styles.tagsContainerSmall, large ? {} : {marginLeft: width >= 400 ? 60 : 30}]}>
      {modal && modal}

      {returnTags(tags[0])}
      {returnTags(tags[1])}
      {returnTags(tags[2])}
    </View>
  );
}