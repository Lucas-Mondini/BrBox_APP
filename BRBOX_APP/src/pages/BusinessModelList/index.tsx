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

import { BusinessModel } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';
import { useTerm } from '../../Contexts/TermProvider';
import BusinessModelCard from '../../components/BusinessModelCard';
import deedLinking from '../../utils/deepLinking';

const BusinessModelList = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [businessModelList, setBusinessModelList] = useState<BusinessModel[]>([]);
  const isFocused = useIsFocused()
  const {getTerm} = useTerm();

  const {get} = useRequest();

  async function getBusinessModels()
  {
    try {
      const businessModelList = await get("/businessModel", setLoading);

      setBusinessModelList(businessModelList);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  function navigateToBusinessModelRegister()
  {
    return navigation.navigate("AddBusinessModel");
  }

  function renderBusinessModels()
  {
    return (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getBusinessModels}/>
        }
        data={businessModelList}
        keyExtractor={(tag: any) => tag.id}
        renderItem={
          ({item}: any) => {
            return (
              <BusinessModelCard
                id={item.id}
                name={item.name}
                description={item.description}
                setLoading={setLoading}
                onDelete={getBusinessModels}
              />
            )
          }
        }
      />);
  }

  useEffect(()=>{
    if (isFocused) getBusinessModels();
  }, [isFocused]);

  useEffect(() => {
    deedLinking(navigation);
  }, []);

  return (
    <MainView
      showTitle
      headerTitle={getTerm(100118)}
      loading={loading}
      headerAddButtonAction={navigateToBusinessModelRegister}
    >
      <View style={styles.container}>
        {renderBusinessModels()}
      </View>

      <BottomMenu/>
    </MainView>
  );
};

export default BusinessModelList;