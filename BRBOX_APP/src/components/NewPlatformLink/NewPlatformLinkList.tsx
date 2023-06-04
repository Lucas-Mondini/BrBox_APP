import React from "react";
import { Text, View } from "react-native";

import { LinkType, NewLinkType } from "../../utils/types";

import styles from "./styles";
import NewPlatformLink from "../NewPlatformLink";
import { ScrollView } from "react-native-gesture-handler";

interface PlatformLinkListProps {
  linkList: NewLinkType[];
  allowRemove?: boolean;
  youtubeList?: boolean;

  setLinkList: (value: NewLinkType[]) => void;
}

export default function NewPlatformLinkList({
  linkList,
  allowRemove,
  youtubeList,
  setLinkList,
}: PlatformLinkListProps) {

  function mapLinks() {

    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0}}
      >
        {linkList
          .filter((i) => i.Youtube === youtubeList)
          .sort((a,b) => b.order - a.order)
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
      {mapLinks()}
    </View>
  );
}
