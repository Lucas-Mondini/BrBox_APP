import React from "react";
import { Text, View } from "react-native";

import { LinkType, NewLinkType } from "../../utils/types";

import styles from "./styles";
import NewPlatformLink from '../NewPlatformLink';

interface PlatformLinkListProps {
  linkList: NewLinkType[];
  allowRemove: boolean;
  youtubeList: boolean;

  setLinkList: (value: NewLinkType[]) => void;
}

export default function NewPlatformLinkList({linkList, allowRemove, youtubeList = false, setLinkList}: PlatformLinkListProps)
{
  function mapLinks()
  {
    return linkList.filter(i => i.Youtube == youtubeList).sort(i => i.order).map(link => (
      <NewPlatformLink
        key={link.id}
        link={link}
        linkList={linkList}
        allowRemove={allowRemove}
        setLinkList={setLinkList}
      />
    ));
  }

  return (
    <View style={styles.linkContainer}>
      <Text>
        {mapLinks()}
      </Text>
    </View>
  );
}