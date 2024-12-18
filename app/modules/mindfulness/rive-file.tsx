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
import RiveAnimation from "./components/riveAnimation";
import { LinearGradient } from "expo-linear-gradient";
import { Send } from "lucide-react";
import { BlurView } from 'expo-blur';
import { wp, hp, normalize } from '@/utils/dimensions';


const VisualMindfulness: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const { width } = Dimensions.get("window");

  const handleAudioPress = () => {
    // Handle audio playback
  };

  const handleTextSubmit = () => {
    if (inputText.trim()) {
      // setIsInputDisabled(true);
      setSubmittedText(inputText.trim());
      setInputText("");
      // const trimmedText = inputText.trim();
      // setSubmittedText(trimmedText);
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
          <LinearGradient
            colors={['#FEF6E4','#F8F9FA', '#E3F2FD', '#87CEFA']}
            style={styles.gradientContainer}
            locations={[0, 0.3, 0.5, 1]}
          />
          <ThemedText style={styles.heading}>Imagine your thoughts as clouds. Write what’s on your mind below.</ThemedText>
          <View style={styles.animationWrapper}>
            <View style={[styles.ghostCard, styles.thirdCard]} />
            <View style={[styles.ghostCard, styles.secondCard]} />
            <View style={[styles.ghostCard, styles.firstCard]} />

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
                  onTextChange={setSubmittedText}
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
                  editable={!isInputDisabled}
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleTextSubmit}
                  disabled={!inputText.trim()}
                >
                  <Ionicons name="send" size={18} color="#FFFFFF" />
                </TouchableOpacity>
                <ThemedText style={styles.description}>
                Your thoughts become clouds. Try it!
                </ThemedText>
              </View>
            </View>
          </View>


        </View>
      </ScrollView>

      {/* <LinearGradient
            colors={["rgba(249, 241, 216, 0)", "#f9f1d8"]}
            style={styles.bottomGradient}
          /> */}
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
    // right: 6,
    // top: 6,
    // padding: 8,

    padding: wp(2),

    right: wp(1.5),
    top: hp(1),
    backgroundColor: "#87CEFA",
    borderRadius: 100,
    zIndex: 1,
  },
  gradientContainer: {
    position: 'absolute',
    // top: -20,
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
    // minHeight: '100%',
  },

  header: {
    // padding: 20,
    padding: wp(5),
    paddingBottom: 0,
    flexDirection: "row",
    alignItems: "center",
    // gap: 50,
    gap: wp(12),

  },
  iconContainer: {
    // width: 60,
    // height: 60,
    width: wp(16),
    height: wp(16),
    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEECBA",
    borderRadius: wp(3),
    // borderRadius: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 20,
  },

  title: {
    // fontSize: 28,
    fontSize: normalize(28),

    fontFamily: "LexendDeca-Bold",
    letterSpacing: -0.42,
    color: "#2F3336",
  },

  progressBarContainer: {
    // paddingHorizontal: 24,
    // paddingVertical: 16,
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
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

  content: {
    // padding: 20,
    // gap: 12,
    // paddingBottom: 40,
    padding: wp(5),
    gap: hp(1.5),
    paddingBottom: hp(5),
    position: "relative",
    flex: 1,
    // minHeight: '100%',
  },

  disabledInput: {
    backgroundColor: "#F5F5F5",
    color: "#999",
  },
  animationWrapper: {
    width: "100%",
    position: "relative",
    paddingTop: 0,
    // height: 270,
    alignItems: "center",
  },
  ghostCard: {
    position: "absolute",
    width: "80%",
    maxWidth: 400,
    height: 250,
    // backgroundColor: "#46E9FF",
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
    // maxWidth: 400,
    height: 250,
    justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal: 0,
    borderRadius: 16,
    // backgroundColor: "#46E9FF",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 4,
    elevation: 50,
    // zIndex: 4,
    // transform: [{ scale: 1 }],
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
    // fontSize: 18,
    fontSize: normalize(18),

    fontFamily: "LexendDeca-Bold",
    // lineHeight: 25,
    lineHeight: hp(3),

    letterSpacing: -0.42,
    color: "#2F3336",
    textAlign: "center",
    // marginBottom: 0,
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
    // gap: 20,
    // paddingVertical: 20,
    gap: wp(5),
    paddingVertical: hp(2.5),
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F4F4FF",
    zIndex: 2,
  },
  iconButton: {
    // width: 50,
    // height: 50,
    width: wp(12),
    height: wp(12),
    backgroundColor: "#FEECBA",
    // borderRadius: 25,
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
    // fontSize: 16,
    // fontFamily: "LexendDeca-Regular",
    // lineHeight: 24,
    // color: "#8E8E8E",
    // textAlign: "center",
    // marginTop: 12,
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
    // borderRadius: 100,
    // padding: 12,
    // paddingRight: 50,
    // fontSize: 16,
    // fontFamily: "LexendDeca-Regular",
    // color: "#2F3336",
    // minHeight: 48,
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

  blurContainer: {
    // width: "75%",
    // maxWidth: 400,
    // height: 250,
    // borderRadius: 16,
    width: wp(75),
    maxWidth: 400,
    height: hp(30),
    borderRadius: wp(4),
    overflow: 'hidden',
    zIndex: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: hp(1),
      // height: 8,
    },
    shadowOpacity: 0.15,
    // shadowRadius: 12,
    shadowRadius: wp(3),

    elevation: 2,
    // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight white background
    // borderWidth: 1,
    // borderColor: 'rgba(255, 255, 255, 0.8)', // Subtle border
    transform: [
      { perspective: 1000 },
      { translateY: hp(2.5) },

      // { translateY: 20 }, // Slight lift
    ],
  },

  // animationContainer: {
  //   width: "100%",
  //   height: "100%",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   // backgroundColor: "rgba(70, 233, 255, 0.85)", // Slightly transparent version of #46E9FF
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 4,
  //   },
  //   shadowOpacity: 0.15,
  //   shadowRadius: 4,
  //   elevation: 5,
  //   position: "relative",
  // },
});
