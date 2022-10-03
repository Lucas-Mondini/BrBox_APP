import React from 'react';
import {Text, View} from 'react-native';

import {NewLinkType} from '../../utils/types';

import styles from './styles';
import NewPlatformLink from '../NewPlatformLink';

interface PlatformLinkListProps {
  linkList: NewLinkType[];
  allowRemove: boolean;

  setLinkList: (value: NewLinkType[]) => void;
}

export default function NewPlatformLinkList({
  linkList,
  allowRemove,
  setLinkList,
}: PlatformLinkListProps) {
  function mapLinks() {
    console.log('\n\nNOVO\n\n\n');
    console.log(linkList);
    return linkList.map(link => (
      <NewPlatformLink
        key={link.id}
        link={link}
        linkList={linkList}
        allowRemove={allowRemove}
        setLinkList={setLinkList}
      />
    ));
  }

  return (
    <View style={styles.linkContainer}>
      <Text>{mapLinks()}</Text>
    </View>
  );
}
