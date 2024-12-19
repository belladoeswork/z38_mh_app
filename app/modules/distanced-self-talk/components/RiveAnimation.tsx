import React from "react";
import { StyleSheet, View, Platform, ViewStyle } from "react-native";
import { useRive, Layout, Alignment, Fit } from "@rive-app/react-canvas";

// Only import RiveNative when on native platforms
const RiveNative = Platform.select({
  native: () => require("rive-react-native").default,
  default: () => null,
})?.();

const riveAnimations: Record<string, any> = {
  z38_slider_27: require("@/public/assets/animations/z38_slider.riv"),
};

const TEXT_RUN_IDS = [
  "user_input1",
  "user_input2",
  "user_input3",
  "user_input4",
];

const PARENT_ARTBOARD = "Artboard 3";
const NESTED_ARTBOARD = "Slider_Artboard";

interface RiveAnimationProps {
  resourceName: string;
  stateMachineName?: string;
  artboardName?: string;
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

const RiveAnimation: React.FC<RiveAnimationProps> = ({
  resourceName,
  stateMachineName,
  artboardName,
  width = 200,
  height = 200,
  style,
  onPlay,
  textValue,
  onTextChange,
}) => {
  const riveRef =
    Platform.OS !== "web" ? React.useRef<RiveNativeRef>(null) : null;

  
    // Function to update text runs
    const updateTextRuns = React.useCallback((rive: any, text: string) => {
      if (!rive) return;
    
      try {
        // Get the Rive instance and main artboard
        const mainArtboard = rive.hierarchy?.artboard || rive.mainArtboard;
        if (!mainArtboard) {
          console.log('Could not find main artboard');
          return;
        }
    
        console.log('Main artboard found:', mainArtboard.name);
    
  
      // Find the nested artboard
      const nestedArtboard = mainArtboard.nested?.find(
        (artboard: any) => artboard.name === NESTED_ARTBOARD
      );
  
      if (!nestedArtboard) {
        console.log('Could not find nested artboard:', NESTED_ARTBOARD);
        return;
      }
  
      console.log('Nested artboard found:', nestedArtboard.name);

    // Update text runs in the nested artboard
    TEXT_RUN_IDS.forEach((runId) => {
      try {
        if (Platform.OS === "web") {
          // For web, directly update the text run in the nested artboard
          const textRun = nestedArtboard.textRuns?.find(
            (run: any) => run.name === runId
          );
          if (textRun) {
            textRun.text = text;
            nestedArtboard.markDirty(); // Mark the artboard for redraw
          } else {
            console.log(`Text run ${runId} not found in ${NESTED_ARTBOARD}`);
          }
        } else {
          // For native platforms, use the ref method
          riveRef?.current?.setTextRunValue(runId, text, NESTED_ARTBOARD);
        }
      } catch (error) {
        console.log(`Error setting text for ${runId}:`, error);
      }
    });
  } catch (error) {
    console.log('Error updating text runs:', error);
  }
}, []);
  
  
  if (Platform.OS === "web") {
    const { RiveComponent, rive } = useRive({
      src: riveAnimations[resourceName.replace(".riv", "")],
      stateMachines: stateMachineName ? [stateMachineName] : undefined,
      artboard: PARENT_ARTBOARD,
      layout: new Layout({
        fit: Fit.Cover,
        alignment: Alignment.Center,
      }),
      autoplay: true,
      onLoadError: (error) => console.log("ERROR LOADING RIVE:", error),
      onLoad: () => {
        console.log("LOADED RIVE");
        if (textValue && rive) {
          setTimeout(() => {
            updateTextRuns(rive, textValue);
          }, 100);
        }
      },
    });

    React.useEffect(() => {
      if (!textValue || !rive) return;
      updateTextRuns(rive, textValue);
    }, [textValue, rive, updateTextRuns]);

    return (
      <View style={[styles.container, { width, height }, style]}>
        <RiveComponent
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
        />
      </View>
    );
  }

  // Native platform effect
  React.useEffect(() => {
    if (!textValue || !riveRef?.current) return;
    setTimeout(() => {
      updateTextRuns(null, textValue);
    }, 100);
  }, [textValue, updateTextRuns]);

  if (!RiveNative) {
    return (
      <View style={[styles.container, { width, height }, style]}>
        <View style={styles.fallback} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width, height }, style]}>
      <RiveNative
        ref={riveRef}
        resourceName={resourceName.replace(".riv", "")}
        artboardName={artboardName}
        stateMachineName={stateMachineName}
        autoplay={true}
        style={styles.animation}
        onPlay={onPlay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  animation: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  fallback: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
});

export default RiveAnimation;
