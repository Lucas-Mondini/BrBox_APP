import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  View
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import { LinkType, Platform } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';
import PlatformCard from '../../components/PlatformCard';
import DefaultModal from '../DefaultModal';
import { useTheme } from '../../Contexts/Theme';

interface PlatformsModalProps {
  visible: boolean;
  usedPlatforms: LinkType[];

  setModal: () => void;
  setPlatform: (platform: Platform) => void;
}

export default function PlatformsModal({visible, usedPlatforms, setModal, setPlatform}: PlatformsModalProps) {
  const { darkMode } = useTheme();

  const color = darkMode ? config.dark : "#fff";

  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const isFocused = useIsFocused()

  const {get} = useRequest();

  async function getPlatforms()
  {
    try {
      const notUsedPlatforms = Array();

      const platformsList = await get("/platform", setLoading);

      for (const usedPlatform of platformsList) {
        const [included] = usedPlatforms.filter((item: LinkType) => item.platform === usedPlatform.id);

        if (!included) {
          notUsedPlatforms.push(usedPlatform);
        }
      }

      setPlatforms(notUsedPlatforms);
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
                key={item.id}
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
      style={{backgroundColor: color, ...styles.container}}
    >
      {renderPlatforms()}
    </DefaultModal>
  );
};