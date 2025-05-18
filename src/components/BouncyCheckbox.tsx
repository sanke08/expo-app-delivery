import { TouchableOpacity, } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import Icon from './ui/ThemeIcon'
import { twMerge } from 'tailwind-merge'

const BouncyCheckbox = ({ checked, onPress }: { checked: boolean, onPress: () => void }) => {



    const scale = useSharedValue(1)


    const handle = () => {
        scale.value = withSpring(0.8, {}, () => scale.value = 1)
        onPress()
    }

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <TouchableOpacity onPress={handle} className=' rounded-lg overflow-hidden'>
            <Animated.View style={[animatedStyle]} className={twMerge("rounded-lg p-1 border dark:border-neutral-600 border-neutral-700", checked && "bg-[##20E1B2]")}>
                <Icon type='Ionicons' name='checkmark-sharp' size={20} color={"white"} />
            </Animated.View>
        </TouchableOpacity>
    )
}

export default BouncyCheckbox