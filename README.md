
# react-native-emoji-container

A highly customizable, performant, and feature-rich emoji picker component for React Native. 

Whether you want a continuous vertical scrolling list or a WhatsApp-style horizontal paginated swipe view, `react-native-emoji-container` has you covered. Built with virtualization for excellent performance, it supports custom themes, custom emojis, haptic feedback, and extensive styling options.

## 🚀 Features

- **Dual Orientations:** Support for both continuous `vertical` scrolling and `horizontal` paginated swiping (WhatsApp style).
- **High Performance:** Uses virtualized lists (`FlatList` / internal virtualization) to handle thousands of emojis smoothly.
- **Custom Emojis:** Inject your own custom emojis (e.g., Slack-style custom emojis) or completely replace the default dataset.
- **Theming System:** Built-in `light` and `dark` modes, plus the ability to pass a fully customized theme object.
- **Customizable UI:** Almost every element can be styled, hidden, or replaced with custom React Nodes.
- **Search Built-in:** Fast, responsive emoji search functionality.
- **Haptic Feedback:** Integrated vibration feedback on emoji selection.
- **Category Management:** Rename categories, replace text labels with SVG icons, or change the default landing category.

## 📦 Installation

```bash
npm install react-native-emoji-container
# or
yarn add react-native-emoji-container
```

## 💻 Quick Start

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EmojiContainer, Emoji } from 'react-native-emoji-container';

export default function App() {
  const [selectedEmoji, setSelectedEmoji] = useState<string>('👋');

  const handleEmojiSelect = (emoji: Emoji) => {
    setSelectedEmoji(emoji.emoji);
    console.log("Selected:", emoji.description);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selected: {selectedEmoji}</Text>
      
      <EmojiContainer 
        onEmojiSelect={handleEmojiSelect} 
        theme="light" // 'light' | 'dark' | CustomTheme
        orientation="horizontal" // 'vertical' | 'horizontal'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  }
});
```

## 🛠 Props & Configuration

### Core Settings

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onEmojiSelect` | `(emoji: Emoji) => void` | **Required** | Callback fired when an emoji is pressed. Returns the full `Emoji` object. |
| `emojis` | `Emoji[]` | `undefined` | Optional override for the default emoji dataset. |
| `additionalEmojis`| `Emoji[]` | `undefined` | Inject additional custom emojis into the list. Grouped by their assigned `category`. |
| `columns` | `number` | `8` | Number of emojis to display per row. |
| `emojiSize` | `number` | `38` | Size of each emoji container in pixels. Font size scales automatically. |
| `orientation` | `vertical \| horizontal` | `vertical`| `vertical`: Continuous scrolling. `horizontal`: Swipe left/right for categories. |
| `theme` | `light \| dark \| Partial<CustomTheme>`| `light`| Color theme mode or custom theme override object. |
| `enableHaptics` | `boolean` | `false` | Toggle haptic vibration feedback when an emoji is pressed. |
| `initialCategory` | `string` | `undefined` | The category name to scroll to immediately upon mounting. |

### Scroll & Bounce Behavior (iOS Only)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `verticalBounces` | `boolean` | `true` | Controls the bounce effect of the vertical scrolling list when it reaches the top or bottom. |
| `horizontalBounces` | `boolean` | `true` | Controls the bounce effect of the horizontal pager when swiping left or right past the first/last category. |
| `horizontalCategoryBounces`| `boolean` | `true` | Controls the bounce effect of the top category scroll bar when scrolling past the edges. |

### Toggles

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSearch` | `boolean` | `true` | Show or hide the top search bar. |
| `hideCategoryBar`| `boolean` | `false` | Hide the horizontal category scroll bar entirely. |
| `hideListHeaders`| `boolean` | `false` | Hide the category text headers inside the scrolling emoji list itself. |

### Search Customization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchPlaceholder`| `string` | `Search emojis...`| Text to display when the search input is empty. |
| `searchProps` | `TextInputProps`| `undefined` | Core React Native `TextInput` props applied directly to the search input. |
| `searchContainerStyle`| `StyleProp<ViewStyle>`| `undefined` | Style applied to the `View` wrapping the search input. |
| `searchInputStyle` | `StyleProp<TextStyle>`| `undefined` | Style applied directly to the search `TextInput`. |

