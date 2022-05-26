import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import { useAuth } from '../../Contexts/Auth';
import { useTerm } from '../../Contexts/TermProvider';

 const Register = () => {
   const navigation = useNavigation<any>();
   const {register} = useAuth();
   const {getTerm} = useTerm();

   const [username, setUserName] = useState("");
   const [mail, setMail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   async function registerUser()
   {
     await register(username, mail, password, confirmPassword);

     navigation.navigate("Login");
   }

   return (
     <MainView>
       <View>
        <TextInput
          placeholder={getTerm(100013)}
          value={username}
          onChangeText={setUserName}
        />
        <TextInput
          placeholder={getTerm(100011)}
          value={mail}
          onChangeText={setMail}
        />
        <TextInput
          placeholder={getTerm(100012)}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder={getTerm(100014)}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={registerUser} style={{width: 50, height: 30}}>
          <Text>{getTerm(100010)}</Text>
        </TouchableOpacity>
       </View>
     </MainView>
   );
 };

 export default Register;