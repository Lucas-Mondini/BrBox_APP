import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  View
} from 'react-native';

import BottomMenu from '../../components/BottomMenu';
import MainView from '../../components/MainView';

import styles from './styles';

import { Platform } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';
import PlatformCard from '../../components/PlatformCard';
import deedLinking from '../../utils/deepLinking';

const Platforms = () => {
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

  function navigateToPlatformRegister()
  {
    return navigation.navigate("AddPlatform");
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
                onDelete={getPlatforms}
              />
            )
          }
        }
      />);
  }

  useEffect(()=>{
    if (isFocused) getPlatforms();
  }, [isFocused]);

  useEffect(() => {
    deedLinking(navigation);
  }, []);

  return (
    <MainView
      showTitle
      headerTitle={100056}
      loading={loading}
      headerAddButtonAction={navigateToPlatformRegister}
    >
      <View style={styles.container}>
        {renderPlatforms()}
      </View>

      <BottomMenu/>
    </MainView>
  );
};

export default Platforms;