import React from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path, Rect } from "react-native-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';
import { normalize } from '@/utils/responsive';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MoodScreen: React.FC = () => {
  const handleMoodSelect = (mood: string) => {
    router.push({
      pathname: "/modules/mood/[mood]",
      params: { mood }
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <LinearGradient
        colors={['#FFFFFF', '#E3F2FD']}
        style={styles.backgroundGradient}
      />
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Svg width={60} height={60} viewBox="0 0 60 60" fill="none">
                <Rect width="60" height="60" rx="12" fill="#D6D0FD" />
                <Path
                  d="M17.25 22.1C19.7 22.1 22.05 20.85 23.45 18.8C26 17.5 27.6 14.9 27.6 12.1C27.6 7.95001 24.2 4.55001 20.05 4.50001C19.7 4.50001 19.35 4.50001 19 4.55001C17.75 2.00001 15.15 0.350006 12.25 0.350006C8.89997 0.350006 5.94997 2.60001 5.04997 5.80001C2.24998 6.95001 0.399975 9.65001 0.399975 12.75C0.399975 16.9 3.74998 20.25 7.89997 20.25C9.14997 20.25 10.35 19.95 11.45 19.35C12.9 21.05 15 22.05 17.25 22.1Z"
                  fill="#2F3336"
                  transform="translate(16, 14)"
                />
              </Svg>
            </View>
            <ThemedText style={styles.title}>How Do You Feel Right Now?</ThemedText>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <View style={styles.moodGrid}>
            <TouchableOpacity
              style={[styles.moodButton, { backgroundColor: '#FEDDDE' }]}
              onPress={() => handleMoodSelect('high-unpleasant')}
            >
              <ThemedText style={styles.moodButtonText}>
                High Energy,{'\n'}Unpleasant
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.moodButton, { backgroundColor: '#FFEFC7' }]}
              onPress={() => handleMoodSelect('high-pleasant')}
            >
              <ThemedText style={styles.moodButtonText}>
                High Energy,{'\n'}Pleasant
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.moodButton, { backgroundColor: '#D8E5FF' }]}
              onPress={() => handleMoodSelect('low-unpleasant')}
            >
              <ThemedText style={styles.moodButtonText}>
                Low Energy,{'\n'}Unpleasant
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.moodButton, { backgroundColor: '#CFEFE7' }]}
              onPress={() => handleMoodSelect('low-pleasant')}
            >
              <ThemedText style={styles.moodButtonText}>
                Low Energy,{'\n'}Pleasant
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    minHeight: SCREEN_HEIGHT,
  },
  contentContainer: {
    flex: 1,
    minHeight: SCREEN_HEIGHT,
  },
  header: {
    padding: wp(5),
    paddingBottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: wp(12),
  },
  iconContainer: {
    width: wp(15),
    height: wp(15),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: normalize(28),
    fontFamily: "LexendDeca-Bold",
    letterSpacing: -0.15,
    color: "#2F3336",
    flex: 1,
    lineHeight: hp(4.5),
  },
  progressBarContainer: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
  },
  progressBar: {
    height: hp(0.5),
    backgroundColor: "#F4F4F4",
    borderRadius: wp(0.5),
  },
  progressFill: {
    height: "100%",
    width: "33%",
    backgroundColor: "#D6D0FD",
    borderRadius: wp(0.5),
  },
  moodGrid: {
    padding: wp(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(3.5),
    flex: 1,
    paddingBottom: hp(10),
    justifyContent: 'space-between',
  },
  moodButton: {
    width: wp(43),
    aspectRatio: 1,
    borderRadius: wp(3),
    padding: wp(5),
    justifyContent: 'center',
  },
  moodButtonText: {
    fontSize: normalize(18),
    fontFamily: "LexendDeca-Medium",
    color: "#2F3336",
    textAlign: 'center',
  },
});

export default MoodScreen;
