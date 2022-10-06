import React from "react";
import { Image, ImageBackground, Linking, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { LinkType, NewLinkType } from "../../utils/types";
import { removeObjectFromArray } from "../../utils/functions";

import styles from "./styles";
import { useLinking } from "../../Contexts/LinkingProvider";

import PlatformImage from "./Platforms";
const platformImage = new PlatformImage();

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
    let url = PlatformImage.getImage(linkobj.imageURL || "");
    let inImage = PlatformImage.IsInternalImage(linkobj.imageURL || "");
    let img
    if(!linkobj.Youtube){
      if (!inImage) {
        img = <ImageBackground style={[styles.image, {marginHorizontal: 5}]} source={{uri: url}}>{
          linkobj.promotion? <Image style={[styles.image, {marginHorizontal: 5}]} source={PlatformImage.getImage('discount')}/> : null
        }</ImageBackground>
      } else {
        img = <ImageBackground style={[styles.image, {marginHorizontal: 5}]} source={url}>{
          linkobj.promotion? <Image style={[styles.image, {marginHorizontal: 5}]} source={PlatformImage.getImage('discount')}/> : null
        }</ImageBackground>
      }
    }
    if(linkobj.Youtube) {
      if (!inImage) {
        img = <ImageBackground style={{width: 120, height: 120, borderRadius: 15, marginHorizontal: 5}} source={{uri: url}}></ImageBackground>
      } else {
        img = <ImageBackground style={{width: 120, height: 120, borderRadius: 15, marginHorizontal: 5}} source={url}></ImageBackground>
      }
    }
    return img;
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