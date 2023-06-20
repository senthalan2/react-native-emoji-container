import React from "react";
import { TextStyle, ViewStyle } from "react-native";
declare module "react-native-emoji-container" {
export enum Categories {
  recently_used = "recently_used",
  smileys_emotion = 'smileys_emotion',
  people_body = 'people_body',
  animals_nature = 'animals_nature',
  food_drink = 'food_drink',
  travel_places = 'travel_places',
  activities = 'activities',
  objects = 'objects',
  symbols = 'symbols',
  flags = 'flags',
  search = 'search',
}


export type EmojiDataProp = {
  emoji: string;
  name: string;
  v: string;
  toneEnabled: boolean;
};

export type EmojiTabBarProps = {
  onPressCategory?: (id: Categories) => void;
  scrollX: any;
  numColumns?: number;
  selectedTabBackgroundColor?: string;
  unSelectedTabBackgroundColor?: string;
  singleTabStyle?: Omit<ViewStyle, 'backgroundColor'>;
  tabContainerStyle?: Omit<ViewStyle, 'flexDirection'>;
  activeOpacity?: number;
};
  
export interface EmojiContainerProps {
  initialSelectedCategory?: Categories;
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
}
  
const EmojiContainer: React.ComponentType<EmojiContainerProps>;
  
export default EmojiContainer;
}