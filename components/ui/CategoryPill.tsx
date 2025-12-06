import { Colors } from '@/constants/theme';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CategoryPillProps = {
  label: string;
  isSelected: boolean;
  onPress: (label: string) => void;
};

const CategoryPill = ({ label, isSelected, onPress }: CategoryPillProps) => (
  <TouchableOpacity
    style={[styles.pill, isSelected && styles.pillSelected]}
    onPress={() => onPress(label)}
  >
    <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default CategoryPill;

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
  },
  pillSelected: {
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  pillText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  pillTextSelected: {
    color: '#ffffff',
  },
});
