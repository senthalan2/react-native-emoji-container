# react-native-emoji-container

Simple Emoji Picker for React Native Android and IOS

## Installation

```sh
npm install react-native-emoji-container
```

## Usage

```js
import EmojiContainer from 'react-native-emoji-container';

// ...

<EmojiContainer />
```

## Props

### EmojiPicker Props

| Prop               | Type    | Required | Default   | Description |
| ----------------- | ------- | -------- | --------- | --------- |
| initialSelectedCategory | `CategoriesTypes`  | No | `smileys_emotion` | Initial Emoji Category refere `CategoriesTypes`
| enableTitle | boolean  | No | true |
| titleTextStyle | `TextStyle`  | No | { fontSize: 16, color: '#000000' } |
| titleContainerStyle| `ViewStyle` | No | { padding: 10 } |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
