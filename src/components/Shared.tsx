import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Vibration,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { type Emoji, type ListItem } from '../types';

interface EmojiItemProps {
  emoji: Emoji;
  size: number;
  onSelect: (e: Emoji) => void;
  enableHaptics: boolean;
  emojiStyle?: StyleProp<TextStyle>;
}

// O(1) complexity micro-interaction, keeps main JS thread free
const EmojiItemComponent = ({
  emoji,
  size,
  onSelect,
  enableHaptics,
  emojiStyle,
}: EmojiItemProps) => {
  const handlePress = useCallback(() => {
    if (enableHaptics) Vibration.vibrate(10);
    onSelect(emoji);
  }, [emoji, onSelect, enableHaptics]);

  const fontSize = Math.floor(size * 0.65);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.itemContainer,
        {
          width: size,
          height: size,
          transform: [{ scale: pressed ? 1.25 : 1 }],
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={emoji.description}
    >
      <Text
        style={[{ fontSize, color: '#000', textAlign: 'center' }, emojiStyle]}
      >
        {emoji.emoji}
      </Text>
    </Pressable>
  );
};

export const EmojiItem = React.memo(
  EmojiItemComponent,
  (p, n) => p.emoji.emoji === n.emoji.emoji && p.size === n.size
);

interface EmojiRowProps {
  item: ListItem;
  itemSize: number;
  onSelect: (e: Emoji) => void;
  enableHaptics: boolean;
  emojiStyle?: StyleProp<TextStyle>;
}

export const EmojiRow = React.memo(
  ({ item, itemSize, onSelect, enableHaptics, emojiStyle }: EmojiRowProps) => {
    if (item.type !== 'row') return null;
    return (
      <View style={[styles.rowContainer, { height: itemSize }]}>
        {item.data.map((emoji) => (
          <EmojiItem
            key={emoji.emoji}
            emoji={emoji}
            size={itemSize}
            onSelect={onSelect}
            enableHaptics={enableHaptics}
            emojiStyle={emojiStyle}
          />
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  itemContainer: { justifyContent: 'center', alignItems: 'center' },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
