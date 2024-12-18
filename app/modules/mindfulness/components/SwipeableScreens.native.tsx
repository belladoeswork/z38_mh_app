import React from "react";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import type { SwipeableScreensProps } from "./SwipeableScreens";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const SwipeableScreens: React.FC<SwipeableScreensProps> = ({
  children,
  style,
  onSwipeLeft,
  onSwipeRight,
  ...props
}) => {
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: (event) => {
      translateX.value = 0;
    },
    onEnd: (event) => {
      translateX.value = 0;

      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        if (event.translationX > 0 && onSwipeRight) {
          runOnJS(onSwipeRight)();
        } else if (event.translationX < 0 && onSwipeLeft) {
          runOnJS(onSwipeLeft)();
        }
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[style, animatedStyle]} {...props}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default SwipeableScreens;
