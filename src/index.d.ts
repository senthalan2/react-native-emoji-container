import { ReactNode, ComponentType } from 'react';
import { StyleProp, TextStyle, ViewStyle, TextInputProps } from 'react-native';

declare module 'react-native-emoji-container' {
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

    export interface CustomTheme {
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

    export interface EmojiContainerProps {
        // --------------------------------------------------------
        // CORE SETTINGS
        // --------------------------------------------------------

        /**
         * Callback fired when an emoji is pressed.
         * @param emoji The full emoji object selected.
         */
        onEmojiSelect: (emoji: Emoji) => void;

        /**
         * Optional override for the default emoji dataset.
         * If provided, this replaces the built-in emoji.json.
         */
        emojis?: Emoji[];

        /**
         * Inject additional custom emojis into the list (e.g., custom slack emojis).
         * They will be grouped by whatever `category` string you assign them.
         */
        additionalEmojis?: Emoji[];

        /**
         * Number of emojis to display per row.
         * @default 8
         */
        columns?: number;

        /**
         * Size of each emoji container in pixels. The font size scales automatically.
         * @default 38
         */
        emojiSize?: number;

        /**
         * Defines the scroll behavior.
         * `vertical` - One continuous vertical scrolling list.
         * `horizontal` - WhatsApp style: swipe left/right to change categories, scroll up/down for emojis.
         * @default "vertical"
         */
        orientation?: 'vertical' | 'horizontal';

        /**
         * Set the color theme. Accepts 'light', 'dark', or a completely custom theme object.
         * @default "light"
         */
        theme?: Partial<CustomTheme> | 'light' | 'dark';

        /**
         * Toggle the haptic vibration feedback when an emoji is pressed.
         * @default false
         */
        enableHaptics?: boolean;

        /**
         * The category name to scroll to immediately upon mounting.
         */
        initialCategory?: string;

        // --------------------------------------------------------
        // SCROLL & BOUNCE BEHAVIOR (iOS ONLY)
        // --------------------------------------------------------

        /**
         * Controls the bounce effect of the vertical scrolling list when it reaches the top or bottom.
         * Note: The `bounces` prop is supported on iOS only.
         * @default true
         */
        verticalBounces?: boolean;

        /**
         * Controls the bounce effect of the horizontal pager when swiping left or right past the first/last category.
         * Note: The `bounces` prop is supported on iOS only.
         * @default true
         */
        horizontalBounces?: boolean;

        /**
         * Controls the bounce effect of the top category scroll bar when scrolling past the edges.
         * Note: The `bounces` prop is supported on iOS only.
         * @default true
         */
        horizontalCategoryBounces?: boolean;

        // --------------------------------------------------------
        // TOGGLES
        // --------------------------------------------------------

        /**
         * Show or hide the top search bar.
         * @default true
         */
        enableSearch?: boolean;

        /**
         * Hide the horizontal category scroll bar.
         * @default false
         */
        hideCategoryBar?: boolean;

        /**
         * Hide the category text headers inside the scrolling emoji list.
         * Useful if you only want to rely on the top CategoryBar.
         * @default false
         */
        hideListHeaders?: boolean;

        // --------------------------------------------------------
        // SEARCH CUSTOMIZATION
        // --------------------------------------------------------

        /**
         * Text to display when the search input is empty.
         * @default "Search emojis..."
         */
        searchPlaceholder?: string;

        /**
         * Pass any core React Native TextInput props directly to the search input.
         * Useful for changing keyboard type, auto-capitalization, or cursor color.
         */
        searchProps?: TextInputProps;

        /**
         * Style applied to the View container wrapping the search input.
         */
        searchContainerStyle?: StyleProp<ViewStyle>;

        /**
         * Style applied directly to the search TextInput component.
         */
        searchInputStyle?: StyleProp<TextStyle>;

        // --------------------------------------------------------
        // CATEGORY BAR CUSTOMIZATION
        // --------------------------------------------------------

        /**
         * Style applied to the top horizontal category scrollbar container.
         */
        categoryBarStyle?: StyleProp<ViewStyle>;

        /**
         * Style applied to each individual category tab (touchable area).
         */
        categoryTabStyle?: StyleProp<ViewStyle>;

        /**
         * Style applied to the text inside the category tabs.
         */
        categoryTextStyle?: StyleProp<TextStyle>;

        /**
         * Style applied to the text of the *currently active* category tab.
         */
        activeCategoryTextStyle?: StyleProp<TextStyle>;

        /**
         * Style applied to the animated indicator line below the active category.
         */
        categoryIndicatorStyle?: StyleProp<ViewStyle>;

        /**
         * A map object to replace category text labels with custom React nodes (like SVG icons).
         * Example: `{'Smileys & Emotion': <MySmileIcon />}`
         */
        categoryIcons?: Record<string, ReactNode>;

        /**
         * A map object to rename or translate category labels.
         * Example: `{'Smileys & Emotion': 'Faces'}`
         */
        categoryTranslation?: Record<string, string>;

        // --------------------------------------------------------
        // EMOJI LIST CUSTOMIZATION
        // --------------------------------------------------------

        /**
         * Style applied to the outermost wrapper of the entire EmojiPicker.
         */
        containerStyle?: StyleProp<ViewStyle>;

        /**
         * Style applied to the container holding the virtualized list of emojis.
         */
        listContainerStyle?: StyleProp<ViewStyle>;

        /**
         * Style applied to the container of the category headers inside the scrolling list.
         */
        listHeaderStyle?: StyleProp<ViewStyle>;

        /**
         * Style applied to the text of the category headers inside the scrolling list.
         */
        listHeaderTextStyle?: StyleProp<TextStyle>;

        /**
         * Style applied directly to the actual Emoji text element.
         * Extremely useful for setting a custom `fontFamily` (e.g., 'AppleColorEmoji').
         */
        emojiStyle?: StyleProp<TextStyle>;

        // --------------------------------------------------------
        // EXTERNAL COMPONENTS
        // --------------------------------------------------------

        /**
         * Optional custom component rendered at the very top of the picker.
         */
        headerComponent?: ReactNode;

        /**
         * Optional custom component rendered at the very bottom of the picker.
         */
        footerComponent?: ReactNode;

        /**
         * Optional custom component rendered when a search yields zero results.
         */
        emptyComponent?: ReactNode;
    }

    // Internal Types for Virtualization
    export type ListItem =
        | { type: 'header'; id: string; title: string; length: number; offset: number }
        | { type: 'row'; id: string; data: Emoji[]; length: number; offset: number };

    export interface CategoryPage {
        category: string;
        rows: ListItem[];
    }

    export const LightTheme: CustomTheme;
    export const DarkTheme: CustomTheme;
    export const EmojiContainer: ComponentType<EmojiContainerProps>;
}