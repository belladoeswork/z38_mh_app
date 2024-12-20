import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAnimatedScrollHandler } from "react-native-reanimated";
import { TextInput, PanResponder, Animated as RNAnimated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 45) / 3;
const GRID_ROWS = 5;
const GRID_COLS = 3;
const GAP = 5;
const SECTION_WIDTH = SCREEN_WIDTH - 30;
const SECTION_HEIGHT = (GRID_ITEM_WIDTH * GRID_ROWS) + (GAP * (GRID_ROWS - 1));

type MoodOption = {
  text: string;
  color: string;
  intensity: number;
};

const moodOptions: Record<string, MoodOption[]> = {
  "high-unpleasant": [
    { text: "Angry", color: "#FEDDDE", intensity: 100 },
    { text: "Frustrated", color: "#FEDDDE", intensity: 95 },
    { text: "Tense", color: "#FEDDDE", intensity: 90 },
    { text: "Stressed", color: "#FEDDDE", intensity: 85 },
    { text: "Annoyed", color: "#FEDDDE", intensity: 80 },
    { text: "Nervous", color: "#FEDDDE", intensity: 75 },
    { text: "Irritated", color: "#FEDDDE", intensity: 70 },
    { text: "Agitated", color: "#FEDDDE", intensity: 65 },
    { text: "Enraged", color: "#FEDDDE", intensity: 60 },
    { text: "Anxious", color: "#FEDDDE", intensity: 55 },
    { text: "Upset", color: "#FEDDDE", intensity: 50 },
    { text: "Distressed", color: "#FEDDDE", intensity: 45 },
    { text: "Furious", color: "#FEDDDE", intensity: 40 },
    { text: "Outraged", color: "#FEDDDE", intensity: 35 },
    { text: "Hostile", color: "#FEDDDE", intensity: 30 },
  ],
  "high-pleasant": [
    { text: "Excited", color: "#FFEFC7", intensity: 100 },
    { text: "Energetic", color: "#FFEFC7", intensity: 95 },
    { text: "Happy", color: "#FFEFC7", intensity: 90 },
    { text: "Joyful", color: "#FFEFC7", intensity: 85 },
    { text: "Motivated", color: "#FFEFC7", intensity: 80 },
    { text: "Inspired", color: "#FFEFC7", intensity: 75 },
    { text: "Enthusiastic", color: "#FFEFC7", intensity: 70 },
    { text: "Cheerful", color: "#FFEFC7", intensity: 65 },
    { text: "Delighted", color: "#FFEFC7", intensity: 60 },
    { text: "Thrilled", color: "#FFEFC7", intensity: 55 },
    { text: "Elated", color: "#FFEFC7", intensity: 50 },
    { text: "Upbeat", color: "#FFEFC7", intensity: 45 },
    { text: "Jubilant", color: "#FFEFC7", intensity: 40 },
    { text: "Ecstatic", color: "#FFEFC7", intensity: 35 },
    { text: "Radiant", color: "#FFEFC7", intensity: 30 },
  ],
  "low-unpleasant": [
    { text: "Sad", color: "#D8E5FF", intensity: 100 },
    { text: "Tired", color: "#D8E5FF", intensity: 95 },
    { text: "Bored", color: "#D8E5FF", intensity: 90 },
    { text: "Lonely", color: "#D8E5FF", intensity: 85 },
    { text: "Melancholic", color: "#D8E5FF", intensity: 80 },
    { text: "Exhausted", color: "#D8E5FF", intensity: 75 },
    { text: "Dismal", color: "#D8E5FF", intensity: 70 },
    { text: "Drained", color: "#D8E5FF", intensity: 65 },
    { text: "Gloomy", color: "#D8E5FF", intensity: 60 },
    { text: "Down", color: "#D8E5FF", intensity: 55 },
    { text: "Weary", color: "#D8E5FF", intensity: 50 },
    { text: "Dejected", color: "#D8E5FF", intensity: 45 },
    { text: "Hopeless", color: "#D8E5FF", intensity: 40 },
    { text: "Despondent", color: "#D8E5FF", intensity: 35 },
    { text: "Miserable", color: "#D8E5FF", intensity: 30 },
  ],
  "low-pleasant": [
    { text: "Calm", color: "#CFEFE7", intensity: 100 },
    { text: "Relaxed", color: "#CFEFE7", intensity: 95 },
    { text: "Peaceful", color: "#CFEFE7", intensity: 90 },
    { text: "Content", color: "#CFEFE7", intensity: 85 },
    { text: "Serene", color: "#CFEFE7", intensity: 80 },
    { text: "Tranquil", color: "#CFEFE7", intensity: 75 },
    { text: "At ease", color: "#CFEFE7", intensity: 70 },
    { text: "Mellow", color: "#CFEFE7", intensity: 65 },
    { text: "Composed", color: "#CFEFE7", intensity: 60 },
    { text: "Gentle", color: "#CFEFE7", intensity: 55 },
    { text: "Soothed", color: "#CFEFE7", intensity: 50 },
    { text: "Placid", color: "#CFEFE7", intensity: 45 },
    { text: "Restful", color: "#CFEFE7", intensity: 40 },
    { text: "Harmonious", color: "#CFEFE7", intensity: 35 },
    { text: "Balanced", color: "#CFEFE7", intensity: 30 },
  ],
};

