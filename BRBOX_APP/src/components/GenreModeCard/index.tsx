import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { useRequest } from "../../Contexts/Request";
import { useTerm } from "../../Contexts/TermProvider";
import CardsButton from "../CardsButton";
import { useTheme } from "../../Contexts/Theme";

interface GenreModeCardProps {
  id: number;
  name: string;
  description?: string;
  genre?: boolean;
  disabled?: boolean;
  hideBottom?: boolean;

  onPress?: () => void;
  onDelete?: () => void;
  setLoading: (value: boolean) => void;
  deleteCustomFunction?: () => void;
}

export default function GenreModeCard({ id, name, description, genre, disabled, hideBottom, setLoading, onPress, onDelete, deleteCustomFunction }: GenreModeCardProps) {
  const navigation = useNavigation<any>();

  const { light, subTitleMainColor } = useTheme();
  const { destroy } = useRequest();
  const { getTerm } = useTerm();

  const textColor = { color: light };
  const descriptionColor = { color: subTitleMainColor };

  function navigateToInfo() {
    return navigation.navigate("AddGenreMode", { id, genres: genre });
  }

  async function deleteData() {
    if (deleteCustomFunction) return deleteCustomFunction();

    if (!onDelete) return;

    Alert.alert(getTerm(genre ? 100159 : 100157), getTerm(genre ? 100160 : 100158), [
      {
        text: getTerm(100040), onPress: async () => {
          try {
            await destroy(`/${genre ? "genre" : "mode"}/destroy/${id}`, onDelete, setLoading);
          } catch (error) {
            return Alert.alert(getTerm(100073), getTerm(100074));
          }
        }
      },
      { text: getTerm(100041) }
    ]);
  }

  return (
    <TouchableOpacity
      style={[styles.card, !hideBottom && styles.cardBottom]}
      onPress={onPress || navigateToInfo}
      disabled={disabled}
    >
      <View style={{ width: "85%" }}>
        <Text style={[styles.title, textColor]}>{name}</Text>

        {genre &&
          <View style={{ width: (onDelete || deleteCustomFunction) && !disabled && description && description.length > 40 ? "93%" : "100%" }}>
            <Text style={[styles.description, descriptionColor]}>{description}</Text>
          </View>
        }
      </View>

      {
        (onDelete || deleteCustomFunction) &&
        <View style={styles.buttonView}>
          <CardsButton
            iconName="trash"
            style={styles.deleteButton}
            onPress={deleteData}
          />
        </View>
      }
    </TouchableOpacity>
  );
}