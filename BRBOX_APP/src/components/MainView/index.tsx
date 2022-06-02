import React from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Loading from "../Loading";

import config from "../../../brbox.config.json";

interface MainViewProps {
  children: React.ReactElement | React.ReactElement[];
  loading?: boolean;
}

export default function MainView({children, loading}: MainViewProps)
{
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? config.dark : "#fff",
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {loading ? <Loading /> : children}
    </SafeAreaView>
  );
}