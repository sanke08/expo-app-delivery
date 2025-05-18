
// import { forwardRef, ReactNode, useCallback, useImperativeHandle, useState, } from "react";
// import { View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, } from "react-native";
// import { Gesture, GestureDetector, PanGestureHandlerEventPayload, } from "react-native-gesture-handler";
// import Animated, { AnimatedScrollViewProps, interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");
// const MAX_HEIGHT_PERCENTAGE = 90;
// const OVERDRAG = 20
// const PADDING = 16

// export type BottomSheetRef = {
//     open: () => void;
//     close: () => void;
// };

// type BottomSheetProps = {
//     children: ReactNode;
//     height?: string;
// };

// const SPRING_CONFIG = {
//     damping: 15,
// }

// export const BottomSheetModal = forwardRef<BottomSheetRef, BottomSheetProps>(
//     ({ children, height = "70%" }, ref) => {



//         const [show, setShow] = useState(false)
//         const translateY = useSharedValue(0)
//         const context = useSharedValue(0)
//         const scrollY = useSharedValue(0);
//         const scrollBegin = useSharedValue(0);


//         const rawHeight = Math.min(
//             parseInt(height.replace("%", "")),
//             MAX_HEIGHT_PERCENTAGE
//         );
//         const heightPercentage = (rawHeight / 100) * SCREEN_HEIGHT;


//         useImperativeHandle(ref, () => ({
//             open: () => {
//                 setShow(true)
//                 translateY.value = withSpring(-heightPercentage - PADDING * 2, SPRING_CONFIG)
//             }
//             ,
//             close: () => {
//                 translateY.value = withSpring(50 + CLOSED_POSITIONPRING_CONFIG, (isFinished) => isFinished && runOnJS(setShow)(false))
//             }
//         }))


//         const handleGesture = Gesture.Pan()
//             .onStart((e: PanGestureHandlerEventPayload) => {
//                 context.value = translateY.value
//             })
//             .onUpdate((e: PanGestureHandlerEventPayload) => {
//                 let newTranslateY = context.value + e.translationY

//                 if (newTranslateY < -heightPercentage - OVERDRAG) {
//                     newTranslateY = withTiming(-heightPercentage - (OVERDRAG * 2) - PADDING,)
//                 }

//                 if (newTranslateY > 0) {
//                     newTranslateY = 0
//                 }

//                 translateY.value = newTranslateY;

//             })
//             .onEnd((e) => {
//                 if (translateY.value > -heightPercentage / 1.3) {
//                     translateY.value = withSpring(50 + PADDING, SPRING_CONFIG, (isFinished) => isFinished && runOnJS(setShow)(false)); // Close
//                 } else {
//                     translateY.value = withSpring(-heightPercentage - PADDING * 2, SPRING_CONFIG, (isFinished) => isFinished && runOnJS(setShow)(true)); // Open
//                 }
//             })


//         const animatestyle = useAnimatedStyle(() => ({
//             transform: [{ translateY: translateY.value }],
//         }));

//         const panScroll = Gesture.Pan().
//             onBegin((e) => {
//                 context.value = translateY.value;
//             })
//             .onUpdate((e) => {
//                 if (e.translationY < 0) {
//                     translateY.value = withSpring(-heightPercentage - PADDING * 2, {
//                         damping: 100,
//                         stiffness: 400,
//                     });
//                 } else if (e.translationY > 0 && scrollY.value === 0) {
//                     translateY.value = withSpring(
//                         Math.max(
//                             context.value + e.translationY - scrollBegin.value,
//                             -heightPercentage - PADDING * 2,
//                         ),
//                         {
//                             damping: 100,
//                             stiffness: 400,
//                         },
//                     );
//                 }
//             }).onEnd(() => {
//                 if (translateY.value > -heightPercentage / 1.3) {
//                     translateY.value = withSpring(50 + PADDING, {
//                         damping: 100,
//                         stiffness: 400,
//                     });
//                 } else {
//                     translateY.value = withSpring(-heightPercentage - PADDING * 2, {
//                         damping: 100,
//                         stiffness: 400,
//                     });
//                 }
//             })


//         const onScroll = useAnimatedScrollHandler({
//             onBeginDrag: event => {
//                 scrollBegin.value = event.contentOffset.y;
//             },
//             onScroll: event => {
//                 scrollY.value = event.contentOffset.y;
//             },
//         });

//         const scrollViewGesture = Gesture.Native()


//         return (
//             <GestureDetector gesture={handleGesture}>
//                 <Animated.View style={[styles.container, animatestyle]} className="dark:bg-secondary bg-neutral-200 border-t border-neutral-400">
//                     <View className=" w-10 h-1 rounded-full bg-neutral-500 self-center" style={{ marginBottom: 20 }} />
//                     {
//                         show &&
//                         (
//                             <GestureDetector gesture={Gesture.Simultaneous(scrollViewGesture, panScroll)}>
//                                 <Animated.ScrollView
//                                     scrollEventThrottle={16}
//                                     onScroll={onScroll}
//                                 >

//                                     {children}
//                                 </Animated.ScrollView>
//                             </GestureDetector>

//                         )
//                     }
//                 </Animated.View>
//             </GestureDetector>
//         )
//     })



