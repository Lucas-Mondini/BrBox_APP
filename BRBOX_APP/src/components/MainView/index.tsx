import React from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Loading from "../Loading";

import config from "../../../brbox.config.json";
import Header from "../Header";

interface MainViewProps {
  children: React.ReactElement | React.ReactElement[];
  loading?: boolean;
  headerTitle?: number;
  showTitle?: boolean;
  headerAddButtonAction?: () => void;
}

export default function MainView({children, loading, headerTitle, showTitle, headerAddButtonAction}: MainViewProps)
{
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? config.dark : "#fff",
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {showTitle && <Header title={headerTitle || 100008} addAction={headerAddButtonAction} />}

      {loading ? <Loading /> : children}
    </SafeAreaView>
  );
}