### Category Bar Customization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `categoryBarStyle` | `StyleProp<ViewStyle>`| `undefined` | Style for the top horizontal category scrollbar container. |
| `categoryTabStyle` | `StyleProp<ViewStyle>`| `undefined` | Style for each individual category tab. |
| `categoryTextStyle`| `StyleProp<TextStyle>`| `undefined` | Style for the text inside category tabs. |
| `activeCategoryTextStyle`| `StyleProp<TextStyle>`| `undefined` | Style applied to the text of the *currently active* category tab. |
| `categoryIndicatorStyle`| `StyleProp<ViewStyle>`| `undefined` | Style for the animated indicator line below the active category. |
| `categoryIcons` | `Record<string, ReactNode>`| `undefined` | Replace category text labels with custom components (e.g., SVGs). |
| `categoryTranslation`| `Record<string, string>`| `undefined` | Map to rename or translate category labels (e.g., `{'Smileys': 'Faces'}`). |

### Emoji List Customization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `containerStyle` | `StyleProp<ViewStyle>`| `undefined` | Style applied to the outermost wrapper of the entire `EmojiContainer`. |
| `listContainerStyle`| `StyleProp<ViewStyle>`| `undefined` | Style applied to the container holding the virtualized list. |
| `listHeaderStyle` | `StyleProp<ViewStyle>`| `undefined` | Style applied to category header containers inside the vertical list. |
| `listHeaderTextStyle`| `StyleProp<TextStyle>`| `undefined` | Style applied to the category header text inside the vertical list. |
| `emojiStyle` | `StyleProp<TextStyle>`| `undefined` | Style applied directly to the Emoji text (useful for custom `fontFamily`). |

### External Components

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headerComponent`| `ReactNode` | `undefined` | Custom component rendered at the very top of the picker. |
| `footerComponent`| `ReactNode` | `undefined` | Custom component rendered at the very bottom of the picker. |
| `emptyComponent` | `ReactNode` | `undefined` | Custom component rendered when a search yields zero results. |

---

## 🎨 Theming

The package comes with built-in `LightTheme` and `DarkTheme`. You can easily pass a custom object to partially or fully override the colors.

```tsx
import { EmojiContainer, CustomTheme } from 'react-native-emoji-container';

const myCustomTheme: Partial<CustomTheme> = {
  background: '#fafafa',
  text: '#333333',
  categoryIndicator: '#FF5722', // Custom brand color for the active tab indicator
  searchBackground: '#eeeeee',
};

<EmojiContainer 
  onEmojiSelect={console.log} 
  theme={myCustomTheme} 
/>
```

### Full `CustomTheme` Interface
```typescript
interface CustomTheme {
    background: string;
    text: string;
    categoryIndicator: string;
    categoryIconActive: string;
    categoryIconInactive: string;
    searchBackground: string;
    searchPlaceholder: string;
    searchIcon: string;
    divider: string;
}
```

---

## 🏷 Types

### `Emoji` Object
When `onEmojiSelect` is triggered, it returns an object matching this interface:

```typescript
export interface Emoji {
    emoji: string;
    description: string;
    category: string;
    aliases: string[];
    tags: string[];
    unicode_version?: string;
    ios_version?: string;
    skin_tones?: boolean;
}
```

## 💡 Advanced Examples

### Replacing Category Text with Icons

```tsx
<EmojiContainer
  onEmojiSelect={handleEmojiSelect}
  categoryIcons={{
    'Smileys & Emotion': <SmileIcon size={20} />,
    'Activities': <BallIcon size={20} />,
  }}
  hideListHeaders={true} // Clean look: Rely only on the top icon bar
/>
```

### Adding Custom Emojis (e.g. App-specific stickers)

```tsx
const myCustomEmojis =[
  {
    emoji: '🔥', // Can be an actual emoji or a shortcode string if handled by your renderer
    description: 'Super Fire',
    category: 'Custom Emojis',
    aliases: ['super_fire'],
    tags: ['hot', 'custom'],
  }
];

<EmojiContainer
  onEmojiSelect={handleEmojiSelect}
  additionalEmojis={myCustomEmojis}
  initialCategory="Custom Emojis"
/>
```

## 📄 License

MIT
