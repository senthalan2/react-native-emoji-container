import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  type ViewToken,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { type ListItem, type Emoji, type CustomTheme } from '../types';
import { EmojiRow } from './Shared';
import { HEADER_HEIGHT } from '../utils/dataUtils';

interface VerticalListProps {
  data: ListItem[];
  itemSize: number;
  sidePadding: number;
  theme: CustomTheme;
  enableHaptics: boolean;
  onEmojiSelect: (emoji: Emoji) => void;
  onCategoryChange: (category: string) => void;
  listHeaderStyle?: StyleProp<ViewStyle>;
  listHeaderTextStyle?: StyleProp<TextStyle>;
  emojiStyle?: StyleProp<TextStyle>;
  categoryTranslation?: Record<string, string>;
  verticalBounces?: boolean;
}

export interface VerticalListRef {
  scrollToIndex: (index: number) => void;
}

export const VerticalList = forwardRef<VerticalListRef, VerticalListProps>(
  (
    {
      data,
      itemSize,
      sidePadding,
      theme,
      enableHaptics,
      onEmojiSelect,
      onCategoryChange,
      listHeaderStyle,
      listHeaderTextStyle,
      emojiStyle,
      categoryTranslation,
      verticalBounces,
    },
    ref
  ) => {
    const listRef = useRef<FlatList<ListItem>>(null);

    // --- FLICKER FIX LOGIC ---
    const isProgrammaticScroll = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout>(null);
    const onCategoryChangeRef = useRef(onCategoryChange);

    // Keep ref up to date to prevent stale closures without re-rendering FlatList
    useEffect(() => {
      onCategoryChangeRef.current = onCategoryChange;
    }, [onCategoryChange]);

    useImperativeHandle(ref, () => ({
      scrollToIndex: (index: number) => {
        // Block viewability updates while animating
        isProgrammaticScroll.current = true;

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        // Auto-unlock after animation (800ms is a safe window for scroll animation)
        scrollTimeout.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 800);

        listRef.current?.scrollToIndex({ index, animated: true });
      },
    }));

    const getItemLayout = useCallback(
      (_: any, index: number) => {
        const item = data[index];
        return { length: item?.length, offset: item?.offset, index };
      },
      [data]
    );

    const onViewableItemsChanged = useRef(
      ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        // Ignore viewable items if we are programmatically scrolling via Category click
        if (isProgrammaticScroll.current) return;

        if (viewableItems.length > 0) {
          const first = viewableItems?.[0]?.item as ListItem;
          onCategoryChangeRef.current(
            (first.type === 'header'
              ? first.title
              : first?.data?.[0]?.category) ?? ''
          );
        }
      }
    ).current;

    const renderItem = useCallback(
      ({ item }: { item: ListItem }) => {
        if (item.type === 'header') {
          return (
            <View
              style={[
                styles.header,
                { height: HEADER_HEIGHT },
                listHeaderStyle,
              ]}
            >
              <Text
                style={[
                  styles.headerText,
                  { color: theme.text },
                  listHeaderTextStyle,
                ]}
              >
                {categoryTranslation?.[item.title] || item.title}
              </Text>
            </View>
          );
        }
        return (
          <EmojiRow
            item={item}
            itemSize={itemSize}
            onSelect={onEmojiSelect}
            enableHaptics={enableHaptics}
            emojiStyle={emojiStyle}
          />
        );
      },
      [
        theme.text,
        itemSize,
        onEmojiSelect,
        enableHaptics,
        listHeaderStyle,
        listHeaderTextStyle,
        emojiStyle,
        categoryTranslation,
      ]
    );

    return (
      <View style={{ flex: 1, paddingHorizontal: sidePadding / 2 }}>
        <FlatList
          ref={listRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // @ts-ignore
          getItemLayout={getItemLayout}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={true}
          maxToRenderPerBatch={15}
          initialNumToRender={20}
          windowSize={7}
          bounces={verticalBounces}
          // Re-enable tracking instantly if the user touches/drags the screen
          onScrollBeginDrag={() => {
            isProgrammaticScroll.current = false;
          }}
          // Re-enable tracking reliably when scroll physics stop
          onMomentumScrollEnd={() => {
            isProgrammaticScroll.current = false;
          }}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  header: { justifyContent: 'flex-end', paddingBottom: 4 },
  headerText: { fontSize: 14, fontWeight: '600', opacity: 0.6 },
});
