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
        name="how"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="rive-file"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
