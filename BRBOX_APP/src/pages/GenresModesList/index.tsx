import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  View
} from 'react-native';

import BottomMenu from '../../components/BottomMenu';
import MainView from '../../components/MainView';

import styles from './styles';

import { BusinessModel, Params } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';
import GenreModeCard from '../../components/GenreModeCard';
import { useLinking } from '../../Contexts/LinkingProvider';

const GenresModesList = () => {
  const route = useRoute();

  const params = route.params as Params;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BusinessModel[]>([]);
  
  const isFocused = useIsFocused()
  const navigation = useNavigation<any>();
  const {deepLinking} = useLinking();

  const {get} = useRequest();

  async function fetchData()
  {
    try {
      const data = await get(params && params.genres ? "/genre" : "/mode", setLoading);

      setData(data);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  function navigateToRegister()
  {
    return navigation.navigate("AddGenreMode", {genres: params && params.genres});
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
                genre={params && params.genres}
                description={item.description}
                setLoading={setLoading}
                onDelete={fetchData}
              />
            )
          }
        }
      />);
  }

  useEffect(()=>{
    if (isFocused) fetchData();
  }, [isFocused]);

  useEffect(() => {
    deepLinking(navigation);
  }, []);

  return (
    <MainView
      showTitle
      headerTitle={params && params.genres ? 100155: 100156}
      loading={loading}
      headerAddButtonAction={navigateToRegister}
    >
      <View style={styles.container}>
        {render()}
      </View>

      <BottomMenu/>
    </MainView>
  );
};

export default GenresModesList;