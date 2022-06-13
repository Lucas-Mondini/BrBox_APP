import React from "react";
import { Image, TouchableOpacity, useColorScheme, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import config from "../../../brbox.config.json";

interface CarouselImageProps {
  imageUri: string;
  callback?: () => void;
}

export default function CarouselImage({imageUri, callback}: CarouselImageProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const color = isDarkMode ? "#fff" : config.dark;

  return (
    <View style={styles.carousel}>
      <Image
        style={styles.image}
        source={{uri: imageUri}}
      />

      {callback &&
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {borderColor: color}]} onPress={callback}>
            <Icon name="close" color={color} size={30}/>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}