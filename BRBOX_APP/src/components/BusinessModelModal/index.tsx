import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  View
} from 'react-native';

import styles from './styles';
import config from "../../../brbox.config.json";

import { BusinessModel, Platform } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';
import DefaultModal from '../DefaultModal';
import { useTheme } from '../../Contexts/Theme';
import BusinessModelCard from '../BusinessModelCard';

interface BusinessModelModalProps {
  visible: boolean;
  setModal: () => void;
  setBusinessModel: (businessModel: BusinessModel) => void;
}

export default function BusinessModelModal({setModal, visible, setBusinessModel}: BusinessModelModalProps) {
  const { darkMode } = useTheme();

  const color = darkMode ? config.dark : "#fff";

  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [businessModelList, setBusinessModelList] = useState<BusinessModel[]>([]);

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

  function renderPlatforms()
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
                onPress={() => {
                  setBusinessModel(item);
                  setModal();
                }}
              />
            )
          }
        }
      />);
  }

  useEffect(()=>{
    if (visible) getBusinessModels();
  }, [visible]);

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