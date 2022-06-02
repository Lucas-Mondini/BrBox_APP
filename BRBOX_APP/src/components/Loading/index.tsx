import React from "react";
import { View, ActivityIndicator, useColorScheme } from "react-native";

import config from "../../../brbox.config.json";

type LoadingProps = {
  styles?: object;
}

const Loading: React.FC<LoadingProps> = ({styles}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[{
      backgroundColor: isDarkMode ? config.dark : "#fff",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }, styles]}>
      <ActivityIndicator size="large" color="#686868"/>
    </View>
  );
}

export default Loading;