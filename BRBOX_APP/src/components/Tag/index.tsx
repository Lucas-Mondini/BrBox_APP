import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import config from '../../../brbox.config.json';
import {TagValue} from '../../utils/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getIcon} from '../../utils/functions';

interface TagProps {
  tag: TagValue;
  specificStyle?: string;
  large?: boolean;
  home?: boolean;
  topTags?: boolean;
  showName?: boolean;
  noEvaluations?: boolean;
  showTotalVotes?: boolean;
  extraStyles?: object;
  callback?: () => void;
}

export default function Tag({
  tag,
  specificStyle,
  large,
  home,
  topTags,
  showName,
  noEvaluations,
  showTotalVotes,
  callback,
  extraStyles,
}: TagProps) {
  // @ts-ignore
  const bg = specificStyle && topTags ? config[specificStyle] : config.greenBar;

  function formatVotes(vote: number): string {
    return String(
      vote >= 1000
        ? vote >= 1000000
          ? vote / 1000000 + 'M'
          : vote / 1000 + 'K'
        : vote,
    );
  }

  if (!tag) return null;

  return (
    <TouchableOpacity
      onPress={callback}
      disabled={!callback}
      style={[styles.tag, {overflow: 'hidden'}, extraStyles]}>
      <View
        style={[
          {height: large ? 25 : 20, flexDirection: 'row'},
          !noEvaluations
            ? {width: large ? 110 : home ? 40 : 100}
            : {paddingHorizontal: 5, backgroundColor: bg},
        ]}>
        <View
          style={[
            {
              zIndex: 1000,
            },
            !noEvaluations && {position: 'absolute'},
          ]}>
          <Text
            style={[
              {
                textAlign: 'center',
                lineHeight: large ? 25 : 20,
              },
              !noEvaluations && {width: large ? 110 : home ? 40 : 100},
            ]}>
            <Icon
              name={getIcon(tag.icon)}
              size={large ? 18 : 15}
              color={'#000'}
              style={large ? styles.imgLarge : styles.imgSmall}
            />

            {showTotalVotes && (
              <Text
                style={[
                  styles.tagText,
                  large ? styles.tagTextLarge : styles.tagTextSmall,
                ]}>
                {' '}
                {formatVotes(tag.count || tag.total)}
              </Text>
            )}
            {showName && (
              <Text
                style={[
                  styles.tagText,
                  large ? styles.tagTextLarge : styles.tagTextSmall,
                  {paddingLeft: 5},
                ]}>
                {' '}
                {tag.name}
              </Text>
            )}
          </Text>
        </View>

        {!noEvaluations && (
          <>
            <View
              style={{backgroundColor: config.darkGreen, flex: tag.upVotes}}
            />
            <View
              style={{backgroundColor: config.yellow, flex: tag.neutralVotes}}
            />
            <View
              style={{backgroundColor: config.lightRed, flex: tag.downVotes}}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
