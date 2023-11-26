import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import config from "../../../brbox.config.json";
import { useTheme } from "../../Contexts/Theme";

interface CarouselImageProps {
  imageUri: string;
  allowRemove: boolean;
  callback?: () => void;
}

export default function CarouselImage({imageUri, allowRemove, callback}: CarouselImageProps)
{
  const { dark } = useTheme();
  const color = dark;

  return (
    <View style={styles.carousel}>
      <Image
        style={styles.image}
        source={{uri: imageUri}}
      />

      {(callback && allowRemove) &&
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {borderColor: color}]} onPress={callback}>
            <Icon name="close" color={color} size={30}/>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}