import React from "react";
import { StyleSheet, View, Platform, ViewStyle } from "react-native";
import { useRive } from "@rive-app/react-canvas";

type RiveAnimationResources = {
  z38_slider1: any;
}

const riveAnimations: RiveAnimationResources = {
  z38_slider1: require("@/public/assets/animations/z38_slider1.riv"),
};

const TEXT_RUN_IDS = [
  "user_input1",
  "user_input2",
  "user_input3",
  "user_input4",
];

const PARENT_ARTBOARD = "Artboard";
const NESTED_ARTBOARD = "Slider_Artboard";

interface RiveAnimationProps {
  resourceName: keyof RiveAnimationResources;
  stateMachineName: string;
  artboardName: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
  onPlay?: () => void;
  textValue?: string;
  onTextChange?: (text: string) => void;
  onButtonPress?: () => void;

}

interface TextRun {
  name: string;
  text: string;
}

// Add type for the native Rive ref
interface RiveNativeRef {
  setTextRunValue: (runId: string, text: string, artboardName?: string) => void;
}

interface RiveStateChangeEvent {
  data: string;
}

const RiveAnimation: React.FC<RiveAnimationProps> = ({
  resourceName,
  stateMachineName,
  artboardName,
  width,
  height,
  style,
  textValue,
  onTextChange,
  onButtonPress,
}) => {
  const { rive, RiveComponent } = useRive({
    src: riveAnimations[resourceName],
    artboard: PARENT_ARTBOARD,
    stateMachines: [stateMachineName],
    autoplay: true,
  });

  // Replace the state machine listener with useStateMachineInput
  React.useEffect(() => {
    if (!rive) return;

    const input = rive.stateMachineInputs(stateMachineName)?.find(
      input => input.name === 'ButtonClicked'
    );

    if (input) {
      input.value = true;
      onButtonPress?.();
    }
  }, [rive, stateMachineName, onButtonPress]);

  // Handle animation lifecycle
  React.useEffect(() => {
    if (!rive || !textValue) return;

    try {
      TEXT_RUN_IDS.forEach(runId => {
        try {
          // Use setTextRunValueAtPath for nested text runs
          rive.setTextRunValueAtPath(runId, textValue, NESTED_ARTBOARD);
          console.log(`Setting text run ${runId} at path ${NESTED_ARTBOARD} to ${textValue}`);
        } catch (error) {
          console.error(`Error setting text for ${runId}:`, error);
        }
      });
      rive.play();
    } catch (error) {
      console.error("Error in Rive animation:", error);
    }
  }, [rive, textValue]);

  return (
    <View style={[styles.container, style]}>
      <RiveComponent style={{ width, height }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RiveAnimation;
