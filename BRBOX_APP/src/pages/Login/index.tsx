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

 const Login = () => {
   const navigation = useNavigation<any>();
   const {signIn} = useAuth();
   const {getTerm} = useTerm();

   const [username, setUserName] = useState("");
   const [mail, setMail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   async function registerUser()
   {
     await signIn(mail, password);
   }

   return (
     <MainView>
       <View>
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
        <TouchableOpacity onPress={registerUser} style={{width: 50, height: 30}}>
          <Text>{getTerm(100009)}</Text>
        </TouchableOpacity>
       </View>
     </MainView>
   );
 };

 export default Login;