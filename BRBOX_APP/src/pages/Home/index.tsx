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
import GameCard from '../../components/GameCard';
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

        <GameCard
          title="Halo Infinite"
          year="2021"
          tag1="Tiro"
          tag2="FPS"
          moreTags={2}
          evaluations={10}
        />
        <GameCard
          title="Minecraft"
          year="2011"
          tag1="Sobrevivência"
          tag2="Terror"
          moreTags={2}
          evaluations={10}
        />
        <GameCard
          title={"18 wheels \nof steel"}
          year="2002"
          evaluations={99}
        />
      </ScrollView>
      <BottomMenu/>
    </MainView>
  );
};

export default Home;