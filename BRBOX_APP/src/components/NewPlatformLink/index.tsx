import React from "react";
import { Image, Linking, TouchableOpacity } from "react-native";
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

export default function NewPlatformLink({link, linkList, allowRemove, setLinkList}: PlatformLinkProps)
{
  const { openUrl } = useLinking()

  function getPlatformImage(linkobj: any)
  {
    return <Image 
      style={styles.image}    
      source={{uri: linkobj.imageURL || ""}}/>
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
      {getPlatformImage(link)}
      {allowRemove &&
        <TouchableOpacity style={styles.xButton} onPress={() => removeObjectFromArray(link.id, linkList, setLinkList)}>
          <Icon name="close" size={35} color={"#000"}/>
        </TouchableOpacity>
      }
    </TouchableOpacity>
  );
}