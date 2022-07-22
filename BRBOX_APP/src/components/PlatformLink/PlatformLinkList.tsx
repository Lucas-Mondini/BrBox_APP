import React from "react";
import { Text, View } from "react-native";

import { LinkType } from "../../utils/types";

import styles from "./styles";
import PlatformLink from ".";
import { useTerm } from "../../Contexts/TermProvider";

interface PlatformLinkListProps {
  linkList: LinkType[];
  allowRemove: boolean;

  setLinkList: (value: LinkType[]) => void;
}

export default function PlatformLinkList({linkList, allowRemove, setLinkList}: PlatformLinkListProps)
{
  const {getTerm} = useTerm();

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
        <Text style={styles.platformsTitle}>{getTerm(allowRemove ? 100105 : 100104)}:</Text>

        <Text>
          {mapLinks()}
        </Text>
      </View>
    );
}