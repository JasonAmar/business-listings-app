import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <View style={styles.searchContainer}>
    <Ionicons
      name='search'
      size={20}
      color='#64748b'
      style={styles.searchIcon}
    />
    <TextInput
      style={styles.searchInput}
      placeholder='Search businesses...'
      value={value}
      onChangeText={onChange}
      placeholderTextColor='#94a3b8'
      clearButtonMode='while-editing'
    />
  </View>
);

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#334155',
  },
});
