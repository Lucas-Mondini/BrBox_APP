import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";

interface GameCardProps {
  title: string;
  year: string;
  tag1?: string;
  tag2?: string;
  moreTags?: number;
  evaluations: number;
}

export default function GameCard({title, year, tag1, tag2, moreTags, evaluations}:GameCardProps)
{
  const navigation = useNavigation<any>();
  const {getTerm} = useTerm();

  return (
    <TouchableOpacity style={styles.gameCard}>
      <View style={styles.container}>
        <View>
          <Image style={styles.img} source={require("../../../assets/img/gameimg.jpg")} />
        </View>
        <View style={styles.info}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.year}>{year}</Text>
            <View style={styles.tagsContainer}>
              {tag1 && <Text style={styles.tag}>{tag1}</Text>}
              {tag2 && <Text style={styles.tag}>{tag2}</Text>}
              {moreTags && <Text style={styles.moreTags}>+{moreTags} Tags</Text>}
            </View>
          </View>

          <View style={styles.barsContainer}>
            <View style={[styles.bar, {backgroundColor: config.greenBar}]} />
            <View style={[styles.bar, {backgroundColor: config.salmonBar}]} />
            <View style={[styles.bar, {backgroundColor: config.redBar}]} />
          </View>
          <View style={styles.evaluationsContainer}>
            <Text style={styles.evaluations}>{evaluations}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}