const Mood: React.FC = () => {
  const { mood } = useLocalSearchParams<{ mood: string }>();
  const pan = useRef(new RNAnimated.ValueXY()).current;

  const [isSearchVisible, setIsSearchVisible] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const searchInputAnimation = useRef(new RNAnimated.Value(0)).current;

const toggleSearch = () => {
  if (isSearchVisible) {
    RNAnimated.timing(searchInputAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setIsSearchVisible(false);
      setSearchQuery("");
    });
  } else {
    setIsSearchVisible(true);
    RNAnimated.timing(searchInputAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }
};

const dismissSearch = () => {
  if (isSearchVisible) {
    RNAnimated.timing(searchInputAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setIsSearchVisible(false);
      setSearchQuery("");
    });
  }
};

  
  
const findMoodPosition = (searchText: string) => {
  for (const [key, options] of Object.entries(moodOptions)) {
    const moodIndex = options.findIndex(
      option => option.text.toLowerCase() === searchText.toLowerCase()
    );
    if (moodIndex !== -1) {
      return { quadrant: key, index: moodIndex };
    }
  }
  return null;
};
  
  
const handleSearch = (text: string) => {
  setSearchQuery(text);
  if (text) {
    const position = findMoodPosition(text);
    if (position) {
      const quadrantOrder = {
        'high-unpleasant': { x: 0, y: 0 },
        'high-pleasant': { x: -SECTION_WIDTH, y: 0 },
        'low-unpleasant': { x: 0, y: -SECTION_HEIGHT },
        'low-pleasant': { x: -SECTION_WIDTH, y: -SECTION_HEIGHT }
      };
      
      const targetPosition = quadrantOrder[position.quadrant as keyof typeof quadrantOrder];
      pan.stopAnimation();
      RNAnimated.spring(pan, {
        toValue: targetPosition,
        useNativeDriver: true,
        tension: 40,
        friction: 7
      }).start();
    }
  }
};
  
const renderMoodButton = (option: MoodOption, index: number, key: string) => {
  const isHighlighted = 
    searchQuery && 
    option.text.toLowerCase() === searchQuery.toLowerCase();

  return (
    <TouchableOpacity
      key={`${key}-${index}`}
      style={[
        styles.moodButton,
        {
          backgroundColor: option.color,
          opacity: option.intensity / 100,
        },
        isHighlighted && styles.highlightedMoodButton,
      ]}
      onPress={() => handleMoodSelect(option.text)}
    >
      <ThemedText 
        style={[
          styles.moodButtonText,
          isHighlighted && styles.highlightedMoodText
        ]}
      >
        {option.text}
      </ThemedText>
    </TouchableOpacity>
  );
};

  
const getFilteredMoodOptions = () => {
  if (!searchQuery) return null;
  
  const results: Array<{key: string, option: MoodOption}> = [];
  
  Object.entries(moodOptions).forEach(([key, options]) => {
    options.forEach(option => {
      if (option.text.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({key, option});
      }
    });
  });
  
  return results;
};
  
