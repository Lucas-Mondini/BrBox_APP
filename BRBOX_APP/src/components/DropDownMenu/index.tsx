import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../Contexts/Auth";

interface DropDownMenuProps {
  setModal: (value: any) => void;
}

export default function DropDownMenu({setModal}: DropDownMenuProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();
  const {getTerm} = useTerm();
  const {signOut, user} = useAuth();

  const color = !isDarkMode ? config.darkGreen : config.mediumGreen;

  function callNavigationFunction(route: string, specificFunction?: Function)
  {
    setModal(null);

    if (specificFunction) return specificFunction();

    navigation.navigate(route);
  }

  return (
    <Modal transparent onRequestClose={() => setModal(null)}>
      <View style={[styles.menuContainer, {borderBottomColor: color}]}>
        <TouchableOpacity onPress={()=>{setModal(null)}}>
          <Icon name="close" color={config.mediumGreen} size={35}/>
        </TouchableOpacity>

        <ScrollView style={[styles.menuOptionsContainer]}>
          <TouchableOpacity style={[styles.menuButton]} onPress={() => {
            callNavigationFunction("", () => navigation.reset({index: 0, routes: [{name: "Home"}]}));
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100007)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={() => {
            callNavigationFunction("Search");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100000)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={() => {
            callNavigationFunction("YourRatings");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100002)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={() => {
            callNavigationFunction("Recommended");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100003)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={() => {
            callNavigationFunction("Share");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100004)}</Text>
          </TouchableOpacity>

          {user?.admin && <>
            <TouchableOpacity style={[styles.menuButton]} onPress={() => {
              callNavigationFunction("TagRegister");
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100005)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton]} onPress={() => {
              callNavigationFunction("TagList");
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100030)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton]} onPress={() => {
              callNavigationFunction("UserList");
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100031)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton]} onPress={() => {
              callNavigationFunction("", () => navigation.navigate("Profile", {new:true}));
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100042)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton]} onPress={() => {
              callNavigationFunction("", () => navigation.navigate("AddGame", {new:true}));
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100047)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton]} onPress={() => {
              callNavigationFunction("Platforms");
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100056)}</Text>
            </TouchableOpacity>
          </>}

          <TouchableOpacity style={[styles.menuButton]} onPress={() => {
            callNavigationFunction("Profile");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100046)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={() => {
            callNavigationFunction("Help");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100006)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={() => {
            callNavigationFunction("", signOut);
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100045)}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}