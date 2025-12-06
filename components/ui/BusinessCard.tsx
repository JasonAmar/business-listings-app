import { Colors } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

type BusinessCardItem = {
  name: string;
  category: string;
  description: string;
};

const BusinessCard = ({ item }: { item: BusinessCardItem }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.category}</Text>
      </View>
    </View>
    <Text style={styles.cardDescription}>{item.description}</Text>
  </View>
);

export default BusinessCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Shadow (iOS)
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Shadow (Android)
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.PRIMARY_COLOR,
  },
  cardDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});
