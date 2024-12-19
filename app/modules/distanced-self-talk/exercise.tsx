import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path, Rect } from "react-native-svg";
import RiveAnimation from "./components/RiveAnimation";

const VisualSelfDistancingScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [showDescription, setShowDescription] = useState(true);
  const [showTextInput, setShowTextInput] = useState(false);

  const { width } = Dimensions.get("window");

  const handleAudioPress = () => {
    // Handle audio playback
  };

  const handleTextSubmit = () => {
    if (inputText.trim()) {
      const trimmedText = inputText.trim();
      setInputText(trimmedText);
      setSubmittedText(trimmedText);
    }
  };

  const handleNextPress = () => {
    if (selectedOption) {
      console.log("Selected option:", selectedOption);
    }
  };

  const handleSaveForLater = () => {
    router.back();
  };

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Svg width={60} height={60} viewBox="0 0 60 60" fill="none">
              <Rect width="60" height="60" rx="12" fill="#D6D0FD" />
              <Path
                d="M17.25 22.1C19.7 22.1 22.05 20.85 23.45 18.8C26 17.5 27.6 14.9 27.6 12.1C27.6 7.95001 24.2 4.55001 20.05 4.50001C19.7 4.50001 19.35 4.50001 19 4.55001C17.75 2.00001 15.15 0.350006 12.25 0.350006C8.89997 0.350006 5.94997 2.60001 5.04997 5.80001C2.24998 6.95001 0.399975 9.65001 0.399975 12.75C0.399975 16.9 3.74998 20.25 7.89997 20.25C9.14997 20.25 10.35 19.95 11.45 19.35C12.9 21.05 15 22.05 17.25 22.1ZM20.05 6.75001C22.95 6.80001 25.35 9.15001 25.35 12.1C25.35 14.15 24.1 16.05 22.25 16.9C22.05 17 21.9 17.15 21.75 17.35C20.8 18.9 19.1 19.85 17.3 19.85C15.45 19.8 13.75 18.85 12.75 17.3C12.6 17.05 12.3 16.85 12 16.8C11.7 16.75 11.35 16.8 11.1 17C10.15 17.7 9.04997 18.1 7.89997 18.1C4.99998 18.1 2.64997 15.75 2.64997 12.85C2.64997 10.5 4.14997 8.50001 6.34998 7.80001C6.74998 7.70001 7.04998 7.35001 7.09998 6.95001C7.59998 4.50001 9.74998 2.70001 12.25 2.70001C14.5 2.70001 16.5 4.15001 17.25 6.30001C17.45 6.85001 18.05 7.20001 18.6 7.05001C19.1 6.80001 19.6 6.75001 20.05 6.75001ZM9.64997 28C11.45 28 12.95 26.5 12.95 24.7C12.95 22.9 11.45 21.4 9.64997 21.4C7.84998 21.4 6.34998 22.9 6.34998 24.7C6.34998 26.5 7.79997 28 9.64997 28ZM9.64997 23.65C10.25 23.65 10.7 24.1 10.7 24.7C10.7 25.3 10.25 25.75 9.64997 25.75C9.04997 25.75 8.59998 25.3 8.59998 24.7C8.54998 24.1 9.04997 23.65 9.64997 23.65ZM3.69998 31.65C5.19998 31.65 6.39997 30.45 6.39997 28.95C6.39997 27.45 5.19998 26.25 3.69998 26.25C2.94998 26.25 2.24998 26.55 1.74998 27.05C1.24998 27.55 0.999975 28.25 0.999975 29V29.1C1.09998 30.5 2.24998 31.65 3.69998 31.65ZM3.69998 28.5C3.94998 28.5 4.14997 28.7 4.14997 28.95C4.14997 29.2 3.94998 29.4 3.69998 29.4C3.44998 29.4 3.29997 29.2 3.24998 28.95C3.24998 28.8 3.29998 28.75 3.34998 28.7C3.39997 28.6 3.54998 28.5 3.69998 28.5Z"
                fill="#2F3336"
                transform="translate(16, 14)"
              />
            </Svg>
          </View>
          <ThemedText style={styles.title}>Distanced{"\n"}Self-Talk</ThemedText>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.heading}>
            Exercise: Visual self-distancing
          </ThemedText>

          <View style={styles.animationWrapper}>
            <View style={styles.animationContainer}>
              {showDescription && (
                <View style={styles.descriptionContainer}>
                  <ThemedText style={styles.description}>
                    What moment do you wanna do this exercise on:
                  </ThemedText>
                </View>)}
              <RiveAnimation
                resourceName="z38_slider"
                artboardName="Artboard 3"
                stateMachineName="State Machine 1"
                style={styles.riveAnimation}
                width={width}
                height={400}
                textValue={submittedText}
                onTextChange={setSubmittedText}
                onButtonPress={() => {
                  setShowDescription(false);
                  setShowTextInput(true);
                }}
              />
            </View>


            {showTextInput && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="text..."
                  placeholderTextColor="#999"
                  multiline={false}
                  returnKeyType="done"
                  onSubmitEditing={handleTextSubmit}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleAudioPress}>
          <Ionicons name="volume-medium" size={24} color="#2F3336" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, !selectedOption && styles.disabledButton]}
          onPress={handleNextPress}
          disabled={!selectedOption}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={selectedOption ? "#2F3336" : "#CCCCCC"}
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default VisualSelfDistancingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "LexendDeca-Bold",
    letterSpacing: -0.42,
    color: "#2F3336",
  },
  progressBarContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    height: 60,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#F4F4F4",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    width: "100%",
    backgroundColor: "#D6D0FD",
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
    letterSpacing: -0.42,
    color: "#2F3336",
  },
  animationWrapper: {
    width: "100%",
    gap: 16, // Space between text and animation
  },
  descriptionContainer: {
    position: 'absolute',
    top: '65%',
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 18,
    fontFamily: "LexendDeca-Regular",
    lineHeight: 38,
    letterSpacing: -0.27,
    color: "#2F3336",
    // marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: "#E6E6FF",
    borderWidth: 2,
    borderColor: "#A5A6F6",
  },
  optionText: {
    fontSize: 18,
    fontFamily: "LexendDeca-Regular",
    letterSpacing: -0.27,
    color: "#2F3336",
  },
  saveButton: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#A5A6F6",
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: "LexendDeca-Regular",
    letterSpacing: -0.27,
    color: "#A5A6F6",
    textAlign: "center",
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
    backgroundColor: "#D6D0FD",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#F5F5F5",
  },
  animationContainer: {
    width: "100%",
    height: 400,
    marginVertical: 20,
    justifyContent: "center", //
    alignItems: "center", //
  },
  riveAnimation: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    position: "absolute",
    zIndex: 1,
    top: "56%",
    left: "50%",
    transform: [{ translateX: -10 }], 
    width: 70,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    fontFamily: "LexendDeca-Regular",
    color: "#2F3336",
    minHeight: 40,
    width: "100%",
    textAlign: "center",
  },
});
