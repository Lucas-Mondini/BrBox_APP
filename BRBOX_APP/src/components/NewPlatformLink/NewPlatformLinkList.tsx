import React from "react";
import { Text, View } from "react-native";

import { LinkType, NewLinkType } from "../../utils/types";

import styles from "./styles";
import NewPlatformLink from "../NewPlatformLink";
import { ScrollView } from "react-native-gesture-handler";

interface PlatformLinkListProps {
  linkList: NewLinkType[];
  allowRemove: boolean;
  youtubeList: boolean;

  setLinkList: (value: NewLinkType[]) => void;
}

export default function NewPlatformLinkList({
  linkList,
  allowRemove,
  youtubeList = false,
  setLinkList,
}: PlatformLinkListProps) {
  function mapLinks() {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 120 }}
      >
        {linkList
          .filter((i) => i.Youtube == youtubeList)
          .sort((i) => i.order)
          .map((link) => (
            <NewPlatformLink
              key={link.id}
              link={link}
              linkList={linkList}
              allowRemove={allowRemove}
              setLinkList={setLinkList}
            />
          ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.linkContainer}>
      <Text>{mapLinks()}</Text>
    </View>
  );
}