// const styles = StyleSheet.create({
//     container: {
//         display: "flex",
//         flexDirection: "column",
//         position: "absolute",
//         top: SCREEN_HEIGHT + 50,
//         right: 0,
//         left: 0,
//         height: SCREEN_HEIGHT,
//         zIndex: 2,
//         padding: PADDING,
//     },
//     backdrop: {
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: "black",
//         zIndex: 1
//     },
// })




import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Constants
const MAX_HEIGHT_PERCENTAGE = 90;
// const OVERDRAG = 20;
const PADDING = 16;

// Refs exposed to control the sheet externally
export type BottomSheetRef = {
    open: () => void;
    close: () => void;
};

type BottomSheetProps = {
    children: ReactNode;
    height?: string; // Accepts "70%" style input
};

// Spring animation configurations
const SPRING_CONFIG_OPEN = { damping: 15 };
const SPRING_CONFIG_STRONG = { damping: 100, stiffness: 400 };

export const BottomSheetModal = forwardRef<BottomSheetRef, BottomSheetProps>(({ children, height = "70%" }, ref) => {
    // Show/hide sheet view
    const [show, setShow] = useState(false);

    // Animated values
    const translateY = useSharedValue(0); // Current Y offset of sheet
    const context = useSharedValue(0); // Stores offset on drag start
    const scrollY = useSharedValue(0); // Tracks vertical scroll inside ScrollView
    const scrollBegin = useSharedValue(0); // Where scroll began

    // Calculate actual height in px from percentage
    const rawHeight = Math.min(parseInt(height.replace("%", "")), MAX_HEIGHT_PERCENTAGE);
    const heightPx = (rawHeight / 100) * SCREEN_HEIGHT;

    // Precomputed positions
    const OPEN_POSITION = -heightPx - PADDING * 2;
    const CLOSED_POSITION = 50 + PADDING;

    // Open the sheet
    const openSheet = () => {
        runOnJS(setShow)(true)
        translateY.value = withSpring(OPEN_POSITION, SPRING_CONFIG_OPEN);
    };

    // Close the sheet
    const closeSheet = () => {
        translateY.value = withSpring(CLOSED_POSITION, SPRING_CONFIG_OPEN, (isFinished) => {
            if (isFinished) runOnJS(setShow)(false);
        });
    };

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
        open: openSheet,
        close: closeSheet
    }));

    // Shared drag end logic — decides whether to open or close sheet
    const handleDragEnd = () => {
        if (translateY.value > OPEN_POSITION / 1.3) {
            closeSheet();
        } else {
            translateY.value = withSpring(OPEN_POSITION, SPRING_CONFIG_OPEN);
        }
    };

    /**
     * Generates a Pan gesture:
     * - `isScrollAware` means it cooperates with ScrollView (only pulls sheet if at top)
     */
    const createPanGesture = (isScrollAware = false) =>
        Gesture.Pan()
            .onBegin(() => {
                context.value = translateY.value;
            })
            .onUpdate((e) => {
                const { translationY } = e;
                const atTop = scrollY.value === 0;

                if (!isScrollAware || (translationY > 0 && atTop)) {
                    const newY = Math.max(
                        context.value + translationY - (isScrollAware ? scrollBegin.value : 0),
                        OPEN_POSITION
                    );
                    translateY.value = withSpring(newY, SPRING_CONFIG_STRONG);
                } else if (translationY < 0) {
                    translateY.value = withSpring(OPEN_POSITION, SPRING_CONFIG_STRONG);
                }
            })
            .onEnd(() => {
                if (translateY.value > OPEN_POSITION / 1.3) {
                    translateY.value = withSpring(CLOSED_POSITION, SPRING_CONFIG_OPEN, (isFinished) => isFinished && runOnJS(setShow)(false)); // Close
                } else {
                    translateY.value = withSpring(OPEN_POSITION, SPRING_CONFIG_OPEN, (isFinished) => isFinished && runOnJS(setShow)(true)); // Open
                }
            });

    // Bind animated style to translateY value
    const animatestyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }]
    }));

    // Scroll handler to track scroll position inside the ScrollView
    const onScroll = useAnimatedScrollHandler({
        onBeginDrag: (event) => {
            scrollBegin.value = event.contentOffset.y;
        },
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        }
    });

    return (
        // Outer drag gesture (for pulling the entire sheet)
        <GestureDetector gesture={createPanGesture()}>
            <Animated.View style={[styles.container, animatestyle]} className="dark:bg-secondary bg-neutral-200 border-t border-neutral-400">
                {/* Drag indicator bar */}
                <View className="w-10 h-1 rounded-full bg-neutral-500 self-center" style={{ marginBottom: 20 }} />

                {/* Sheet content only rendered if `show` is true */}
                {show && (
                    // Inner gesture: scroll + pan-to-close from top
                    <GestureDetector gesture={Gesture.Simultaneous(Gesture.Native(), createPanGesture(true))}>
                        <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll} style={{ maxHeight: heightPx }}>
                            {children}
                        </Animated.ScrollView>
                    </GestureDetector>
                )}
            </Animated.View>
        </GestureDetector>
    );
});

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: SCREEN_HEIGHT + 50,
        right: 0,
        left: 0,
        height: SCREEN_HEIGHT,
        zIndex: 2,
        padding: PADDING
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "black",
        zIndex: 1
    }
});
