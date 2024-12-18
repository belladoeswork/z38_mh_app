import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// modules data
const modules = [
  {
    id: 'distanced-self-talk',
    title: 'Distanced Self-Talk',
    description: 'Learn techniques for emotional regulation through self-talk',
    icon: 'person.wave.2' as const,
  },
  {
    id: 'mood',
    title: 'How Do You Feel Right Now?',
    description: 'Tab the color that best describes how you feel right now', 
    icon: 'face.smiling.inverse' as const,
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness',
    description: 'How practicing mindfulness can improve your mental health.',
    icon: 'face.smiling.inverse' as const,
  },
  //  more modules
];

export default function ExploreScreen() {
  const handleModulePress = (moduleId: string) => {
    switch (moduleId) {
      case 'distanced-self-talk':
        router.push('/modules/distanced-self-talk');
        break;
        case 'mood':
          router.push('/modules/mood');
        break;
      case 'mindfulness':
        router.push('/modules/mindfulness');
        break;
      default:
        console.warn('Unknown module ID:', moduleId);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore Modules</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.modulesContainer}>
        {modules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={styles.moduleCard}
            onPress={() => handleModulePress(module.id)}>
            <ThemedView style={styles.moduleHeader}>
              <IconSymbol size={24} name={module.icon} color="#2F3336" />
              <ThemedText type="defaultSemiBold" style={styles.moduleTitle}>
                {module.title}
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.moduleDescription}>
              {module.description}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  modulesContainer: {
    gap: 16,
    padding: 16,
  },
  moduleCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  moduleTitle: {
    fontSize: 18,
    color: '#2F3336',
  },
  moduleDescription: {
    fontSize: 14,
    color: '#666666',
  },
});
