import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, FlatList, type StyleProp, type TextStyle } from 'react-native';
import { type CategoryPage, type Emoji, type CustomTheme } from '../types';
import { EmojiRow } from './Shared';

interface HorizontalPagerProps {
  pages: CategoryPage[];
  width: number;
  itemSize: number;
  sidePadding: number;
  theme: CustomTheme;
  enableHaptics: boolean;
  onEmojiSelect: (emoji: Emoji) => void;
  onCategoryChange: (category: string) => void;
  emojiStyle?: StyleProp<TextStyle>;
  horizontalBounces?: boolean;
  verticalBounces?: boolean;
}

export interface HorizontalPagerRef {
  scrollToIndex: (index: number) => void;
}

const CategoryPageGrid = React.memo(
  ({
    rows,
    width,
    itemSize,
    sidePadding,
    onSelect,
    enableHaptics,
    emojiStyle,
    verticalBounces,
  }: any) => {
    const getItemLayout = useCallback(
      (_: any, index: number) => {
        return {
          length: rows[index].length,
          offset: rows[index].offset,
          index,
        };
      },
      [rows]
    );

    return (
      <View style={{ width, flex: 1, paddingHorizontal: sidePadding / 2 }}>
        <FlatList
          data={rows}
          renderItem={({ item }) => (
            <EmojiRow
              item={item}
              itemSize={itemSize}
              onSelect={onSelect}
              enableHaptics={enableHaptics}
              emojiStyle={emojiStyle}
            />
          )}
          keyExtractor={(item) => item.id}
          getItemLayout={getItemLayout}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={true}
          maxToRenderPerBatch={15}
          windowSize={5}
          bounces={verticalBounces}
        />
      </View>
    );
  }
);

export const HorizontalPager = forwardRef<
  HorizontalPagerRef,
  HorizontalPagerProps
>(
  (
    {
      pages,
      width,
      itemSize,
      sidePadding,
      onEmojiSelect,
      onCategoryChange,
      enableHaptics,
      emojiStyle,
      horizontalBounces,
      verticalBounces,
    },
    ref
  ) => {
    const flatListRef = useRef<FlatList>(null);

    useImperativeHandle(ref, () => ({
      scrollToIndex: (index: number) =>
        flatListRef.current?.scrollToIndex({ index, animated: true }),
    }));

    const handleMomentumScrollEnd = useCallback(
      (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        if (pages[index]) onCategoryChange(pages[index].category);
      },
      [width, pages, onCategoryChange]
    );

    const getItemLayout = useCallback(
      (_: any, index: number) => ({
        length: width,
        offset: width * index,
        index,
      }),
      [width]
    );

    return (
      <FlatList
        ref={flatListRef}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.category}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <CategoryPageGrid
            rows={item.rows}
            width={width}
            itemSize={itemSize}
            sidePadding={sidePadding}
            onSelect={onEmojiSelect}
            enableHaptics={enableHaptics}
            emojiStyle={emojiStyle}
            verticalBounces={verticalBounces}
          />
        )}
        removeClippedSubviews={true}
        windowSize={3}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        bounces={horizontalBounces}
      />
    );
  }
);
