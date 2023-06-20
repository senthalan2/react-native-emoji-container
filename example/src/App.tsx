import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import EmojiContainer from 'react-native-emoji-container';

export default function App() {
  return (
    <View style={styles.container}>
      <EmojiContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
