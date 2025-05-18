import { View, TextInput, TouchableOpacity, ListRenderItem, } from 'react-native'
import React, { useRef } from 'react'
import Icon from './ui/ThemeIcon'
import { Colors, getThemeColor } from '@/constants/Colors'
import { useColorScheme } from 'nativewind'
import { BottomSheetRef } from './ui/BottomSheetModal'
import { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ThemedText } from '@/components/ui/ThemeText';
import categories from '../../assets/data/filter.json'
import BottomSheetFlatList from './bottom-sheet/BottomSheetFlatList'
import BouncyCheckbox from './BouncyCheckbox'

interface Category {
    name: string;
    count: number;
    checked?: boolean;
}


const SearchBar = () => {


    const [items, setItems] = useState<Category[]>(categories);
    const [selected, setSelected] = useState<Category[]>([]);
    const flexWidth = useSharedValue(0);
    const scale = useSharedValue(0);


    useEffect(() => {
        const hasSelected = selected.length > 0;
        const selectedItems = items.filter((item) => item.checked);
        const newSelected = selectedItems.length > 0;

        if (hasSelected !== newSelected) {
            flexWidth.value = withTiming(newSelected ? 150 : 0);
            scale.value = withTiming(newSelected ? 1 : 0);
        }

        setSelected(selectedItems);
    }, [items]);


    const bottomSheetRef = useRef<BottomSheetRef>(null);

    const { colorScheme } = useColorScheme()

    const openModal = () => {
        bottomSheetRef.current?.open();
    };
    const closeModal = () => {
        bottomSheetRef.current?.close();
    };



    const handleClearAll = () => {
        const updatedItems = items.map((item) => {
            item.checked = false;
            return item;
        });
        setItems(updatedItems);
    };

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: flexWidth.value,
            opacity: flexWidth.value > 0 ? 1 : 0,
        };
    });

    const animatedText = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const renderItem: ListRenderItem<Category> = ({ item, index }) => (
        <View className="flex-row items-center py-4 dark:bg-neutral-900 bg-white">
            <ThemedText className="flex-1">{item.name} ({item.count})</ThemedText>
            <BouncyCheckbox
                checked={!!items[index].checked}
                onPress={() => {
                    const isChecked = items[index].checked;
                    const updatedItems = items.map((item) =>
                        item.name === items[index].name ? { ...item, checked: !isChecked } : item
                    );
                    setItems(updatedItems);
                }}
            />
        </View>
    );


    return (
        <>
            <BottomSheetFlatList
                ref={bottomSheetRef}
                height='80%'
                data={items}
                renderItem={renderItem}
                ListHeaderComponent={<ItemBox />}
                footerHeight={80}
                footer={
                    <View className="flex-row gap-3 justify-center">
                        <Animated.View style={[animatedStyles]} className="flex-1 h-14 items-center justify-center border border-blue-500 rounded-lg">
                            <TouchableOpacity onPress={handleClearAll}>
                                <Animated.Text style={[animatedText]} className="text-blue-500 font-bold text-base">Clear all</Animated.Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <TouchableOpacity className="flex-1 h-14 bg-blue-500 rounded-lg items-center justify-center" onPress={() => close()}>
                            <ThemedText className="text-white font-bold text-base">Done</ThemedText>
                        </TouchableOpacity>
                    </View>
                }


            />


            <View className="h-16 w-full">
                <View className="flex-row items-center gap-2 flex-1">
                    <View className=" flex-1 flex-row items-center dark:bg-black bg-white rounded-md overflow-hidden pl-2">
                        <Icon name='search' type='Ionicons' color={getThemeColor(colorScheme).icon} />
                        <TextInput
                            className="p-2 text-gray-700 flex-1 py-4 dark:bg-black bg-white"
                            placeholder="Restaurants, groceries, dishes"
                            placeholderTextColor="#a1a1aa"
                        />
                    </View>
                    <TouchableOpacity onPress={openModal} className="p-2 rounded-full">
                        <Icon name='options-outline' color={Colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default SearchBar



const ItemBox = () => (
    <>
        <View className=" rounded-lg mb-4 space-y-2 dark:bg-black bg-white p-2">
            <TouchableOpacity className="flex-row items-center border-b dark:border-neutral-700 border-gray-200 py-4">
                <Icon type='Ionicons' name="arrow-down-outline" size={20} color="gray" />
                <ThemedText className="flex-1 ml-5">Sort</ThemedText>
                <Icon type='Ionicons' name="chevron-forward" size={22} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center border-b dark:border-neutral-700 border-gray-200 py-4">
                <Icon type='Ionicons' name="fast-food-outline" size={20} color="gray" />
                <ThemedText className="flex-1 ml-5">Hygiene rating</ThemedText>
                <Icon type='Ionicons' name="chevron-forward" size={22} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center border-b dark:border-neutral-700 border-gray-200 py-4">
                <Icon type='Ionicons' name="pricetag-outline" size={20} color="gray" />
                <ThemedText className="flex-1 ml-5">Offers</ThemedText>
                <Icon type='Ionicons' name="chevron-forward" size={22} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center py-4">
                <Icon type='Ionicons' name="nutrition-outline" size={20} color="gray" />
                <ThemedText className="flex-1 ml-5">Dietary</ThemedText>
                <Icon type='Ionicons' name="chevron-forward" size={22} color={Colors.primary} />
            </TouchableOpacity>
        </View>
        <ThemedText className="text-base font-bold mb-4">Categories</ThemedText>
    </>
);