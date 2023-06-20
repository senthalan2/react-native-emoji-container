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
| titleTextStyle | TextStyle  | No | { fontSize: 16, color: '#000000' } |
| titleContainerStyle | ViewStyle | No | { padding: 10 } |
| emojisContainerStyle | ViewStyle | No |
| tabBarProps | `EmojiTabBarProps` | No |
| mainContainerStyle | ViewStyle | No | { flex: 1, paddingVertical: 5 } |
| singleEmojiContainerStyle | ViewStyle | No |
| emojisContainerWidth | number | No | Dimensions.get('window').width
| numColumns | number | No | 8
| activeOpacity | number | No | 0.7
| enableTabBar | boolean | No | true
| tabBarPosition | `top` or `bottom` | No | `top`
| onPressEmoji | Function | No |     | Its called when click an emoji and it returns the `EmojiDataProp`|

## Types

### CategoriesTypes

| Values | 
| ------ | 
| `recently_used`, `smileys_emotion`, `people_body`, `animals_natre`, `food_drink`, `travel_plaes`, `activities`, `objects`, `symbols`, `flags`, `search`  |

### EmojiTabBarProps

| Prop               | Type    | Required | Default   | Description |
| ----------------- | ------- | -------- | --------- | --------- |
| selectedTabBackgroundColor | string  | No | `#e3e1d8` |
| unSelectedTabBackgroundColor | string  | No | `#ffffff` |
| singleTabStyle | `ViewStyle`  | No |
| tabContainerStyle | `ViewStyle`  | No |
| activeOpacity | number  | No | 0.7 |

### EmojiDataProp

| Key               | Type    | 
| ----------------- | ------- | 
| emoji | string |
| name | string |
| v | string |
| toneEnabled | boolean |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