const renderSearchResults = () => {
  const filteredResults = getFilteredMoodOptions();
  
  if (!filteredResults || filteredResults.length === 0) {
    return (
      <View style={styles.searchResultsContainer}>
        <ThemedText style={styles.noResultsText}>No moods found</ThemedText>
      </View>
    );
  }
  return (
    <View style={styles.searchResultsContainer}>
      {filteredResults.map((result, index) => (
        <TouchableOpacity
          key={`search-${index}`}
          style={[
            styles.moodButton,
            styles.searchResultButton,
            {
              backgroundColor: result.option.color,
              opacity: result.option.intensity / 100,
            },
          ]}
          onPress={() => handleMoodSelect(result.option.text)}
        >
          <ThemedText style={styles.moodButtonText}>
            {result.option.text}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      // Handle scroll animations
    },
  });

  const handleBackPress = () => {
    router.push("/modules/mood");
  };



  const renderMoodSection = (moodKey: string, key: string) => (
    <View key={key} style={styles.colorSection}>
      {moodOptions[moodKey].map((option, index) =>
                renderMoodButton(option, index, key)
      )}
    </View>
  );

  useEffect(() => {
    if (mood) {
      const colorOrder = {
        "high-unpleasant": { x: 0, y: 0 },                    // Red (top-left)
        "high-pleasant": { x: -SECTION_WIDTH, y: 0 },         // Yellow (top-right)
        "low-unpleasant": { x: 0, y: -SECTION_HEIGHT },       // Blue (bottom-left)
        "low-pleasant": { x: -SECTION_WIDTH, y: -SECTION_HEIGHT }  // Green (bottom-right)
      };

      const position = colorOrder[mood as keyof typeof colorOrder];
      if (position) {
        pan.stopAnimation();
        pan.setValue(position);
      }
    }
  }, [mood]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.extractOffset();
      },
      onPanResponderMove: (_, gestureState) => {
        // Calculate the wrapped position for infinite scrolling
        const rawX = gestureState.dx;
        const rawY = gestureState.dy;
        
        // Wrap around logic for infinite scrolling
        const wrappedX = ((rawX % SECTION_WIDTH) + SECTION_WIDTH) % SECTION_WIDTH;
        const wrappedY = ((rawY % SECTION_HEIGHT) + SECTION_HEIGHT) % SECTION_HEIGHT;
        
        // Apply the wrapped position
        pan.setValue({
          x: wrappedX - SECTION_WIDTH / 2,
          y: wrappedY - SECTION_HEIGHT / 2
        });
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        
        if (Math.abs(gestureState.vx) > 0.5 || Math.abs(gestureState.vy) > 0.5) {
          RNAnimated.decay(pan, {
            velocity: { x: gestureState.vx, y: gestureState.vy },
            deceleration: 0.997,
            useNativeDriver: true,
          }).start(() => {
            // Get current values safely
            const currentX = Number(JSON.stringify(pan.x));
            const currentY = Number(JSON.stringify(pan.y));
            
            const wrappedX = ((currentX % SECTION_WIDTH) + SECTION_WIDTH) % SECTION_WIDTH;
            const wrappedY = ((currentY % SECTION_HEIGHT) + SECTION_HEIGHT) % SECTION_HEIGHT;
            
            pan.setValue({
              x: wrappedX - SECTION_WIDTH / 2,
              y: wrappedY - SECTION_HEIGHT / 2
            });
          });
        }
      }
    })
  ).current;


    const handleMoodSelect = async (selectedMood: string) => {

      try {
        if (Platform.OS === 'ios') {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          await Haptics.selectionAsync();
        }
      } catch (error) {
        console.log('Haptics not available');
      }
      router.push({
      pathname: "/modules/mood/final/[selectedMood]",
      params: { selectedMood },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      

      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={(e) => {
              e.stopPropagation();
              handleBackPress();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#2F3336" />
          </TouchableOpacity>
          
          <View style={styles.searchContainer}>
            <RNAnimated.View 
              style={[
                styles.searchInputContainer,
                {
                  width: searchInputAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, SCREEN_WIDTH - 120]
                  }),
                  opacity: searchInputAnimation
                }
              ]}
            >
              {isSearchVisible && (
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search mood..."
                  value={searchQuery}
                  onChangeText={handleSearch}
                  autoFocus
                  selectionColor="#2F3336"
                  cursorColor="#2F3336"
                  autoCapitalize="none"
                  autoCorrect={false}
                  // Stop the touch event from reaching the parent
                  onPressIn={(e) => e.stopPropagation()}
                />
              )}
            </RNAnimated.View>
            
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={(e) => {
                e.stopPropagation();
                toggleSearch();
              }}
            >
              <Ionicons 
                name={isSearchVisible ? "close" : "search"} 
                size={24} 
                color="#2F3336" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        activeOpacity={1} 
        style={StyleSheet.absoluteFill}
        onPress={dismissSearch}
      >
        <RNAnimated.View
          style={[
            styles.panContainer,
            {
              transform: [
                {
                  translateX: pan.x.interpolate({
                    inputRange: [-SECTION_WIDTH * 2, SECTION_WIDTH * 2],
                    outputRange: [-SECTION_WIDTH * 2, SECTION_WIDTH * 2],
                  })
                },
                {
                  translateY: pan.y.interpolate({
                    inputRange: [-SECTION_HEIGHT * 2, SECTION_HEIGHT * 2],
                    outputRange: [-SECTION_HEIGHT * 2, SECTION_HEIGHT * 2],
                  })
                }
              ]
            }
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.moodGrid}>
            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                {renderMoodSection("high-unpleasant", "hu-1")}
              </View>
              <View style={styles.gridItem}>
                {renderMoodSection("high-pleasant", "hp-1")}
              </View>
            </View>
            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                {renderMoodSection("low-unpleasant", "lu-1")}
              </View>
              <View style={styles.gridItem}>
                {renderMoodSection("low-pleasant", "lp-1")}
              </View>
            </View>
          </View>
        </RNAnimated.View>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  panContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: Platform.OS === 'ios' ? 120 : 70,
  },
  moodGrid: {
    flexDirection: "column",
    width: SECTION_WIDTH * 2,
    height: SECTION_HEIGHT * 2,
  },
  colorSection: {
    width: SECTION_WIDTH,
    height: SECTION_HEIGHT,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    padding: 2,
  },
  moodButton: {
    width: (SCREEN_WIDTH - 45) / 3,
    aspectRatio: 1,
    borderRadius: 12,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
  },
  moodButtonText: {
    fontSize: 16,
    fontFamily: "LexendDeca-Medium",
    color: "#2F3336",
    textAlign: "center",
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#D6D0FD',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
  searchInputContainer: {
    backgroundColor: '#D6D0FD',
    overflow: 'hidden',
    borderRadius: 25,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  searchInput: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 15,
    fontFamily: 'LexendDeca-Regular',
    color: '#2F3336',
    height: 40,
    minWidth: 40,
    borderRadius: 25,
    // outlineStyle: 'none',
  },
  searchResultsContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  searchResultButton: {
    marginBottom: 10,
  },
  noResultsText: {
    textAlign: 'center',
    width: '100%',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'LexendDeca-Regular',
    color: '#2F3336',
  },
  highlightedMoodButton: {
    transform: [{scale: 1.05}],
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    borderWidth: 2,
    borderColor: '#2F3336'
  },
  
  highlightedMoodText: {
    fontFamily: 'LexendDeca-Bold',
  },
  gridRow: {
    flexDirection: 'row',
    flex: 1,
  },
  gridItem: {
    flex: 1,
  },
});

export default Mood;
