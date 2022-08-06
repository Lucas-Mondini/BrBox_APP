import React from "react";
import { Text, View } from "react-native";

import { LinkType } from "../../utils/types";

import styles from "./styles";
import PlatformLink from ".";

interface PlatformLinkListProps {
  linkList: LinkType[];
  allowRemove: boolean;

  setLinkList: (value: LinkType[]) => void;
}

export default function PlatformLinkList({linkList, allowRemove, setLinkList}: PlatformLinkListProps)
{
  function mapLinks()
  {
    return linkList.map(link => (
      <PlatformLink
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