import React from "react";
import { Linking, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { LinkType, NewLinkType } from "../../utils/types";
import { removeObjectFromArray } from "../../utils/functions";

import styles from "./styles";
import { useLinking } from "../../Contexts/LinkingProvider";

interface PlatformLinkProps {
  link: NewLinkType;
  linkList: NewLinkType[];
  allowRemove: boolean;

  setLinkList: (value: NewLinkType[]) => void;
}

export default function PlatformLink({link, linkList, allowRemove, setLinkList}: PlatformLinkProps)
{
  const { openUrl } = useLinking()

  function getPlatformIcon(platformName: string)
  {
    let icon = "";

    if (platformName.toLocaleLowerCase().includes("steam")) {
      icon = "steam";
    } else if (platformName.toLocaleLowerCase().includes("xbox")) {
      icon = "microsoft-xbox";
    } else if (platformName.toLocaleLowerCase().includes("ubisoft")) {
      icon = "ubisoft";
    } else if (platformName.toLocaleLowerCase().includes("playstation")) {
      icon = "sony-playstation";
    } else if (platformName.toLocaleLowerCase().includes("google")) {
      icon = "google-play";
    } else if (platformName.toLocaleLowerCase().includes("apple")) {
      icon = "apple";
    } else {
      icon = "shopping"
    }

    return <Icon name={icon} size={50} color={"#686868"}/>
  }

  return (
    <TouchableOpacity style={[styles.link]}
      key={link.id}
      activeOpacity={allowRemove ? 1 : 0.8}
      onPress={async () => {
        if (!allowRemove) {
          await openUrl(link.link);
        }
      }}
    >
      {getPlatformIcon(link.platformName)}
      {allowRemove &&
        <TouchableOpacity style={styles.xButton} onPress={() => removeObjectFromArray(link.id, linkList, setLinkList)}>
          <Icon name="close" size={35} color={"#000"}/>
        </TouchableOpacity>
      }
    </TouchableOpacity>
  );
}