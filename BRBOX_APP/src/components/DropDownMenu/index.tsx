import React, { useEffect } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../Contexts/Auth";
import { useGame } from "../../Contexts/Game";

interface DropDownMenuProps {
  setModal: (value: any) => void;
}

export default function DropDownMenu({setModal}: DropDownMenuProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();
  const {getTerm} = useTerm();
  const {signOut, user} = useAuth();
  const {clearGameContext} = useGame();

  const color = !isDarkMode ? config.darkGreen : config.mediumGreen;
  const textColor = isDarkMode ? "#fff" : config.dark;
  const backgroundColor = !isDarkMode ? config.light : config.darkGray;
  const backgroundColorOption = !isDarkMode ? config.light : config.mediumGray;

  function callNavigationFunction(route: string, specificFunction?: Function)
  {
    setModal(null);

    if (specificFunction) return specificFunction();

    navigation.navigate(route);
  }

  useEffect(() => {
    clearGameContext();
  }, []);

  return (
    <Modal transparent onRequestClose={() => setModal(null)}>
      <TouchableOpacity style={styles.menuCloseButton} onPress={()=>{setModal(null)}}>
        <Icon name="close" color={isDarkMode ? config.mediumGreen : config.darkGreen} size={35}/>
      </TouchableOpacity>

      <View style={[styles.menuContainer, {borderBottomColor: color, backgroundColor}]}>
        <ScrollView style={[styles.menuOptionsContainer]}>
          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            callNavigationFunction("", () => navigation.reset({index: 0, routes: [{name: "Home"}]}));
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100007).toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            callNavigationFunction("Search");
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100000).toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            callNavigationFunction("YourRatings");
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100002).toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            callNavigationFunction("Recommended");
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100003).toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
            callNavigationFunction("Share");
          }}>
            <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100004).toUpperCase()}</Text>
          </TouchableOpacity>

          {user?.admin && <>
            <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
              callNavigationFunction("TagRegister");
            }}>
              <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100005).toUpperCase()}</Text>
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
              callNavigationFunction("", () => navigation.navigate("Profile", {new:true}));
            }}>
              <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100042).toUpperCase()}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, {backgroundColor: backgroundColorOption}]} onPress={() => {
              callNavigationFunction("", () => navigation.navigate("AddGame", {new:true}));
            }}>
              <Text style={[styles.menuButtonText, {color: textColor}]}>{getTerm(100047).toUpperCase()}</Text>
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
            callNavigationFunction("Help");
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