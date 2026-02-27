import React, { useRef, useEffect } from 'react';
import {
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  Animated,
  Easing,
} from 'react-native';
import { type CustomTheme } from '../types';

interface CategoryBarProps {
  categories: string[];
  activeCategory: string;
  theme: CustomTheme;
  onSelectCategory: (category: string) => void;
  categoryBarStyle?: StyleProp<ViewStyle>;
  categoryTabStyle?: StyleProp<ViewStyle>;
  categoryTextStyle?: StyleProp<TextStyle>;
  activeCategoryTextStyle?: StyleProp<TextStyle>;
  categoryIndicatorStyle?: StyleProp<ViewStyle>;
  categoryIcons?: Record<string, React.ReactNode>;
  categoryTranslation?: Record<string, string>;
  horizontalCategoryBounces?: boolean;
}

const TAB_WIDTH = 80;

export const CategoryBar = React.memo(
  ({
    categories,
    activeCategory,
    theme,
    onSelectCategory,
    categoryBarStyle,
    categoryTabStyle,
    categoryTextStyle,
    activeCategoryTextStyle,
    categoryIndicatorStyle,
    categoryIcons,
    categoryTranslation,
    horizontalCategoryBounces,
  }: CategoryBarProps) => {
    const scrollRef = useRef<ScrollView>(null);
    const activeIndex = categories.indexOf(activeCategory);

    // Persist the animated value across renders
    const indicatorPosition = useRef(
      new Animated.Value(Math.max(0, activeIndex) * TAB_WIDTH)
    ).current;

    useEffect(() => {
      if (activeIndex !== -1) {
        // 1. Smoothly glide the indicator without any bouncing/oscillation
        Animated.timing(indicatorPosition, {
          toValue: activeIndex * TAB_WIDTH,
          duration: 250, // 250ms is standard for snappy UI transitions
          easing: Easing.inOut(Easing.ease), // Ensures a smooth start and stop
          useNativeDriver: true,
        }).start();

        // 2. Scroll the ScrollView to keep the active tab in view
        scrollRef.current?.scrollTo({
          x: activeIndex * TAB_WIDTH - 40,
          animated: true,
        });
      }
    }, [activeIndex, indicatorPosition]);

    return (
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.divider,
          },
          categoryBarStyle,
        ]}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={horizontalCategoryBounces}
        >
          {/* Wrapping tabs in a container stabilizes absolute positioning relative to the ScrollView padding */}
          <View style={styles.tabsContainer}>
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <Pressable
                  key={cat}
                  style={[styles.tab, categoryTabStyle]}
                  onPress={() => onSelectCategory(cat)}
                >
                  {categoryIcons && categoryIcons[cat] ? (
                    categoryIcons[cat]
                  ) : (
                    <Text
                      style={[
                        styles.tabText,
                        {
                          color: isActive
                            ? theme.categoryIconActive
                            : theme.categoryIconInactive,
                        },
                        categoryTextStyle,
                        isActive && activeCategoryTextStyle,
                      ]}
                      numberOfLines={1}
                    >
                      {categoryTranslation?.[cat] || cat.split(' ')[0]}
                    </Text>
                  )}
                </Pressable>
              );
            })}

            <Animated.View
              style={[
                styles.indicator,
                { backgroundColor: theme.categoryIndicator },
                categoryIndicatorStyle,
                { transform: [{ translateX: indicatorPosition }] },
              ]}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: { height: 44, borderBottomWidth: StyleSheet.hairlineWidth },
  scrollContent: { paddingHorizontal: 8 },
  // This inner container fixes the flickering layout jumps
  tabsContainer: { flexDirection: 'row', position: 'relative' },
  tab: {
    width: TAB_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabText: { fontSize: 12, fontWeight: '600' },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: TAB_WIDTH,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
});
