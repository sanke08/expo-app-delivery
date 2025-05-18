import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native'
import { Gesture, GestureDetector, } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import BackDrop from './BackDrop';
import { BottomSheetRef, BottomSheetScrollViewProps, MAX_HEIGHT_PERCENTAGE, PADDING, SCREEN_HEIGHT, SPRING_CONFIG } from '.';





const BottomSheetScrollView = forwardRef<BottomSheetRef, BottomSheetScrollViewProps>(
    ({ children, height = "70%", footer, header, footerHeight = 0, headerHeight, ...rest }, ref) => {

        const [show, setShow] = useState(false)
        const translateY = useSharedValue(0);
        const context = useSharedValue(0)
        const scrollBegin = useSharedValue(0)
        const scrollY = useSharedValue(0)

        const rawHeight = Math.min(
            parseInt(height.replace("%", "")),
            MAX_HEIGHT_PERCENTAGE
        );
        const heightPX = (rawHeight / 100) * SCREEN_HEIGHT;

        const OPEN_HEIGHT = -heightPX - 40 - PADDING
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


        const createPanGesture = (inScroll = false) =>

            Gesture.Pan()
                .onStart(() => {
                    context.value = translateY.value
                })
                .onUpdate((e) => {

                    const { translationY } = e
                    const atTop = scrollY.value === 0

                    const newTranslateY = context.value + translationY

                    if (!inScroll || (translationY > 0 && atTop)) {
                        const newY = Math.max(
                            context.value + translationY - (inScroll ? scrollBegin.value : 0),
                            OPEN_HEIGHT
                        );
                        translateY.value = withSpring(newY, SPRING_CONFIG);
                    } else if (translationY < 0) {
                        translateY.value = withSpring(OPEN_HEIGHT, SPRING_CONFIG);
                    }


                })
                .onEnd((e) => {
                    if (translateY.value > OPEN_HEIGHT / 1.1) {
                        translateY.value = withTiming(CLOSE_HEIGHT, {}, (isFinish) => isFinish && runOnJS(setShow)(false))
                    } else {
                        translateY.value = withSpring(OPEN_HEIGHT, SPRING_CONFIG)
                    }
                })

        const onScroll = useAnimatedScrollHandler({
            onBeginDrag: (event) => {
                scrollBegin.value = event.contentOffset.y;
            },
            onScroll: (event) => {
                scrollY.value = event.contentOffset.y;
            }
        });

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
                <GestureDetector gesture={createPanGesture()}>
                    <Animated.View style={[styles.container, animatestyle]} className={"dark:bg-secondary bg-white relative"}>
                        <View className=" w-10 h-1 rounded-full bg-neutral-500 self-center" />

                        <GestureDetector gesture={Gesture.Simultaneous(Gesture.Native(), createPanGesture(true))} >
                            <Animated.ScrollView onScroll={onScroll} showsVerticalScrollIndicator={false} scrollEventThrottle={16} style={{ maxHeight: heightPX - footerHeight }}>
                                {children}
                            </Animated.ScrollView>
                        </GestureDetector>
                        {footer &&
                            <View className=' h-max'>{footer}</View>
                        }
                    </Animated.View>
                </GestureDetector>
            </>
        )
    })

export default BottomSheetScrollView





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