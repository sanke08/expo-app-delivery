import { View, Text, TouchableOpacity, } from 'react-native';
import React, { forwardRef, } from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, getThemeColor } from '@/constants/Colors';
import { ThemedText } from './ui/ThemeText';
import Icon from './ui/ThemeIcon';
import { useColorScheme } from 'nativewind';



const BottomSheet = ({ close }: { close: () => void }) => {

    const { colorScheme } = useColorScheme()

    return (


        <View className="flex-1 flex-col justify-between" >

            <View className="flex-row justify-center space-x-2 mb-8">
                <TouchableOpacity className="bg-primary px-7 py-2 rounded-full">
                    <ThemedText className=" font-bold">Delivery</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity className="px-7 py-2 rounded-full">
                    <Text className="text-primary">Pickup</Text>
                </TouchableOpacity>
            </View>

            <View>
                <ThemedText className="text-base font-semibold mb-2">Your Location</ThemedText>
                <Link href={'/'} asChild>
                    <TouchableOpacity>
                        <View className="flex-row items-center gap-2 p-4" style={{ backgroundColor: "#333", borderRadius: 6 }}>
                            <Icon type='Ionicons' name="location-outline" size={20} color={getThemeColor(colorScheme).icon} />
                            <ThemedText className="flex-1">Current location</ThemedText>
                            <Icon type='Ionicons' name="chevron-forward" size={20} color={Colors.primary} />
                        </View>
                    </TouchableOpacity>
                </Link>
            </View>

            <View>
                <ThemedText className="text-base font-semibold mt-4 mb-2">Arrival time</ThemedText>
                <TouchableOpacity>
                    <View className="flex-row items-center gap-2 p-4 " style={{ backgroundColor: "#333", borderRadius: 6 }}>
                        <Ionicons name="stopwatch-outline" size={20} color={getThemeColor(colorScheme).icon} />
                        <ThemedText className="flex-1">Now</ThemedText>
                        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                    </View>
                </TouchableOpacity>

            </View>

            <TouchableOpacity className="bg-primary p-4 my-4 rounded items-center" onPress={close}>
                <ThemedText className="text-white font-bold">Confirm</ThemedText>
            </TouchableOpacity>
        </View>


    )
}
export default BottomSheet