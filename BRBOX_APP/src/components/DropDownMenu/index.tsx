import React from "react";
import { Modal, Text, TouchableOpacity, useColorScheme, View } from "react-native";

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

  return (
    <Modal transparent onRequestClose={() => setModal(null)}>
      <View style={[styles.menuContainer, {borderBottomColor: color}]}>
        <TouchableOpacity onPress={()=>{setModal(null)}}>
          <Icon name="close" color={config.mediumGreen} size={35}/>
        </TouchableOpacity>

        <View style={[styles.menuOptionsContainer]}>
          <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
            setModal(null);
            navigation.reset({index: 0, routes: [{name: "Home"}]});
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100007)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
            setModal(null);
            navigation.navigate("Search")
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100000)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
            setModal(null);
            navigation.navigate("YourRatings");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100002)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
            setModal(null);
            navigation.navigate("Recommended");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100003)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
            setModal(null);
            navigation.navigate("Share");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100004)}</Text>
          </TouchableOpacity>

          {user?.admin && <>
            <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
              setModal(null);
              navigation.navigate("TagRegister");
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100005)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
              setModal(null);
              navigation.navigate("TagList");
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100030)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
              setModal(null);
              navigation.navigate("UserList");
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100031)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
              setModal(null);
              navigation.navigate("Profile", {new:true});
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100042)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
              setModal(null);
              navigation.navigate("AddGame", {new:true});
            }}>
              <Text style={[styles.menuButtonText]}>{getTerm(100047)}</Text>
            </TouchableOpacity>
          </>}

          <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
            setModal(null);
            navigation.navigate("Profile");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100046)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
            setModal(null);
            navigation.navigate("Help");
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100006)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={()=>{
            setModal(null);
            signOut();
          }}>
            <Text style={[styles.menuButtonText]}>{getTerm(100045)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}