import { Stack } from 'expo-router';

export default function MoodLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[mood]" options={{ headerShown: false }} />
      <Stack.Screen name="final/[selectedMood]" options={{ headerShown: false }} />
    </Stack>
  );
} 