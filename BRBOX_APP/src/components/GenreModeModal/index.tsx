import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  View
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import DefaultModal from '../DefaultModal';
import GenreModeCard from '../GenreModeCard';
import { useTheme } from '../../Contexts/Theme';
import { GenreMode } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';

interface GenreModeModalProps {
  visible: boolean;
  isGenre: boolean;
  usedData: GenreMode[];

  setModal: () => void;
  setGenreMode: (businessModel: GenreMode[]) => void;
}

export default function GenreModeModal({visible, isGenre, usedData, setModal, setGenreMode}: GenreModeModalProps) {
  const { darkMode } = useTheme();

  const color = darkMode ? config.dark : "#fff";

  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GenreMode[]>([]);

  const {get} = useRequest();

  async function fetchData()
  {
    try {
      const notUsed = [];
      const data = await get(isGenre ? "/genre" : "/mode", setLoading);

      for (const item of data) {
        const [included] = usedData.filter((item2: GenreMode) => item2.id === item.id);

        if (!included) {
          notUsed.push(item);
        }
      }

      setData(notUsed);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  function render()
  {
    return (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchData}/>
        }
        data={data}
        keyExtractor={(tag: any) => tag.id}
        renderItem={
          ({item}: any) => {
            return (
              <GenreModeCard
                id={item.id}
                name={item.name}
                setLoading={setLoading}
                onPress={() => {
                  setGenreMode([...usedData, item]);
                  setModal();
                }}
              />
            )
          }
        }
      />);
  }

  useEffect(()=>{
    if (visible) fetchData();
  }, [visible]);

  return (
    <DefaultModal
      setModal={setModal}
      visible={visible}
      loading={loading}
      style={{backgroundColor: color, ...styles.container}}
    >
      {render()}
    </DefaultModal>
  );
};