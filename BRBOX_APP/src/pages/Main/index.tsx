import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MainView from '../../components/MainView';
import { useTerm } from '../../Contexts/TermProvider';

 const Main = () => {
   const isDarkMode = useColorScheme() === 'dark';
   const navigation = useNavigation<any>();

   const {getTerm} = useTerm();

   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };

   return (
     <MainView>
       <View>
        <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}style={{width: 150, height: 30}}>
          <Text>{getTerm(100009)}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}style={{width: 150, height: 30}}>
          <Text>{getTerm(100010)}</Text>
        </TouchableOpacity>
       </View>
     </MainView>
   );
 };

 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });

 export default Main;