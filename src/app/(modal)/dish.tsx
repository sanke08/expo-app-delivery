import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { getDishById } from '@/assets/data/restaurant';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInLeft, } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import useBasketStore from '@/store/basketStore';
import { Colors, getThemeColor } from '@/constants/Colors';
import { useColorScheme } from 'nativewind';

const Dish = () => {
    const { id } = useLocalSearchParams();
    const item = getDishById(+id)!;
    const router = useRouter();
    const { colorScheme } = useColorScheme()
    const navigation = useNavigation()
    const { addProduct } = useBasketStore();

    const addToCart = () => {
        addProduct(item);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.back();
    };


    return (
        <SafeAreaView style={{
            flex: 1,
            //  backgroundColor:getThemeColor(colorScheme).background

        }} edges={['bottom']}>
            <View style={styles.container}>
                <Animated.Image entering={FadeIn.duration(400).delay(200)} source={item?.img} style={styles.image} />
                <View style={{ padding: 20 }}>
                    <Animated.Text entering={FadeInLeft.duration(400).delay(200)} style={[styles.dishName, { color: getThemeColor(colorScheme).text }]}>
                        {item?.name}
                    </Animated.Text>
                    <Animated.Text entering={FadeInLeft.duration(400).delay(400)} style={[styles.dishInfo, { color: getThemeColor(colorScheme).text }]}>
                        {item?.info}
                    </Animated.Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
                        <Text style={styles.footerText}>Add for ${item?.price}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
    },
    dishName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dishInfo: {
        fontSize: 16,
        // color: "#ccc",
    },
    footer: {
        position: 'absolute',
        // backgroundColor: '#fff',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingTop: 20,
    },
    fullButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Dish;
