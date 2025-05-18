import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native'
import { Gesture, GestureDetector, } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import BackDrop from './BackDrop';
import { BottomSheetProps, BottomSheetRef, MAX_HEIGHT_PERCENTAGE, PADDING, SCREEN_HEIGHT, SPRING_CONFIG } from '.';





const BottomSheetView = forwardRef<BottomSheetRef, BottomSheetProps>(
    ({ children, height = "70%" }, ref) => {

        const [show, setShow] = useState(false)
        const translateY = useSharedValue(0);
        const context = useSharedValue(0)

        const rawHeight = Math.min(
            parseInt(height.replace("%", "")),
            MAX_HEIGHT_PERCENTAGE
        );
        const heightPX = (rawHeight / 100) * SCREEN_HEIGHT;

        const OPEN_HEIGHT = -heightPX - 40 - (PADDING * 2)
        const CLOSE_HEIGHT = 0



        useImperativeHandle(ref, () => ({
            open: () => {
                setShow(true)
                translateY.value = withSpring(OPEN_HEIGHT, SPRING_CONFIG)
            },
            close: () => {
                translateY.value = withTiming(CLOSE_HEIGHT, {}, (isFinish) => runOnJS(setShow)(false))
            }
        }))




        const pan = Gesture.Pan()
            .onStart(() => {
                context.value = translateY.value
            })
            .onUpdate((e) => {

                const { translationY } = e

                const newTranslateY = context.value + translationY

                if (newTranslateY < OPEN_HEIGHT - PADDING) {
                    translateY.value = withSpring(OPEN_HEIGHT - PADDING, SPRING_CONFIG)
                }
                else if (newTranslateY > 0) {
                    translateY.value = withTiming(CLOSE_HEIGHT)
                }
                else
                    translateY.value = withSpring(newTranslateY)

            })
            .onEnd((e) => {
                if (translateY.value > OPEN_HEIGHT / 1.15) {
                    translateY.value = withTiming(CLOSE_HEIGHT, {}, (isFinish) => isFinish && runOnJS(setShow)(false))
                } else {
                    translateY.value = withSpring(OPEN_HEIGHT, SPRING_CONFIG)
                }
            })


        const animatestyle = useAnimatedStyle(() => ({
            transform: [{ translateY: translateY.value }],
        }));

        const close = () => {
            // @ts-ignore
            ref?.current?.close()
        }

        useEffect(() => {
            const onBackPress = () => {
                if (show) {
                    close()
                    return true;
                }
                return false;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => subscription.remove();
        }, [show]);




        return (
            <>

                {
                    show && <BackDrop close={close} show={show} />
                }
                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.container, animatestyle]} className={"dark:bg-secondary bg-white"}>
                        <View className=" w-10 h-1 rounded-full bg-neutral-500 self-center" />
                        <View style={{ maxHeight: heightPX, flex: 1, paddingBottom: PADDING * 2 }}>
                            {children}
                        </View>
                    </Animated.View>
                </GestureDetector>
            </>
        )
    })

export default BottomSheetView





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
        padding: PADDING,
        gap: 20
    },
    backdrop: {
        // ...StyleSheet.absoluteFillObject,
        height: SCREEN_HEIGHT,
        zIndex: 1,
        position: "absolute",
        top: 0,
        // bottom: 0,
        left: 0,
        right: 0
    },
})