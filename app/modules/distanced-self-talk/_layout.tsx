import { Stack } from "expo-router";

export default function DistancedSelfTalkLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="two-way"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="exercise"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
