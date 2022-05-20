import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BottomMenu from '../../components/BottomMenu';
import MainView from '../../components/MainView';
import { useTerm } from '../../Contexts/TermProvider';
import styles from './styles';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();

  const {getTerm} = useTerm();

  function navigate()
  {
    navigation.navigate("GameInfo");
  }

  const backgroundStyle = {
    backgroundColor: "#000",
  };

  return (
    <MainView>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{getTerm(100008)}</Text>
        </ScrollView>
        <BottomMenu/>
    </MainView>
  );
};

export default Home;