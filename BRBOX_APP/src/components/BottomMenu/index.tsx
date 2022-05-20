import React from "react";
import { SafeAreaView, StatusBar, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";

interface BottomMenuProps {
  children: React.ReactElement
}

export default function BottomMenu()
{
  const {getTerm} = useTerm();

  return (
    <View style={styles.bottomMenuContainer}>
      <TouchableOpacity style={styles.button}>
        <Text>{getTerm(100000)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Avaliar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>{getTerm(100000)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>{getTerm(100000)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>{getTerm(100000)}</Text>
      </TouchableOpacity>
    </View>
  );
}