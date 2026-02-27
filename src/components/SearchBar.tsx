import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type TextInputProps,
} from 'react-native';
import debounce from 'lodash.debounce';
import { type CustomTheme } from '../types';

interface SearchBarProps {
  theme: CustomTheme;
  placeholder: string;
  onSearch: (query: string) => void;
  searchContainerStyle?: StyleProp<ViewStyle>;
  searchInputStyle?: StyleProp<TextStyle>;
  searchProps?: TextInputProps;
}

export const SearchBar = React.memo(
  ({
    theme,
    placeholder,
    onSearch,
    searchContainerStyle,
    searchInputStyle,
    searchProps,
  }: SearchBarProps) => {
    const [localValue, setLocalValue] = useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
      debounce((text: string) => onSearch(text), 300),
      [onSearch]
    );

    useEffect(() => {
      debouncedSearch(localValue);
      return debouncedSearch.cancel;
    }, [localValue, debouncedSearch]);

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.background },
          searchContainerStyle,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.searchBackground, color: theme.text },
            searchInputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.searchPlaceholder}
          value={localValue}
          onChangeText={setLocalValue}
          autoCorrect={false}
          clearButtonMode="while-editing"
          {...searchProps}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: { height: 38, borderRadius: 10, paddingHorizontal: 12, fontSize: 16 },
});
