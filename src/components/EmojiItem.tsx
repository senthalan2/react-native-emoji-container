import React, { useCallback, useRef } from 'react';
import { Text, Pressable, StyleSheet, Vibration, Animated } from 'react-native';
import { type Emoji } from '../types';

interface EmojiItemProps {
  emoji: Emoji;
  size: number;
  onSelect: (emoji: Emoji) => void;
  enableHaptics: boolean;
}

// Create an Animated version of Pressable using React Native's built-in Animated API
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const EmojiItemComponent = ({
  emoji,
  size,
  onSelect,
  enableHaptics,
}: EmojiItemProps) => {
  // Replace useSharedValue with useRef and Animated.Value
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.timing(scale, {
      toValue: 1.3,
      duration: 100,
      useNativeDriver: true, // Use native driver for 60fps transform animations
    }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const handlePress = useCallback(() => {
    if (enableHaptics) Vibration.vibrate(10);
    onSelect(emoji);
  }, [emoji, onSelect, enableHaptics]);

  // Exact math to prevent clipping
  const fontSize = Math.floor(size * 0.65);

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      // Pass the animated scale directly into the style array
      style={[
        styles.container,
        { transform: [{ scale }] },
        { width: size, height: size },
      ]}
      accessibilityRole="button"
      accessibilityLabel={emoji.description}
    >
      <Text style={[styles.emoji, { fontSize }]}>{emoji.emoji}</Text>
    </AnimatedPressable>
  );
};

// 🚀 Highly optimized deep-equality check prevents unnecessary re-renders
export const EmojiItem = React.memo(EmojiItemComponent, (prev, next) => {
  return prev.emoji.emoji === next.emoji.emoji && prev.size === next.size;
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    color: '#000',
    textAlign: 'center',
  },
});
