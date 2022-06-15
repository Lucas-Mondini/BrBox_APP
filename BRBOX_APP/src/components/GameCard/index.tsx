import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, useColorScheme, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";

interface GameCardProps {
  id: number;
  title: string;
  year: number;
  tag1?: string;
  tag2?: string;
  moreTags?: number;
  editGame?: boolean;
  evaluations: number;
  imgUri: string;
}

export default function GameCard({id, title, year, tag1, tag2, moreTags, editGame, evaluations, imgUri}:GameCardProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();

  const textColor = {color: isDarkMode ? "#fff" : config.dark}

  function navigateToGameInfo() {
    return navigation.navigate(editGame ? "AddGame" : "GameInfo", {id});
  }

  return (
    <TouchableOpacity style={styles.gameCard} onPress={navigateToGameInfo}>
      <View style={styles.container}>
        <View>
          <Image style={styles.img} source={{uri: imgUri}} />
        </View>
        <View style={styles.info}>
          <View>
            <Text style={[styles.title, textColor]}>{title}</Text>
            <Text style={[styles.year, textColor]}>{year}</Text>
            <View style={styles.tagsContainer}>
              {Boolean(tag1) && <Text style={styles.tag}>{tag1}</Text>}
              {Boolean(tag2) && <Text style={styles.tag}>{tag2}</Text>}
              {Boolean(moreTags) && <Text style={[styles.moreTags, textColor]}>+{moreTags} Tags</Text>}
            </View>
          </View>

          <View style={styles.barsContainer}>
            <View style={[styles.bar, {backgroundColor: config.greenBar}]} />
            <View style={[styles.bar, {backgroundColor: config.salmonBar}]} />
            <View style={[styles.bar, {backgroundColor: config.redBar}]} />
          </View>
          <View style={styles.evaluationsContainer}>
            <Text style={[styles.evaluations, textColor]}>{evaluations}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}