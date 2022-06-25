import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ImageType } from '../../utils/types';

import config from "../../../brbox.config.json";

const {width} = Dimensions.get('window');

const SPACING = 5;
const ITEM_LENGTH = width * 0.8;
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const BORDER_RADIUS = 10;
const CURRENT_ITEM_TRANSLATE_Y = 15;

interface ImageCarouselProps {
  data: ImageType[];
}

const ImageCarousel: FC<ImageCarouselProps> = ({data}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState<ImageType[]>([]);
  const currentIndex = useRef<number>(0);
  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    // @ts-ignore
    setDataWithPlaceholders([{id: -1}, ...data, {id: data.length}]);
    currentIndex.current = 1;
  }, [data]);

  const handleOnViewableItemsChanged = useCallback(
    ({viewableItems}) => {
      const itemsInView = viewableItems.filter(
        ({item}: {item: ImageType}) => item.link && item.name,
      );

      if (itemsInView.length === 0) {
        return;
      }

      currentIndex.current = itemsInView[0].index;
    },
    [data],
  );

  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * (index - 1),
    index,
  });

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dataWithPlaceholders}
        renderItem={({item, index}) => {
          if (!item.link) {
            return <View style={{width: EMPTY_ITEM_LENGTH}} />;
          }

          const inputRange = [
            (index - 2) * ITEM_LENGTH,
            (index - 1) * ITEM_LENGTH,
            index * ITEM_LENGTH,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [
              CURRENT_ITEM_TRANSLATE_Y * 2,
              CURRENT_ITEM_TRANSLATE_Y,
              CURRENT_ITEM_TRANSLATE_Y * 2,
            ],
            extrapolate: 'clamp',
          });

          return (
            <View style={{width: ITEM_LENGTH}}>
              <Animated.View
                style={[
                  {
                    transform: [{translateY}],
                  },
                  styles.itemContent,
                ]}>
                <Image source={{uri: item.link}} style={styles.itemImage} />
                <Text style={styles.itemText} numberOfLines={1}>
                  {item.name}
                </Text>
              </Animated.View>
            </View>
          );
        }}
        getItemLayout={getItemLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_LENGTH}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {},
  arrowBtn: {},
  flatListContent: {
    height: CURRENT_ITEM_TRANSLATE_Y * 2 + ITEM_LENGTH,
    alignItems: 'center',
    marginBottom: CURRENT_ITEM_TRANSLATE_Y,
  },
  itemContent: {
    marginHorizontal: SPACING * 3,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  itemText: {
    fontSize: 24,
    position: 'absolute',
    bottom: SPACING * 2,
    right: SPACING * 2,
    color: 'white',
    fontFamily: config.fontFamilyBold
  },
  itemImage: {
    width: '100%',
    height: ITEM_LENGTH,
    borderRadius: BORDER_RADIUS,
    resizeMode: 'cover',
  },
});