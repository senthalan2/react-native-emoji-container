import type { TextStyle } from 'react-native';
import type { ViewStyle } from 'react-native';

export type CategoriesTypes =
  // | 'recently_used'
  | 'smileys_emotion'
  | 'people_body'
  | 'animals_nature'
  | 'food_drink'
  | 'travel_places'
  | 'activities'
  | 'objects'
  | 'symbols'
  | 'flags'
  | 'search';

export type EmojiDataProp = {
  emoji: string;
  name: string;
  v: string;
  toneEnabled: boolean;
};

export type EmojiItemProps = {
  item: EmojiDataProp;
  index: number;
};

export type EmojiProp = {
  title: string;
  data: EmojiDataProp[];
};

export type EmojiTabBarProps = {
  onPressCategory?: (id: CategoriesTypes) => void;
  selectedTabBackgroundColor?: string;
  unSelectedTabBackgroundColor?: string;
  singleTabStyle?: Omit<ViewStyle, 'backgroundColor'>;
  tabContainerStyle?: Omit<ViewStyle, 'flexDirection'>;
  scrollX: any;
  numColumns?: number;
  activeOpacity?: number;
};

export type EmojiPickerProps = {
  initialSelectedCategory?: CategoriesTypes;
  enableTitle?: boolean;
  titleTextStyle?: TextStyle;
  titleContainerStyle?: ViewStyle;
  emojisContainerStyle?: Omit<ViewStyle, 'width'>;
  tabBarProps?: Omit<
    EmojiTabBarProps,
    'onPressCategory' | 'scrollX' | 'numColumns'
  >;
  mainContainerStyle?: ViewStyle;
  singleEmojiContainerStyle?: Omit<ViewStyle, 'width'>;
  emojisContainerWidth?: number;
  numColumns?: number;
  activeOpacity?: number;
  enableTabBar?: boolean;
  tabBarPosition?: 'top' | 'bottom';
  onPressEmoji?: (item: EmojiDataProp) => void;
};

export type CategoryListProps = {
  id: CategoriesTypes;
  title: string;
  symbol: string;
};
