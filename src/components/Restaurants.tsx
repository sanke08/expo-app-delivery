import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { restaurants } from '../../assets/data/home';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ui/ThemeText';

const Restaurants = () => {
    return (
        <>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 20,
                    gap: 16
                }}>
                {restaurants.map((restaurant, index) => (
                    <Link href={'/details'} key={index} asChild>
                        <TouchableOpacity className=' dark:bg-neutral-900 bg-neutral-200'>
                            <View className=' w-80 h-64'>
                                <Image source={restaurant.img} className=' w-full flex-1' />
                                <View className=' p-2'>
                                    <ThemedText className=' text-sm'>{restaurant.name}</ThemedText>
                                    <ThemedText style={{ color: Colors.primary }}>
                                        {restaurant.rating} {restaurant.ratings}
                                    </ThemedText>
                                    <ThemedText style={{ color: "#555" }}>{restaurant.distance}</ThemedText>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
            </ScrollView>
        </>
    );
};
const styles = StyleSheet.create({
    categoryText: {
        // paddingVertical: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },
    image: {
        flex: 5,
        width: undefined,
        height: undefined,
    },
    categoryBox: {
        // flex: 5,
        // padding: 10,
    },
});

export default Restaurants;
