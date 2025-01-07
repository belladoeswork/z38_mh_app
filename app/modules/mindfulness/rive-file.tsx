import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path, Rect } from "react-native-svg";
import RiveAnimation from "./components/riveAnimation";
import { LinearGradient } from "expo-linear-gradient";
import { Send } from "lucide-react";
import { BlurView } from "expo-blur";
import { wp, hp, normalize } from "@/utils/dimensions";
import { motion, AnimatePresence } from "framer-motion";

const VisualMindfulness: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showGuidance, setShowGuidance] = useState(true);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const isLastPage = true;
  const { width } = Dimensions.get("window");

  const handleAudioPress = () => {
    // Handle audio playback
  };

  const handleTextSubmit = useCallback(() => {
    if (inputText.trim()) {
      setIsAnimating(true);
      setSubmittedText(inputText.trim());
      setInputText("");
      setShowGuidance(false);
    }
  }, [inputText]);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
    setSubmittedText("");
  }, []);

  // const handleNextPress = () => {
  //   if (selectedOption) {
  //     console.log("Selected option:", selectedOption);
  //   }
  // };
  const handleNextPress = () => {
    console.log("Next button pressed");
    setShowCongratulations(true);
  };

  const handleSaveForLater = () => {
    router.back();
  };

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
  };

  const CongratulationsModal = () => (
    <Modal transparent visible={showCongratulations} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Module Completed!</ThemedText>
            <TouchableOpacity
              onPress={() => setShowCongratulations(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <ThemedText style={styles.modalText}>Congratulations!</ThemedText>
          <TouchableOpacity
            style={styles.nextModuleButton}
            onPress={() => {
              setShowCongratulations(false);
              router.push("/(tabs)/explore");
            }}
          >
            <ThemedText style={styles.nextModuleButtonText}>
              Next Module
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <LinearGradient
        colors={["#FEF6E4", "#F8F9FA", "#E3F2FD", "#87CEFA"]}
        style={styles.gradientContainer}
        locations={[0, 0.3, 0.5, 1]}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Svg width={32} height={32} viewBox="0 0 38 32" fill="none">
                <Path
                  d="M9.84005 11.1665H10.667L10.8223 10.3542C11.7896 5.29431 16.2492 1.49939 21.2901 1.49939C27.0081 1.49939 31.7401 6.41378 31.7401 12.5832V15V15.6884L32.3831 15.9341C34.5912 16.7779 36.3201 19.4537 36.3201 22.2503C36.3201 25.7613 33.6491 28.5006 30.4501 28.5006H9.84005C5.40442 28.5006 1.68005 24.6496 1.68005 19.8335C1.68005 15.0175 5.40442 11.1665 9.84005 11.1665Z"
                  stroke="#2F3336"
                  strokeWidth="2"
                  fill="white"
                />
              </Svg>
            </View>
            <ThemedText style={styles.title}>Mindfulness</ThemedText>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
          <View style={styles.content}>
            {/* <AnimatePresence>
              {showGuidance && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                > */}
            <ThemedText style={styles.heading}>
              Imagine your thoughts as clouds. Write what’s on your mind below.
            </ThemedText>
            {/* </motion.div>
              )}
            </AnimatePresence> */}
            <View style={styles.animationWrapper}>
              <BlurView intensity={10} style={styles.blurContainer}>
                <View style={styles.animationContainer}>
                  <RiveAnimation
                    resourceName="z38_clouds_live"
                    artboardName="Artboard 4"
                    stateMachineName="State Machine 1"
                    style={styles.riveAnimation}
                    width={width}
                    height={250}
                    textValue={submittedText}
                    onAnimationComplete={handleAnimationComplete}
                  />
                </View>
              </BlurView>
            </View>

            <View style={styles.bottomContent}>
              <View style={styles.textContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[
                      styles.textInput,
                      isInputDisabled && styles.disabledInput,
                    ]}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="What's on your mind?"
                    placeholderTextColor="#A1A1A1"
                    multiline={false}
                    returnKeyType="done"
                    onSubmitEditing={handleTextSubmit}
                    onEndEditing={handleTextSubmit}
                    editable={!isAnimating}
                    maxLength={4}
                    accessibilityLabel="Enter your thought"
                    accessibilityHint="Type a thought to see it float away in a cloud"
                  />
                  <TouchableOpacity
                    style={[
                      styles.sendButton,
                      !inputText.trim() && styles.sendButtonDisabled,
                    ]}
                    onPress={handleTextSubmit}
                    disabled={!inputText.trim() || isAnimating}
                    accessibilityLabel="Send thought"
                  >
                    <Ionicons
                      name="send"
                      size={18}
                      color={inputText.trim() ? "#FFFFFF" : "#CCCCCC"}
                    />
                  </TouchableOpacity>
                  <ThemedText style={styles.description}>
                    Your thoughts become clouds. Try it!
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveForLater}
        >
          <ThemedText style={styles.saveButtonText}>Save for Later</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleAudioPress}>
          <Ionicons name="volume-medium" size={24} color="#2F3336" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleNextPress}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color="#2F3336"
          />
        </TouchableOpacity>
      </View>
      <CongratulationsModal />
    </ThemedView>
  );
};

