import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EmojiContainer } from 'react-native-emoji-container';

export default function EmojiComponent() {
  return (
    <View style={styles.container}>
      <EmojiContainer
        onEmojiSelect={(emoji) => {}}
        columns={7}
        enableHaptics={false}
        orientation="horizontal"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
