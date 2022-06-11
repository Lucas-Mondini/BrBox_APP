import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  useColorScheme,
  View
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import { Platform } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';
import PlatformCard from '../../components/PlatformCard';
import DefaultModal from '../DefaultModal';

interface PlatformsModalProps {
  visible: boolean;
  setModal: () => void;
  setPlatform: (platform: Platform) => void;
}

export default function PlatformsModal({setModal, visible, setPlatform}: PlatformsModalProps) {
  const isDarkMode = useColorScheme() === 'dark';

  const color = isDarkMode ? config.dark : "#fff";

  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const isFocused = useIsFocused()

  const {get} = useRequest();

  async function getPlatforms()
  {
    try {
      const getPlatformsList = await get("/platform", setLoading);

      setPlatforms(getPlatformsList);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  function renderPlatforms()
  {
    return (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getPlatforms}/>
        }
        data={platforms}
        keyExtractor={(tag: any) => tag.id}
        renderItem={
          ({item}: any) => {
            return (
              <PlatformCard
                id={item.id}
                name={item.name}
                setLoading={setLoading}
                onPress={() => {
                  setPlatform({id: item.id, platform: item.id, name: item.name});
                  setModal();
                }}
              />
            )
          }
        }
      />);
  }

  useEffect(()=>{
    if (isFocused) getPlatforms();
  }, [isFocused]);

  return (
    <DefaultModal
      setModal={setModal}
      visible={visible}
      loading={loading}
    >
      <View style={[styles.container, {backgroundColor: color}]}>
        {renderPlatforms()}
      </View>
    </DefaultModal>
  );
};