import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import { useTheme } from "../../Contexts/Theme";

import { useTerm } from "../../Contexts/TermProvider";

interface ToggleContentProps {
  content: React.ReactElement | React.ReactElement[];
  title: number;
  colapseOnStart?: boolean;
}

export default function ToggleContent({content, title, colapseOnStart}: ToggleContentProps)
{
  const { subTitleMainColor } = useTheme();
  const { getTerm } = useTerm();

  const color = subTitleMainColor;

  const [showContent, setShowContent] = useState(!colapseOnStart);

  return (
    <View>
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => {
          setShowContent(!showContent);
        }}
      >
        <View>
          <Text style={[styles.title, {color}]}>{getTerm(title).toUpperCase()}</Text>
        </View>

        <Icon name={showContent ? "caret-up" : "caret-down"} color={color} size={25}/>

      </TouchableOpacity>

      {showContent && content}
    </View>
  );
}