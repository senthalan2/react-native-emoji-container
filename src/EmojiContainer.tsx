import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';

import { type EmojiContainerProps } from './types';
import { getTheme } from './utils/theme';
import { processEmojiData } from './utils/dataUtils';
import { CategoryBar } from './components/CategoryBar';
import { SearchBar } from './components/SearchBar';
import { VerticalList, type VerticalListRef } from './components/VerticalList';
import {
  HorizontalPager,
  type HorizontalPagerRef,
} from './components/HorizontalPager';

export const EmojiContainer = (props: EmojiContainerProps) => {
  const {
    emojis,
    additionalEmojis,
    columns = 8,
    orientation = 'vertical',
    theme = 'light',
    enableSearch = true,
    searchPlaceholder = 'Search emojis...',
    headerComponent,
    footerComponent,
    emptyComponent,
    onEmojiSelect,
    enableHaptics = false,
    initialCategory,
    verticalBounces = true,
    horizontalBounces = true,
    horizontalCategoryBounces = true,
    hideCategoryBar,
    hideListHeaders,
    searchProps,
    searchContainerStyle,
    searchInputStyle,
    categoryBarStyle,
    categoryTabStyle,
    categoryTextStyle,
    activeCategoryTextStyle,
    categoryIndicatorStyle,
    categoryIcons,
    categoryTranslation,
    containerStyle,
    listContainerStyle,
    listHeaderStyle,
    listHeaderTextStyle,
    emojiStyle,
  } = props;

  const { width } = useWindowDimensions();
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');

  const verticalRef = useRef<VerticalListRef>(null);
  const horizontalRef = useRef<HorizontalPagerRef>(null);

  const {
    verticalData,
    horizontalPages,
    categories,
    categoryIndices,
    fullList,
    itemSize,
    sidePadding,
  } = useMemo(
    () =>
      processEmojiData(
        width,
        columns,
        emojis,
        additionalEmojis,
        hideListHeaders
      ),
    [width, columns, emojis, additionalEmojis, hideListHeaders]
  );

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory((initialCategory || categories[0]) ?? '');
    }
  }, [categories, initialCategory, activeCategory]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const keywords = searchQuery.toLowerCase().trim().split(' ');
    const results = fullList.filter((e) => {
      const text =
        `${e.description} ${e.category} ${e.aliases.join(' ')}`.toLowerCase();
      return keywords.every((kw) => text.includes(kw));
    });

    const chunks = [];
    let offset = 0;
    for (let i = 0; i < results.length; i += columns) {
      chunks.push({
        type: 'row' as const,
        id: `s-${i}`,
        data: results.slice(i, i + columns),
        length: itemSize,
        offset,
      });
      offset += itemSize;
    }
    return chunks;
  }, [searchQuery, fullList, columns, itemSize]);

  const handleCategoryPress = useCallback(
    (category: string) => {
      setActiveCategory(category);
      if (orientation === 'vertical') {
        const index = categoryIndices[category];
        if (index !== undefined) verticalRef.current?.scrollToIndex(index);
      } else {
        const index = categories.indexOf(category);
        if (index !== -1) horizontalRef.current?.scrollToIndex(index);
      }
    },
    [orientation, categoryIndices, categories]
  );

  const updateActiveCategory = useCallback((cat: string) => {
    setActiveCategory((prev) => (prev !== cat ? cat : prev));
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.background },
        containerStyle,
      ]}
    >
      {headerComponent}

      {enableSearch && (
        <SearchBar
          theme={currentTheme}
          placeholder={searchPlaceholder}
          onSearch={setSearchQuery}
          searchProps={searchProps}
          searchContainerStyle={searchContainerStyle}
          searchInputStyle={searchInputStyle}
        />
      )}

      {!searchQuery && !hideCategoryBar && (
        <CategoryBar
          categories={categories}
          activeCategory={activeCategory}
          theme={currentTheme}
          onSelectCategory={handleCategoryPress}
          categoryBarStyle={categoryBarStyle}
          categoryTabStyle={categoryTabStyle}
          categoryTextStyle={categoryTextStyle}
          activeCategoryTextStyle={activeCategoryTextStyle}
          categoryIndicatorStyle={categoryIndicatorStyle}
          categoryIcons={categoryIcons}
          categoryTranslation={categoryTranslation}
          horizontalCategoryBounces={horizontalCategoryBounces}
        />
      )}

      <View style={[styles.listContainer, listContainerStyle]}>
        {searchQuery ? (
          searchResults.length === 0 ? (
            emptyComponent || (
              <Text style={[styles.empty, { color: currentTheme.text }]}>
                No emojis found
              </Text>
            )
          ) : (
            <VerticalList
              data={searchResults}
              itemSize={itemSize}
              sidePadding={sidePadding}
              theme={currentTheme}
              enableHaptics={enableHaptics}
              onEmojiSelect={onEmojiSelect}
              onCategoryChange={() => {}}
              emojiStyle={emojiStyle}
              listHeaderStyle={listHeaderStyle}
              listHeaderTextStyle={listHeaderTextStyle}
              categoryTranslation={categoryTranslation}
              verticalBounces={verticalBounces}
            />
          )
        ) : orientation === 'horizontal' ? (
          <HorizontalPager
            ref={horizontalRef}
            pages={horizontalPages}
            width={width}
            itemSize={itemSize}
            sidePadding={sidePadding}
            theme={currentTheme}
            enableHaptics={enableHaptics}
            onEmojiSelect={onEmojiSelect}
            onCategoryChange={updateActiveCategory}
            emojiStyle={emojiStyle}
            horizontalBounces={horizontalBounces}
            verticalBounces={verticalBounces}
          />
        ) : (
          <VerticalList
            ref={verticalRef}
            data={verticalData}
            itemSize={itemSize}
            sidePadding={sidePadding}
            theme={currentTheme}
            enableHaptics={enableHaptics}
            onEmojiSelect={onEmojiSelect}
            onCategoryChange={updateActiveCategory}
            emojiStyle={emojiStyle}
            listHeaderStyle={listHeaderStyle}
            listHeaderTextStyle={listHeaderTextStyle}
            categoryTranslation={categoryTranslation}
            verticalBounces={verticalBounces}
          />
        )}
      </View>

      {footerComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  listContainer: { flex: 1 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
});
