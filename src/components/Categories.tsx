import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React from 'react';
import { categories } from '../../assets/data/home';
import { ThemedText } from './ui/ThemeText';

const Categories = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                padding: 20,
                gap: 16
            }}
        >

            {categories.map((category, index) => (
                <View className=' w-24 overflow-hidden rounded-lg dark:bg-neutral-900' key={index}>
                    <Image source={category.img} />
                    <ThemedText className=' text-sm p-1'>{category.text}</ThemedText>
                </View>
            ))}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    categoryCard: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        marginEnd: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.06,
        borderRadius: 4,
    },
    categoryText: {
        padding: 6,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Categories;