import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { TagValue } from "../../utils/types";
import { splitText } from "../../utils/functions";
import { useTheme } from "../../Contexts/Theme";
import { useAuth } from "../../Contexts/Auth";
import TopTags from "../TopTags";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface GameCardProps {
  id: number;
  title: string;
  score: number;
  voteCount: number;
  tags: TagValue[];
  imgUri: string;
  wishlist?: boolean;
  extraCallbackOnNavigate?: () => void;
}

export default function GameCard({id, title, score, voteCount, tags, imgUri, wishlist, extraCallbackOnNavigate}: GameCardProps)
{
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const {width} = Dimensions.get('window');

  const textColor = {color: darkMode ? "#fff" : config.dark}
  const cardBackgroundColor = {backgroundColor: darkMode ? config.darkGray : config.light}

  function navigateToGameInfo(editGame?: boolean) {
    if (extraCallbackOnNavigate) extraCallbackOnNavigate();

    return navigation.navigate(editGame ? "AddGame" : "GameInfo", {id, tags});
  }

  return (
    <TouchableOpacity
      style={[styles.gameCard, cardBackgroundColor]}
      onPress={() => navigateToGameInfo(false)}
      onLongPress={() => navigateToGameInfo(user?.admin)}
    >
      <View style={styles.container}>
        <View>
          <Icon style={styles.icon} name={wishlist ? "star" : "star-outline"} color="yellow" size={30} />
          <Image style={styles.img} source={{uri: imgUri}} />
        </View>
        <View style={styles.info}>
          <View style={{width: "89%"}}>
            <Text style={[styles.title, textColor]}>{splitText(title, width >= 400 ? 25 : 18)}</Text>

            <TopTags
              tags={tags}
              home
              voteCount={voteCount}
            />

            {tags.length > 0 &&
              <Text style={[styles.rate]}><Text style={[styles.rateBig]}>{score || 0}</Text>/10</Text>
            }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}