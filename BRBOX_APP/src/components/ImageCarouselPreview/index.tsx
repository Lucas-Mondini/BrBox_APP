import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { removeObjectFromArray } from "../../utils/functions";
import { ImageType } from "../../utils/types";
import styles from "./styles";
import { useTheme } from "../../Contexts/Theme";

import config from "../../../brbox.config.json"

interface UserCardProps {
  images: ImageType[];
  setImages: (value: ImageType[]) => void;
}

export default function UserCard({images, setImages}: UserCardProps)
{
  const { darkMode } = useTheme();
  const color = darkMode ? "#fff" : config.dark;

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator
        keyExtractor={(item: any) => item.id}
        data={images}
        renderItem={
          ({item}: any) => {
            if (!item.link) return <View />;
            return (
              <View style={[styles.carousel]} key={item.id}>
                <View style={styles.itemContent}>
                  <Image source={{uri: item.link}} style={styles.itemImage} />
                  <Text style={styles.itemText} numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.button, {borderColor: color}]} onPress={() => removeObjectFromArray(item.id, images, setImages)}>
                    <Icon name="close" color={color} size={30}/>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        }
      />
    </View>
  );
}