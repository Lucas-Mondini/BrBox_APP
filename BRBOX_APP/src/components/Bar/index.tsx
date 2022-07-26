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
            flex: count,
            height: "100%",
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