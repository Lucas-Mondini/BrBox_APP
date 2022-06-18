import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Loading from "../Loading";

import config from "../../../brbox.config.json";
import Header from "../Header";
import { useTheme } from "../../Contexts/Theme";

interface MainViewProps {
  children: React.ReactElement | React.ReactElement[];
  loading?: boolean;
  headerTitle?: number;
  showTitle?: boolean;
  headerAddButtonAction?: () => void;
}

export default function MainView({children, loading, headerTitle, showTitle, headerAddButtonAction}: MainViewProps)
{
  const { darkMode } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkMode ? config.dark : "#fff",
      }}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

      {showTitle && <Header title={headerTitle || 100008} addAction={headerAddButtonAction} />}

      {loading ? <Loading /> : children}
    </SafeAreaView>
  );
}