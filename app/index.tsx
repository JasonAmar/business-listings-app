import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BusinessCard from '@/components/ui/BusinessCard';
import SearchBar from '@/components/ui/SearchBar';
import { Colors } from '@/constants/theme';
import useStorage from '@/hooks/use-storage';
import { BusinessWithId } from '@/types';
import { useCallback, useState } from 'react';

const HomeScreen = () => {
  const router = useRouter();
  const { getAllBusinesses } = useStorage();
  const [listings, setListings] = useState<BusinessWithId[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      async function fetchItems() {
        setListings(await getAllBusinesses());
      }
      fetchItems();
    }, [getAllBusinesses])
  );

  const filtered =
    listings?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Local</Text>
        <Text style={styles.headerSubtitle}>
          Find great Canadian businesses
        </Text>
      </View>

      <View style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChange={(newSearchQuery) => setSearchQuery(newSearchQuery)}
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BusinessCard item={item} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name='storefront-outline' size={48} color='#cbd5e1' />
              <Text style={styles.emptyStateText}>
                {searchQuery ? 'No businesses found.' : 'No listings yet.'}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {searchQuery
                  ? 'Try a different search term.'
                  : 'Be the first to add one!'}
              </Text>
            </View>
          }
        />
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('./create')}
        activeOpacity={0.8}
      >
        <Ionicons name='add' size={30} color='#fff' />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 80, // Space for FAB
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
