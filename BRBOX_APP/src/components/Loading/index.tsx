import React from "react";
import { View, ActivityIndicator } from "react-native";

import config from "../../../brbox.config.json";
import { useTheme } from "../../Contexts/Theme";

type LoadingProps = {
  styles?: object;
}

const Loading: React.FC<LoadingProps> = ({styles}) => {
  const { darkMode } = useTheme();

  return (
    <View style={[{
      backgroundColor: darkMode ? config.dark : "#fff",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }, styles]}>
      <ActivityIndicator size="large" color="#686868"/>
    </View>
  );
}

export default Loading;