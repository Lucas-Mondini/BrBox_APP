import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity } from "react-native";

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
  const { darkMode, setDarkMode } = useTheme();

  const textColor = darkMode ? "#fff" : config.dark;
  const backgroundColorOption = !darkMode ? config.light : config.mediumGray;

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
      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
        callNavigationFunction("", () => navigation.reset({ index: 0, routes: [{ name: "Home" }] }));
      }}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100007).toUpperCase()}</Text>
      </TouchableOpacity>
      {/* Mais avaliados */}
      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
        callNavigationFunction("", () => navigation.reset({ index: 0, routes: [{ name: "MostRated"}] }));
      }}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100001).toUpperCase()}</Text>
      </TouchableOpacity>
      {/* Minhas Estrelas */}
      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
        callNavigationFunction("", () => navigation.reset({ index: 0, routes: [{ name: "MostRated", params: { watchlist: true } }] }));
      }}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100173).toUpperCase()}</Text>
      </TouchableOpacity>

      {/* Suas avaliações */}
      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
        callNavigationFunction("", () => navigation.reset({ index: 0, routes: [{ name: "MostRated", params: { filterUser: true } }] }));
      }}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100002).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
        callNavigationFunction("Recommended");
      }}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100003).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={shareApp}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100004).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
        callNavigationFunction("", () => navigation.reset({ index: 0, routes: [{ name: "SearchGame" }] }));
      }}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100000).toUpperCase()}</Text>
      </TouchableOpacity>

      {user?.admin && <>
        <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
          callNavigationFunction("GameListAdmin");
        }}>
          <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100153).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
          goTo("GenresModes", { genres: true });
        }}>
          <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100155).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
          callNavigationFunction("GenresModes");
        }}>
          <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100156).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
          callNavigationFunction("BusinessModelList");
        }}>
          <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100118).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
          callNavigationFunction("TagList");
        }}>
          <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100030).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
          callNavigationFunction("UserList");
        }}>
          <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100031).toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
          callNavigationFunction("Platforms");
        }}>
          <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100056).toUpperCase()}</Text>
        </TouchableOpacity>
      </>}

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
        callNavigationFunction("Profile");
      }}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100046).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
        setDarkMode(!darkMode);
      }}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(darkMode ? 100081 : 100082).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption }]} onPress={() => {
        callNavigationFunction("Suggestion");
      }}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100006).toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: backgroundColorOption, marginBottom: 15 }]} onPress={() => {
        callNavigationFunction("", signOut);
      }}>
        <Text style={[styles.menuButtonText, { color: textColor }]}>{getTerm(100045).toUpperCase()}</Text>
      </TouchableOpacity>
    </Animated.ScrollView>
  );
}