import { StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'





const { height: SCREEN_HEIGHT } = Dimensions.get("window");



const BackDrop = ({ show, close }: { show: boolean, close: () => void }) => {

    const anoimateBackDropStyle = useAnimatedStyle(() => ({
        opacity: withTiming(show ? 1 : 0)
    }))



    return (
        <Pressable style={styles.backdrop} onPress={() => close()}>
            <Animated.View style={anoimateBackDropStyle} className=' h-full w-full bg-black/60 backdrop-blur' />
        </Pressable>
    )
}

export default BackDrop

const styles = StyleSheet.create({

    backdrop: {
        height: SCREEN_HEIGHT,
        zIndex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0
    },
})