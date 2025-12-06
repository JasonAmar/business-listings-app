import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import CategoryPill from '@/components/ui/CategoryPill';
import { TEN_ENTRIES } from '@/constants/tenEntries';
import { Colors } from '@/constants/theme';
import useStorage from '@/hooks/use-storage';

const CreateListingScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [hasError, setHasError] = useState(false);
  const { addBusinesses } = useStorage();

  // Pre-defined categories for better UX (acting as "Dropdown")
  const PRESET_CATEGORIES = [
    'Retail',
    'Food & Drink',
    'Service',
    'Technology',
    'Health',
  ];

  const handleSave = () => {
    // Basic validation
    if (!name.trim() || !category.trim() || !description.trim()) {
      Alert.alert(
        'Missing Fields',
        'Please fill out all fields to list your business.'
      );
      setHasError(true);
      return;
    }

    addBusinesses({ name, category, description });
    Toast.show({
      type: 'success',
      text1: 'Business Added Successfully!',
      text2: `${name} has been added to the list`,
    });
    router.dismissTo('/');
  };

  const handleSave10 = () => {
    addBusinesses(...TEN_ENTRIES);
    router.dismissTo('/');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screenContainer}
    >
      <ScrollView>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => router.dismissTo('/')}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>New Listing</Text>
          <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
            <Text style={[styles.headerButtonText, styles.primaryText]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Joe's Coffee"
            value={name}
            onBlur={() => {
              return name;
            }}
            onChangeText={setName}
          />
          {!name.trim() && hasError && (
            <Text style={styles.error}>Name cannot be empty</Text>
          )}

          <Text style={styles.label}>Category</Text>
          <View style={styles.pillsContainer}>
            {PRESET_CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat}
                label={cat}
                isSelected={category === cat}
                onPress={setCategory}
              />
            ))}
          </View>
          {/* Fallback for custom categories */}
          <TextInput
            style={[styles.input, { marginTop: 8 }]}
            placeholder='Or type a custom category...'
            value={category}
            onChangeText={setCategory}
          />
          {!category.trim() && hasError && (
            <Text style={styles.error}>Category cannot be empty</Text>
          )}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder='Tell us what makes your business great...'
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical='top'
          />
          {!description.trim() && hasError && (
            <Text style={styles.error}>Description cannot be empty</Text>
          )}

          {
            //For demo only: Button to add 10 entries to storage right away
            false && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSave10}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Create 10 Listings</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateListingScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: Colors.CARD_BG,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#64748b',
  },
  primaryText: {
    color: Colors.PRIMARY_COLOR,
    fontWeight: '600',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.CARD_BG,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  textArea: {
    height: 120,
  },
  error: {
    color: 'red',
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: 8,
    padding: 14,
    marginTop: 24,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
