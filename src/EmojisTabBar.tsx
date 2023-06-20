import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CategoriesList } from './CategoriesList';
import { DEFAULT_NUM_COLUMNS, WINDOW_WIDTH } from './Utilities';
import type { EmojiTabBarProps } from './Types';
import { StyleSheet } from 'react-native';
import { Animated } from 'react-native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const EmojisTabBar = ({
  onPressCategory,
  singleTabStyle,
  selectedTabBackgroundColor = '#e3e1d8',
  unSelectedTabBackgroundColor = '#ffffff',
  scrollX,
  tabContainerStyle,
  numColumns = DEFAULT_NUM_COLUMNS,
  activeOpacity = 0.7,
}: EmojiTabBarProps) => {
  const getTabStyle = (bgColor: string) => {
    if (singleTabStyle) {
      if (Array.isArray(singleTabStyle)) {
        return [
          styles.tabStyle,
          ...singleTabStyle,
          {
            backgroundColor: bgColor,
            width: WINDOW_WIDTH / 10,
          },
        ];
      }
      return [
        styles.tabStyle,
        singleTabStyle,
        {
          backgroundColor: bgColor,
          width: WINDOW_WIDTH / 10,
        },
      ];
    }
    return [
      styles.tabStyle,
      {
        backgroundColor: bgColor,
        width: WINDOW_WIDTH / 10,
      },
    ];
  };

  const getTabContainerStyle = () => {
    if (tabContainerStyle) {
      if (Array.isArray(tabContainerStyle)) {
        return [
          { justifyContent: 'space-evenly', paddingVertical: 5 },
          ...tabContainerStyle,
          { flexDirection: 'row' },
        ];
      }
      return [
        styles.tabContainer,
        { justifyContent: 'space-evenly', paddingVertical: 5 },
        tabContainerStyle,
        { flexDirection: 'row' },
      ];
    }
    return styles.tabContainer;
  };

  return (
    <View style={getTabContainerStyle()}>
      {CategoriesList.filter((item) => item.id !== 'search').map(
        (item, index) => {
          const bgColor = scrollX.interpolate({
            inputRange: [
              WINDOW_WIDTH * (index - 1),
              WINDOW_WIDTH * index,
              WINDOW_WIDTH * (index + 1),
            ],
            outputRange: [
              unSelectedTabBackgroundColor,
              selectedTabBackgroundColor,
              unSelectedTabBackgroundColor,
            ],
            extrapolate: 'clamp',
          });

          return (
            <AnimatedTouchable
              onPress={() => {
                if (onPressCategory) {
                  onPressCategory(item.id);
                }
              }}
              key={item.id}
              style={getTabStyle(bgColor)}
              activeOpacity={activeOpacity}
            >
              <Text
                style={{
                  fontSize: WINDOW_WIDTH / numColumns - 30,
                  color: '#000000',
                }}
              >
                {item.symbol}
              </Text>
            </AnimatedTouchable>
          );
        }
      )}
    </View>
  );
};

export default EmojisTabBar;

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: 3,
  },
});
