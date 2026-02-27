import { type CustomTheme } from '../types';

export const LightTheme: CustomTheme = {
    background: '#FFFFFF',
    text: '#111B21',
    categoryIndicator: '#007AFF',
    categoryIconActive: '#007AFF',
    categoryIconInactive: '#8E8E93',
    searchBackground: '#F2F2F7',
    searchPlaceholder: '#8E8E93',
    searchIcon: '#8E8E93',
    divider: '#E5E5EA',
};

export const DarkTheme: CustomTheme = {
    background: '#1C1C1E',
    text: '#FFFFFF',
    categoryIndicator: '#0A84FF',
    categoryIconActive: '#0A84FF',
    categoryIconInactive: '#8E8E93',
    searchBackground: '#2C2C2E',
    searchPlaceholder: '#8E8E93',
    searchIcon: '#8E8E93',
    divider: '#38383A',
};

export const getTheme = (themeProp?: Partial<CustomTheme> | 'light' | 'dark'): CustomTheme => {
    if (themeProp === 'dark') return DarkTheme;
    if (themeProp === 'light') return LightTheme;
    if (typeof themeProp === 'object') return { ...LightTheme, ...themeProp };
    return LightTheme;
};