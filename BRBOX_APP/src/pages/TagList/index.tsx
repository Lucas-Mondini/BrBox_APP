import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  View
} from 'react-native';

import BottomMenu from '../../components/BottomMenu';
import TagCard from '../../components/TagCard';
import MainView from '../../components/MainView';

import styles from './styles';

import { Tag } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';

const TagList = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const isFocused = useIsFocused()

  const {get} = useRequest();

  async function getTags()
  {
    try {
      const getTagsList = await get("/tag", setLoading);

      setTags(getTagsList);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  function navigateToTagRegister()
  {
    return navigation.navigate("TagRegister");
  }

  function renderTags()
  {
    return (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getTags}/>
        }
        data={tags}
        keyExtractor={(tag: any) => tag.id}
        renderItem={
          ({item}: any) => {
            return (
              <TagCard
                id={item.id}
                icon={item.icon}
                title={item.name}
                description={item.description_positive}
                setLoading={setLoading}
                onDelete={getTags}
              />
            )
          }
        }
      />);
  }

  useEffect(()=>{
    if (isFocused) getTags();
  }, [isFocused]);

  return (
    <MainView
      showTitle
      headerTitle={100030}
      loading={loading}
      headerAddButtonAction={navigateToTagRegister}
    >
      <View style={styles.container}>
        {renderTags()}
      </View>

      <BottomMenu/>
    </MainView>
  );
};

export default TagList;