import React from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface MainViewProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function MainView({children}: MainViewProps)
{
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {children}
    </SafeAreaView>
  );
}