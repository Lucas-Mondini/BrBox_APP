import React from "react";
import { Alert, Modal, ScrollView, Share, Text, TouchableOpacity, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../Contexts/Auth";
import { useTheme } from "../../Contexts/Theme";
import { Params } from "../../utils/types";
import { useLinking } from "../../Contexts/LinkingProvider";

interface DropDownMenuProps {
  setModal: (value: any) => void;
}

export default function DropDownMenu({setModal}: DropDownMenuProps)
{
  const navigation = useNavigation<any>();

  const { share } = useLinking();
  const {getTerm} = useTerm();
  const {signOut, user} = useAuth();
  const { darkMode, setDarkMode } = useTheme();

  const color = !darkMode ? config.darkGreen : config.mediumGreen;
  const textColor = darkMode ? "#fff" : config.dark;
  const backgroundColor = !darkMode ? "#fff" : config.darkGray;
  const backgroundColorOption = !darkMode ? config.light : config.mediumGray;

  function callNavigationFunction(route: string, specificFunction?: Function)
  {
    setModal(null);

    if (specificFunction) return specificFunction();

    return navigation.reset({index: 0, routes: [{name: "Home"}, {name: route}]});
  }

  async function shareApp()
  {
    try {
      await share(getTerm(100107), "playStore");
    } catch (error) {
      Alert.alert(getTerm(100108), getTerm(100109))
    }
  }

  function goTo(route: string, params?: Params)
  {
    return navigation.reset({index: 0, routes: [{name: "Home"}, {name: route, params}]});
  }

  return (
    <Modal transparent onRequestClose={() => setModal(null)}>
      <TouchableOpacity style={styles.menuCloseButton} onPress={()=>{setModal(null)}}>
        <Icon name="close" color={darkMode ? config.mediumGreen : config.darkGreen} size={35}/>
      </TouchableOpacity>

      <View style={[styles.menuContainer, {borderBottomColor: color, backgroundColor}]}>
        <ScrollView style={[styles.menuOptionsContainer]}>
          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            callNavigationFunction("", () => navigation.reset({index: 0, routes: [{name: "Home"}]}));
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100007).toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            callNavigationFunction("Home");
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100002).toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            callNavigationFunction("Home");
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100003).toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={shareApp}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100004).toUpperCase()}</Text>
          </TouchableOpacity>

          {user?.admin && <>
            <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
              callNavigationFunction("GameListAdmin");
            }}>
              <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100153).toUpperCase()}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
              goTo("GenresModes", {genres: true});
            }}>
              <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100155).toUpperCase()}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
              callNavigationFunction("GenresModes");
            }}>
              <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100156).toUpperCase()}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
              callNavigationFunction("BusinessModelList");
            }}>
              <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100118).toUpperCase()}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
              callNavigationFunction("TagList");
            }}>
              <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100030).toUpperCase()}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
              callNavigationFunction("UserList");
            }}>
              <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100031).toUpperCase()}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
              callNavigationFunction("Platforms");
            }}>
              <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100056).toUpperCase()}</Text>
            </TouchableOpacity>
          </>}

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            callNavigationFunction("Profile");
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100046).toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            setDarkMode(!darkMode);
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(darkMode ? 100081 : 100082).toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            callNavigationFunction("Suggestion");
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100006).toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption, marginBottom: 15}]} onPress={() => {
            callNavigationFunction("", signOut);
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100045).toUpperCase()}</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={[styles.menuButtonText, {color: "#686868", textAlign: "center", marginVertical: 5}]}>V {config.version}</Text>
      </View>
      <TouchableOpacity style={styles.closeModal} onPress={()=>{setModal(null)}} />
    </Modal>
  );
}