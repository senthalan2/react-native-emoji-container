import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import emojiesList from './assets/emojis.json';
import { CategoriesList } from './CategoriesList';
import {
  DEFAULT_EMOJI_SIZE,
  DEFAULT_NUM_COLUMNS,
  WINDOW_WIDTH,
} from './Utilities';
import EmojisTabBar from './EmojisTabBar';
import type {
  CategoriesTypes,
  EmojiItemProps,
  EmojiPickerProps,
} from './Types';
import { Animated } from 'react-native';

let timer: any = undefined;
export const EmojiPicker = ({
  initialSelectedCategory = 'smileys_emotion',
  tabBarProps,
  enableTitle = true,
  titleTextStyle = { fontSize: 16, color: '#000000' },
  titleContainerStyle = { padding: 10 },
  emojisContainerStyle,
  mainContainerStyle = { flex: 1, paddingVertical: 5 },
  numColumns = DEFAULT_NUM_COLUMNS,
  emojisContainerWidth = WINDOW_WIDTH,
  singleEmojiContainerStyle,
  activeOpacity = 0.7,
  onPressEmoji,
  enableTabBar = true,
  tabBarPosition = 'top',
}: EmojiPickerProps) => {
  const listRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const handleChangeCategoryTab = (changedTabId: CategoriesTypes) => {
    const categoryIndex = CategoriesList.findIndex(
      (item) => item.id === changedTabId
    );
    if (categoryIndex !== -1) {
      scrollToIndex(categoryIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    listRef?.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 1,
    });
  };

  const keyExtractor = (_: any, index: number) => {
    return index.toString();
  };

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: emojisContainerWidth,
      offset: emojisContainerWidth * index,
      index,
    }),
    [emojisContainerWidth]
  );

  const getEmojiItemLayout = useCallback(
    (_: any, index: number) => ({
      length: DEFAULT_EMOJI_SIZE,
      offset: DEFAULT_EMOJI_SIZE * index,
      index,
    }),
    [DEFAULT_EMOJI_SIZE]
  );

  const getCategoryTitle = (id: CategoriesTypes) => {
    const category = CategoriesList.find((item) => item.id === id);
    if (category) {
      return category.title;
    }
    return '';
  };

  const getInitialScrollIndex = () => {
    if (initialSelectedCategory) {
      const categoryIndex = CategoriesList.findIndex(
        (item) => item.id === initialSelectedCategory
      );
      if (categoryIndex !== -1) {
        return categoryIndex;
      }
    }
    return 0;
  };

  const getEmojisList = () => {
    return [...emojiesList];
  };

  const getEmojisContainerStyle = () => {
    if (emojisContainerStyle) {
      if (Array.isArray(emojisContainerStyle)) {
        return [...emojisContainerStyle, { width: emojisContainerWidth }];
      }
      return { ...emojisContainerStyle, width: emojisContainerWidth };
    }
    return { width: emojisContainerWidth };
  };

  const getEmojiStyle = () => {
    if (singleEmojiContainerStyle) {
      if (Array.isArray(singleEmojiContainerStyle)) {
        return [
          ...singleEmojiContainerStyle,
          { width: emojisContainerWidth / numColumns },
        ];
      }
      return {
        singleEmojiContainerStyle,
        width: emojisContainerWidth / numColumns,
      };
    }
    return {
      ...styles.singleEmojiContainer,
      width: emojisContainerWidth / numColumns,
    };
  };

  function renderEmoji({ item }: EmojiItemProps) {
    return (
      <TouchableOpacity
        style={getEmojiStyle()}
        activeOpacity={activeOpacity}
        onPress={() => {
          if (onPressEmoji) {
            onPressEmoji(item);
          }
        }}
      >
        <Text
          style={{
            fontSize: emojisContainerWidth / numColumns - 23,
            color: '#000000',
          }}
        >
          {item.emoji}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderItem({ item }: any) {
    return (
      <View style={getEmojisContainerStyle()}>
        {enableTitle && (
          <View style={titleContainerStyle}>
            <Text style={titleTextStyle}>{getCategoryTitle(item.title)}</Text>
          </View>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={item.data}
          bounces={false}
          numColumns={numColumns}
          keyExtractor={keyExtractor}
          renderItem={renderEmoji}
          getItemLayout={getEmojiItemLayout}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => {
              timer = setTimeout(() => resolve(true), 500);
            });
            wait.then(() => {
              scrollToIndex(info.index);
            });
          }}
          initialNumToRender={10}
          windowSize={16}
          maxToRenderPerBatch={5}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    );
  }

  return (
    <View style={mainContainerStyle}>
      {enableTabBar && tabBarPosition === 'top' && (
        <EmojisTabBar
          {...tabBarProps}
          onPressCategory={handleChangeCategoryTab}
          scrollX={scrollX}
          numColumns={numColumns}
        />
      )}
      <FlatList
        ref={listRef}
        showsHorizontalScrollIndicator={false}
        data={getEmojisList()}
        initialScrollIndex={getInitialScrollIndex()}
        bounces={false}
        keyExtractor={keyExtractor}
        pagingEnabled
        horizontal
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        renderItem={renderItem}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        keyboardShouldPersistTaps="handled"
      />
      {enableTabBar && tabBarPosition === 'bottom' && (
        <EmojisTabBar
          {...tabBarProps}
          onPressCategory={handleChangeCategoryTab}
          scrollX={scrollX}
          numColumns={numColumns}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  singleEmojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
