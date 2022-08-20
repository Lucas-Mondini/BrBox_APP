import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MainView from '../../components/MainView';
import { useGame } from '../../Contexts/Game';

import config from "../../../brbox.config.json";
import styles from './styles';

import { Message, Params, Tag } from '../../utils/types';

import { useTheme } from '../../Contexts/Theme';
import TagsContainers from '../../components/TagsContainers';
import { useTerm } from '../../Contexts/TermProvider';
import GameTimeModal from '../../components/GameTimeModal';
import GameTimeCard from '../../components/GameTimeCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLinking } from '../../Contexts/LinkingProvider';
import GameAssocInfoModal from '../../components/GameAssocInfoModal';
import MessageModal from '../../components/MessageModal';

const GameInfo = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const { share } = useLinking();
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();
  const {
    name, loading, id, businessModelList, genreList, modeList, isDlc,
    loadGame, renderLinks, renderImages,
  } = useGame();

  const [modal, setModal] = useState(false);
  const [modalAssoc, setModalAssoc] = useState(false);
  const [tagsContainer, setTagsContainer] = useState<React.ReactElement>();
  const [evaluationTags, setEvaluationTags] = useState<Tag[]>([]);

  const [message, setMessage] = useState<Message | null>(null);

  const {deepLinking} = useLinking();
  const params = route.params as Params;

  const color = darkMode ? "#fff" : config.mainIconColor;

  async function shareApp()
  {
    try {
      const message = getTerm(100141).replace("%1", name);

      await share(message, "api", `gameUtils/gameInfoOpenApp?gameId=${id}`);
    } catch (error) {
      Alert.alert(getTerm(100108), getTerm(100109))
    }
  }

  function renderNamesFromArray(list: any[] | null, nameProperty: string)
  {
    if (!list || list.length === 0) return null;

    const textColor = darkMode ? config.mediumGreen : config.darkGreen;

    const listComp = list.map((item, index) => (
      <Text key={index} style={[styles.infoText, {color: textColor}]}>{item[nameProperty]} {(list.length > 1 && list.length !== index + 1) && "| "}</Text>
    ));

    return <Text>{listComp}</Text>
  }

  function setMessageError()
  {
    setMessage({title: 100071, message: 100072});
  }

  useEffect(() => {
    if (isFocused && params.id) {
      loadGame(params.id, setMessageError);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && !loading) {
      setTagsContainer(
        <TagsContainers
          setEvaluationTags={setEvaluationTags}
        />
      );
    }
  }, [isFocused, loading]);

  useEffect(() => {
    deepLinking(navigation);
  }, []);

  return (
    <MainView
      loading={loading}
      showTitle
      showBottom
      headerTitle={(`${name} ${isDlc ? "(DLC)" : ""}`) || ""}
      headerAddButtonIcon="share-2"
      headerAddButtonAction={shareApp}
    >
      <MessageModal
        visible={!!message}
        message={message}
        setModal={() => setMessage(null)}
        buttonCustomText={100149}
        buttonCustomFunction={() => {
          setMessage(null);
          navigation.reset({index: 0, routes: [{name: "Home"}]});
        }}
      />

      <GameTimeModal
        visible={modal}
        setModal={() => setModal(!modal)}
      />

      <GameAssocInfoModal
        visible={modalAssoc}
        setModal={() => setModalAssoc(!modalAssoc)}
      />

      <ScrollView
        style={[styles.container]}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => loadGame(id, setMessageError)}/>
        }
      >
        {renderImages()}

        {renderLinks()}

        {(modeList.length > 0 || genreList.length > 0 || businessModelList.length > 0) &&
          <TouchableOpacity
            style={[styles.infoContainer]}
            onPress={() => setModalAssoc(!modalAssoc)}
          >
            <Icon
              name="information-outline"
              size={35}
              color={color}
            />

            <View style={[styles.information]}>
              {modeList.length > 0 && renderNamesFromArray(modeList, "name")}
              {genreList.length > 0 && renderNamesFromArray(genreList, "name")}
              {businessModelList.length > 0 && renderNamesFromArray(businessModelList, "name")}
            </View>
          </TouchableOpacity>
        }

        {!!id && <GameTimeCard onPress={() => setModal(!modal)}/>}

        {(tagsContainer && !!id) && tagsContainer}
      </ScrollView>
    </MainView>
  );
};

export default GameInfo;