export default VisualMindfulness;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
  },
  sendButton: {
    position: "absolute",
    padding: wp(2),
    right: wp(1.5),
    top: hp(1),
    backgroundColor: "#87CEFA",
    borderRadius: 100,
    zIndex: 1,
  },
  gradientContainer: {
    position: "absolute",
    top: -hp(3),
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  header: {
    padding: wp(5),
    paddingBottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: wp(12),
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    width: wp(16),
    height: wp(16),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEECBA",
    borderRadius: wp(3),
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 20,
  },

  title: {
    fontSize: normalize(28),
    fontFamily: "LexendDeca-Bold",
    letterSpacing: -0.42,
    color: "#2F3336",
  },

  progressBarContainer: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    backgroundColor: "#FFFFFF",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#f9f1d8",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FEECBA",
    borderRadius: 2,
  },
  keyboardAvoid: {
    flex: 1,
  },

  content: {
    padding: wp(5),
    gap: hp(1.5),
    paddingBottom: hp(5),
    position: "relative",
    flex: 1,
  },

  disabledInput: {
    backgroundColor: "#F5F5F5",
    color: "#999",
  },
  animationWrapper: {
    width: "100%",
    position: "relative",
    paddingTop: 0,
    alignItems: "center",
  },
  ghostCard: {
    position: "absolute",
    width: "80%",
    maxWidth: 400,
    height: 250,
    borderRadius: 16,
    alignSelf: "center",
    opacity: 0.08,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  thirdCard: {
    transform: [{ scale: 0.8 }],
    top: 5,
    zIndex: 1,
    opacity: 0.04,
  },
  secondCard: {
    transform: [{ scale: 0.85 }],
    top: 0,
    zIndex: 2,
    opacity: 0.06,
  },
  firstCard: {
    transform: [{ scale: 0.9 }],
    top: -5,
    zIndex: 3,
    opacity: 0.08,
  },
  animationContainer: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    borderRadius: 16,
    elevation: 50,
    position: "relative",
  },
  bottomContent: {
    marginTop: 10,
    paddingBottom: 40,
    padding: 20,
    alignItems: "center",
  },
  heading: {
    flex: 1,
    justifyContent: "center",
    fontSize: normalize(18),
    fontFamily: "LexendDeca-Bold",
    lineHeight: hp(3),
    letterSpacing: -0.42,
    color: "#2F3336",
    textAlign: "center",
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
    borderRadius: wp(8),
    backgroundColor: "#FEECBA",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.7),
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: "LexendDeca-Regular",
    letterSpacing: -0.27,
    color: "#2F3336",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(3.5),
    gap: wp(5),
    backgroundColor: "#FFFFFF",
    borderTopWidth: 2,
    borderTopColor: "#F4F4FF",
    zIndex: 2,
  },
  iconButton: {
    width: wp(12),
    height: wp(12),
    backgroundColor: "#FEECBA",
    borderRadius: wp(6),
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#F5F5F5",
  },
  riveAnimation: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  textContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },

  description: {
    fontSize: normalize(16),
    fontFamily: "LexendDeca-Regular",
    lineHeight: hp(3),
    color: "#8E8E8E",
    textAlign: "center",
    marginTop: hp(1.5),
  },
  textInput: {
    backgroundColor: "#E3F2FD",
    borderWidth: 1,
    borderColor: "#F8F9FA",
    borderRadius: wp(25),
    padding: wp(3),
    paddingRight: wp(12),
    fontSize: normalize(16),
    fontFamily: "LexendDeca-Regular",
    color: "#2F3336",
    minHeight: hp(6),
    textAlign: "left",
  },

  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1,
    pointerEvents: "none",
  },

  bottomGradient: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
    height: 500,
    zIndex: 1,
    pointerEvents: "none",
  },

  headerBottomGradient: {
    height: 40,
    width: "100%",
    marginTop: -20,
    zIndex: 1,
  },
  sendButtonDisabled: {
    backgroundColor: "#E3E3E3",
  },

  blurContainer: {
    width: wp(75),
    maxWidth: 400,
    height: hp(30),
    borderRadius: wp(4),
    overflow: "hidden",
    zIndex: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: hp(1),
    },
    shadowOpacity: 0.15,
    shadowRadius: wp(3),
    elevation: 2,
    transform: [{ perspective: 1000 }, { translateY: hp(2.5) }],
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "transparent",
    borderRadius: wp(1),
    padding: wp(4),
    width: wp(80),
    maxWidth: 400,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: hp(1),
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: wp(3),
    // elevation: 5,
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(3),
  },
  modalTitle: {
    fontSize: normalize(18),
    fontFamily: "LexendDeca-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    flex: 1,
    // marginBottom: hp(2),
  },
  modalText: {
    fontSize: normalize(18),
    fontFamily: "LexendDeca-Regular",
    color: "#8E8E8E",
    marginBottom: hp(3),
    textAlign: "center",
  },
  modalBody: {
    width: "100%",
    alignItems: "center",
  },
  nextModuleButton: {
    backgroundColor: "#FEECBA",
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    width: "70%",
  },
  nextModuleButtonText: {
    fontSize: normalize(14),
    fontFamily: "LexendDeca-Regular",
    color: "#2F3336",
    textAlign: "center",
  },
  closeButton: {
    // padding: wp(2),
    position: "absolute",
    color: "#FEECBA",
    right: 0,
    top: 0,
  },
});
