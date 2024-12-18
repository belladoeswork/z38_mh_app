import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Platform, ViewStyle } from "react-native";
import { useRive, Layout, Alignment, Fit } from "@rive-app/react-canvas";
import { wp, hp, normalize } from '@/utils/dimensions';

// Only import RiveNative when on native platforms
const RiveNative = Platform.select({
  native: () => require("rive-react-native").default,
  default: () => null,
})?.();

const riveAnimations: Record<string, any> = {
  z38_clouds_live : require("@/public/assets/animations/z38_clouds_live.riv"),
};

const TEXT_RUN_IDS = ["user_input"];

const PARENT_ARTBOARD = "Artboard 3";

interface RiveAnimationProps {
  resourceName: string;
  stateMachineName: string;
  artboardName: string;
  width: number;
  height: number;
  style?: ViewStyle;
  textValue: string;
  onTextChange: (text: string) => void;
  setIsInputDisabled?: (disabled: boolean) => void;
}

interface TextRun {
  name: string;
  text: string;
}

interface RiveNativeRef {
  setTextRunValue: (runId: string, text: string, artboardName?: string) => void;
}

const RiveAnimation: React.FC<RiveAnimationProps> = ({
  resourceName,
  stateMachineName,
  artboardName,
  // width = 200,
  // height = 200,
  width = wp(100),
  height = hp(30), 
  style,
  textValue,
  setIsInputDisabled,
}) => {
  const { rive, RiveComponent } = useRive({
    src: riveAnimations[resourceName],
    artboard: artboardName, 
    stateMachines: [stateMachineName],
    autoplay: false,

  });

  const isPlaying = useRef(false);

// hide default placeholder text on load
  useEffect(() => {
    if (rive) {
      rive.setTextRunValue("user_input", "");
    }
  }, [rive]);

  useEffect(() => {
    if (!rive || !textValue ) return;

    try {


      rive.setTextRunValue("user_input", textValue);
      rive.play();
      setTimeout(() => {
        if (rive) {
          rive.pause();
          rive.reset();
          rive.setTextRunValue("user_input", "");
          isPlaying.current = false;


          setTimeout(() => {
            if (rive) {
              // Unload and reload the state machine
              rive.cleanup();
              rive.load({
                src: riveAnimations[resourceName],
                artboard: artboardName,
                stateMachines: [stateMachineName],
                autoplay: false,
              });
              setTimeout(() => {
                if (rive) {
                  rive.setTextRunValue("user_input", "");
                }
              }, 100);
            }
          }, 100);
        }
      }, 10000);
      
    } catch (error) {

      console.error("Error updating Rive animation:", error);
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
});

export default RiveAnimation;





//   const riveRef =
//     Platform.OS !== "web" ? React.useRef<RiveNativeRef>(null) : null;
  
//     const [shouldPlay, setShouldPlay] = React.useState(false);

//     const updateTextRuns = React.useCallback((rive: any, text: string) => {
//       if (!rive) return;
    
//       try {
//         // Get the main artboard
//         const artboard = rive.artboard;
    
//         if (!artboard) {
//           console.log(`Could not find artboard: ${PARENT_ARTBOARD}`);
//           return;
//         }
//         // console.log('Available text runs:', artboard.texts);

//         // Update text runs
//         TEXT_RUN_IDS.forEach((runId) => {
//           try {
//             if (Platform.OS === "web") {
//               rive.setTextRunValue(runId, text);
//             } else {
//               // For native platforms, use the ref method
//               riveRef?.current?.setTextRunValue(runId, text, PARENT_ARTBOARD);
//             }
//           } catch (error) {
//             console.log(`Error setting text for ${runId}:`, error);
//           }
//         });
//       } catch (error) {
//         console.log('Error updating text runs:', error);
//       }
//     }, []);
  
//     if (Platform.OS === "web") {
//       const { RiveComponent, rive } = useRive({
//         src: riveAnimations[resourceName.replace(".riv", "")],
//         stateMachines: stateMachineName ? [stateMachineName] : undefined,
//         artboard: PARENT_ARTBOARD,
//         layout: new Layout({
//           fit: Fit.Cover,
//           alignment: Alignment.Center,
//         }),
//         autoplay: false,
//         onLoadError: (error) => console.log("ERROR LOADING RIVE:", error),
//         onLoad: () => {
//           console.log("LOADED RIVE");
//           if (textValue && rive) {
//             updateTextRuns(rive, textValue);
//           }
//         },
//       });
//       // Update text whenever textValue changes
//       React.useEffect(() => {
//         if (rive && textValue !== undefined  && stateMachineName) {
//           updateTextRuns(rive, textValue);
//           if (textValue.trim() !== '') {
//             const inputs = rive.stateMachineInputs(stateMachineName);
//             const trigger = inputs.find(i => i.name === 'trigger');
//             if (trigger) {
//               trigger.fire();
//             }
//           }
//         }
//       }, [textValue, rive]);
//       return (
//         <View style={[styles.container, { width, height }, style]}>
//           <RiveComponent
//             style={{
//               width: "100%",
//               height: "100%",
//               backgroundColor: "transparent",
//             }}
//           />
//         </View>
//       );
//     }
//     // For native platforms
//     React.useEffect(() => {
//       if (textValue && riveRef?.current) {
//         updateTextRuns(null, textValue);
//         if (textValue.trim() !== '') {
//           setShouldPlay(true);
//         }      }
//     }, [textValue]);
//     // update text runs
//     // const updateTextRuns = React.useCallback((rive: any, text: string) => {
//     //   if (!rive) return;
    
//     //   try {
//     //     // Get the main artboard
//     //     const artboard = rive.artboard;
    
//     //     if (!artboard) {
//     //       console.log(`Could not find artboard: ${PARENT_ARTBOARD}`);
//     //       return;
//     //     }
//     //     // console.log('Available text runs:', artboard.texts);

//     //     // Update text runs
//     //     TEXT_RUN_IDS.forEach((runId) => {
//     //       try {
//     //         if (Platform.OS === "web") {
//     //           rive.setTextRunValue(runId, text);
//     //         } else {
//     //           // For native platforms, use the ref method
//     //           riveRef?.current?.setTextRunValue(runId, text, PARENT_ARTBOARD);
//     //         }
//     //       } catch (error) {
//     //         console.log(`Error setting text for ${runId}:`, error);
//     //       }
//     //     });
//     //   } catch (error) {
//     //     console.log('Error updating text runs:', error);
//     //   }
//     // }, []);
  
  
//   // if (Platform.OS === "web") {
//   //   const { RiveComponent, rive } = useRive({
//   //     src: riveAnimations[resourceName.replace(".riv", "")],
//   //     stateMachines: stateMachineName ? [stateMachineName] : undefined,
//   //     artboard: PARENT_ARTBOARD,
//   //     layout: new Layout({
//   //       fit: Fit.Cover,
//   //       alignment: Alignment.Center,
//   //     }),
//   //     autoplay: false,
//   //     onLoadError: (error) => console.log("ERROR LOADING RIVE:", error),
//   //     onLoad: () => {
//   //       console.log("LOADED RIVE");
//   //       if (textValue && rive) {
//   //         setTimeout(() => {
//   //           updateTextRuns(rive, textValue);
//   //         }, 500);
//   //       }
//   //     },
//   //   });

//   //   React.useEffect(() => {
//   //     if (!textValue || !rive) return;
//   //     if (rive && textValue) {
//   //       updateTextRuns(rive, textValue);
//   //     }
//   //   }, [textValue, rive, updateTextRuns]);

//   //   return (
//   //     <View style={[styles.container, { width, height }, style]}>
//   //       <RiveComponent
//   //         style={{
//   //           width: "100%",
//   //           height: "100%",
//   //           backgroundColor: "transparent",
//   //         }}
//   //       />
//   //     </View>
//   //   );
//   // }

//   // Native platform effect
//   React.useEffect(() => {
//     if (!textValue || !riveRef?.current) return;
//     setTimeout(() => {
//       updateTextRuns(null, textValue);
//     }, 100);
//   }, [textValue, updateTextRuns]);

//   if (!RiveNative) {
//     return (
//       <View style={[styles.container, { width, height }, style]}>
//         <View style={styles.fallback} />
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { width, height }, style]}>
//       <RiveNative
//         ref={riveRef}
//         resourceName={resourceName.replace(".riv", "")}
//         artboardName={artboardName}
//         stateMachineName={stateMachineName}
//         autoplay={shouldPlay}
//         style={styles.animation}
//         onPlay={onPlay}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//   },
//   animation: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "transparent",
//   },
//   fallback: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#F5F5F5",
//   },
// });

// export default RiveAnimation;
