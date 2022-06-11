import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Text, TouchableOpacity, useColorScheme, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { splitText } from "../../utils/functions";
import { useRequest } from "../../Contexts/Request";
import { useTerm } from "../../Contexts/TermProvider";
import CardsButton from "../CardsButton";

interface UserCardProps {
  id: number;
  username: string;
  email: string;
  admin: boolean;
  setLoading: (value: boolean) => void;
  callback: () => void;
}

export default function UserCard({id, username, email, admin, setLoading, callback}: UserCardProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();
  const {destroy, post} = useRequest();
  const {getTerm} = useTerm();

  const textColor = {color: isDarkMode ? "#fff" : config.dark}

  function navigateToUserInfo() {
    return navigation.navigate("Profile", {id});
  }

  async function deleteUser() {
    Alert.alert(getTerm(100034), getTerm(100035),[
      {text: getTerm(100040), onPress: async () => {
        try {
          await post(`/user/destroy`, setLoading, {id});
          callback();
        } catch (error) {
          return navigation.reset({index: 0, routes: [{name: "Home"}]});
        }
      }},
      {text: getTerm(100041)}
    ]);
  }

  async function makeUserAdmin() {
    Alert.alert(getTerm(admin ? 100038 : 100036), getTerm(admin ? 100039 : 100037),[
      {text: getTerm(100040), onPress: async () => {
        try {
          if (admin) {
            await destroy(`/admin/destroy/${id}`, callback, setLoading);
          } else {
            await post(`/admin/setAdmin`, setLoading, {id});
            callback();
          }

        } catch (error) {
          return navigation.reset({index: 0, routes: [{name: "Home"}]});
        }
      }},
      {text: getTerm(100041)}
    ]);
  }

  return (
    <TouchableOpacity style={styles.tagCard} onPress={navigateToUserInfo}>
      <View>
        <Text style={[styles.title, textColor]}>{splitText(username, 18)}</Text>
        <Text style={[styles.description, textColor]}>{splitText(email, 50)}</Text>
      </View>

      <View style={styles.buttonsView}>
        <CardsButton
          iconName="admin-panel-settings"
          iconLibrary="MaterialIcons"
          extraButtonStyle={{backgroundColor: !admin ? config.darkGreen : config.red}}
          callback={makeUserAdmin}
        />

        <CardsButton
          iconName="trash"
          extraButtonStyle={styles.deleteButton}
          callback={deleteUser}
        />
      </View>
    </TouchableOpacity>
  );
}