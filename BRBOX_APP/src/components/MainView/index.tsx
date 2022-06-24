import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Loading from "../Loading";

import config from "../../../brbox.config.json";
import Header from "../Header";
import { useTheme } from "../../Contexts/Theme";
import BottomMenu from "../BottomMenu";

interface MainViewProps {
  children: React.ReactElement | React.ReactElement[];
  loading?: boolean;
  headerTitle?: number;
  showTitle?: boolean;
  showBottom?: boolean;
  headerAddButtonAction?: () => void;
}

export default function MainView({children, loading, headerTitle, showTitle, showBottom, headerAddButtonAction}: MainViewProps)
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

      {showBottom && <BottomMenu/>}
    </SafeAreaView>
  );
}