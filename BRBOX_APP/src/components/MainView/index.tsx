import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Loading from '../Loading';

import Header from '../Header';
import { useTheme } from '../../Contexts/Theme';
import BottomMenu from '../BottomMenu';

interface MainViewProps {
  children: React.ReactElement | React.ReactElement[];
  customHeader?: React.ReactElement | React.ReactElement[];
  loading?: boolean;
  headerTitle?: number | string;
  showTitle?: boolean;
  showBottom?: boolean;
  headerAddButtonIcon?: string;
  hideMenuButton?: boolean;
  menuButtonColor?: string;
  headerAddButtonAction?: () => void;
}

export default function MainView({
  children,
  customHeader,
  loading,
  headerTitle,
  showTitle,
  showBottom,
  headerAddButtonIcon,
  hideMenuButton,
  menuButtonColor,
  headerAddButtonAction,
}: MainViewProps) {
  const { dark } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark,
      }}>
      <StatusBar barStyle={'dark-content'} />

      {showTitle && (
        <Header
          title={headerTitle || 100008}
          hideMenuButton={hideMenuButton}
          customHeader={customHeader}
          buttonIcon={headerAddButtonIcon}
          addAction={headerAddButtonAction}
          menuButtonColor={menuButtonColor}
        />
      )}

      {loading ? <Loading /> : children}

      {showBottom && <BottomMenu />}
    </SafeAreaView>
  );
}
