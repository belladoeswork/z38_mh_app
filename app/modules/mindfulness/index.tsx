import React from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path, Rect } from "react-native-svg";
import SwipeableScreens from "./components/SwipeableScreens.native";

const Mindfulness: React.FC = () => {
  const handleAudioPress = () => {
    // TODO: Implement audio functionality
  };

  const handleNextPress = () => {
    router.push("/modules/mindfulness/how");
  };

  const handleSwipeLeft = () => {
    router.push("/modules/mindfulness/how");
  };

  const handleSwipeRight = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SwipeableScreens
        style={styles.swipeContainer}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Svg width={32} height={32} viewBox="0 0 38 32" fill="none">
                <Path
                  d="M9.84005 11.1665H10.667L10.8223 10.3542C11.7896 5.29431 16.2492 1.49939 21.2901 1.49939C27.0081 1.49939 31.7401 6.41378 31.7401 12.5832V15V15.6884L32.3831 15.9341C34.5912 16.7779 36.3201 19.4537 36.3201 22.2503C36.3201 25.7613 33.6491 28.5006 30.4501 28.5006H9.84005C5.40442 28.5006 1.68005 24.6496 1.68005 19.8335C1.68005 15.0175 5.40442 11.1665 9.84005 11.1665Z" fill="white"
                  stroke="#2F3336" stroke-width="2"
                />
              </Svg>
            </View>
            <ThemedText style={styles.title}>
              Mindfulness
            </ThemedText>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <View style={styles.content}>
            <ThemedText style={styles.heading}>
            How practicing mindfulness can improve your mental health.
            </ThemedText>

            <ThemedText style={styles.description}>
            Mindfulness is the practice of paying attention to the present moment with openness and without judgment. {"\n"} It helps you break free from automatic thoughts and reactions, creating space for healthier responses.
            </ThemedText>
          </View>
        </ScrollView>
      </SwipeableScreens>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleAudioPress}>
          <Ionicons name="volume-medium" size={24} color="#2F3336" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleNextPress}>
          <Ionicons name="arrow-forward" size={24} color="#2F3336" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default Mindfulness;

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 0,
    flexDirection: "row",
    alignItems: "center",
      gap: 50,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FEECBA",
      borderRadius: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "LexendDeca-Bold",
    letterSpacing: -0.15,
    color: "#2F3336",
    flex: 1,
    lineHeight: 38,
  },
  progressBarContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#f9f1d8",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    width: "33%", // make dynamic based on pages
    backgroundColor: "#FEECBA",
    borderRadius: 2,
  },
  content: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontFamily: "LexendDeca-Bold",
    lineHeight: 38,
    letterSpacing: -0.15,
    color: "#2F3336",
  },
  description: {
    fontSize: 18,
    fontFamily: "LexendDeca-Regular",
    lineHeight: 38,
    letterSpacing: -0.15,
    color: "#2F3336",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F4F4FF",
  },
  iconButton: {
    width: 50,
    height: 50,
    backgroundColor: "#FEECBA",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
