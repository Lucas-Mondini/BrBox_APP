import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { useTheme } from "../../Contexts/Theme";
import CardsButton from "../CardsButton";
import { useGame } from "../../Contexts/Game";

interface GameCardAdminProps {
  id: number;
  title: string;
  imgUri: string;
  extraCallbackOnNavigate: () => void;
  reload: () => void;
}

export default function GameCardAdmin({ id, title, imgUri, reload, extraCallbackOnNavigate }: GameCardAdminProps) {
  const { light, darkGray } = useTheme();
  const navigation = useNavigation<any>();
  const { deleteGame } = useGame();

  const textColor = { color: light }
  const cardBackgroundColor = { backgroundColor: darkGray }

  function navigateToGameInfo() {
    extraCallbackOnNavigate();

    return navigation.navigate("AddGame", { id });
  }

  function destroyGame() {
    deleteGame(reload, id);
  }

  return (
    <TouchableOpacity
      style={[styles.gameCard, cardBackgroundColor]}
      onPress={() => navigateToGameInfo()}
    >
      <View style={styles.container}>
        <View>
          <Image style={styles.img} source={{ uri: imgUri }} />
        </View>
        <View style={styles.info}>
          <View>
            <Text style={[styles.title, textColor]}>{title}</Text>
          </View>
        </View>

        <View style={styles.buttonView}>
          <CardsButton
            iconName="trash"
            style={styles.deleteButton}
            onPress={destroyGame}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}