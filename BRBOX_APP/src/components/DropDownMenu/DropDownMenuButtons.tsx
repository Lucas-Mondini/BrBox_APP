import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Text, TouchableOpacity } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../Contexts/Auth";
import { useTheme } from "../../Contexts/Theme";
import { Params } from "../../utils/types";
import { useLinking } from "../../Contexts/LinkingProvider";

interface DropDownMenuButtonsProps {
  visible: boolean;
  setHideMenu: (value: any) => void;
}

export default function DropDownMenuButtons({ visible, setHideMenu }: DropDownMenuButtonsProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(false);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 1,
      duration: 1500
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 0,
      duration: 0
    }).start();
  };

  const navigation = useNavigation<any>();

  const { share } = useLinking();
  const { getTerm } = useTerm();
  const { signOut, user } = useAuth();
  const { light, dark } = useTheme();

  function callNavigationFunction(route: string, specificFunction?: Function) {
    setHideMenu(true);

    if (specificFunction) return specificFunction();

    setTimeout(() => {
      return navigation.reset({ index: 0, routes: [{ name: "Home" }, { name: route }] });
    }, 500);
  }

  async function shareApp() {
    await share(getTerm(100107), "playStore");
  }

  function goTo(route: string, params?: Params) {
    return navigation.reset({ index: 0, routes: [{ name: "Home" }, { name: route, params }] });
  }

  useEffect(() => {
    if (show) fadeIn();
    else fadeOut();
  }, [show]);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <Animated.ScrollView style={[styles.menuOptionsContainer, { opacity: fadeAnim }]}>
      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
        callNavigationFunction("", () => navigation.reset({ index: 0, routes: [{ name: "Home" }] }));
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100007).toUpperCase()}</Text>
      </TouchableOpacity>
      {/* Mais avaliados */}
      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
        callNavigationFunction("", () => navigation.reset({ index: 0, routes: [{ name: "MostRated" }] }));
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100001).toUpperCase()}</Text>
      </TouchableOpacity>
      {/* Minhas Estrelas */}
      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
        callNavigationFunction("", () => navigation.reset({ index: 0, routes: [{ name: "MostRated", params: { watchlist: true } }] }));
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100173).toUpperCase()}</Text>
      </TouchableOpacity>

      {/* Suas avaliações */}
      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
        callNavigationFunction("", () => navigation.reset({ index: 0, routes: [{ name: "MostRated", params: { filterUser: true } }] }));
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100002).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
        callNavigationFunction("Recommended");
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100003).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={shareApp}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100004).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
        callNavigationFunction("", () => navigation.reset({ index: 0, routes: [{ name: "SearchGame" }] }));
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100000).toUpperCase()}</Text>
      </TouchableOpacity>

      {user?.admin && <>
        <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
          callNavigationFunction("GameListAdmin");
        }}>
          <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100153).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
          goTo("GenresModes", { genres: true });
        }}>
          <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100155).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
          callNavigationFunction("GenresModes");
        }}>
          <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100156).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
          callNavigationFunction("BusinessModelList");
        }}>
          <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100118).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
          callNavigationFunction("TagList");
        }}>
          <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100030).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
          callNavigationFunction("UserList");
        }}>
          <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100031).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
          callNavigationFunction("Platforms");
        }}>
          <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100056).toUpperCase()}</Text>
        </TouchableOpacity>
      </>}

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
        callNavigationFunction("Profile");
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100046).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
        console.log("Essa opção não está mais disponível")
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100082).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
        callNavigationFunction("Suggestion");
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100006).toUpperCase()}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark }]} onPress={() => {
        callNavigationFunction("Themes");
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100179).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: dark, marginBottom: 15 }]} onPress={() => {
        callNavigationFunction("", signOut);
      }}>
        <Text style={[styles.menuButtonText, { color: light }]}>{getTerm(100045).toUpperCase()}</Text>
      </TouchableOpacity>
    </Animated.ScrollView>
  );
}