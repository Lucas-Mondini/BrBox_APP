import React from "react";
import { View } from "react-native";

import styles from "./styles";

interface BarProps {
  counts: number[];
  colors: string[];
}

export default function Bar({counts, colors}: BarProps)
{
  if (counts.length === 0) return null;

  function returnBars() {
    return counts.map((count, index) => {
      return (
        <View
          key={index}
          style={{
            borderBottomLeftRadius: index === 0 ? 15: 0,
            borderTopLeftRadius: index === 0 ? 15: 0,
            borderBottomRightRadius: index < (counts.length - 1) ? 0 : 15,
            borderTopRightRadius: index < (counts.length - 1) ? 0 : 15,
            height: 15,
            flex: count,
            backgroundColor: colors[index]
          }}
        />
      );
    });
  }

  return (
    <View style={styles.bar}>
      {returnBars()}
    </View>
  );
}