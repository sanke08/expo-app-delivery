import { useEffect, useState } from 'react';
import { View, FlatList, ListRenderItem, TouchableOpacity } from 'react-native'
import categories from '../../../assets/data/filter.json';
import { Colors } from '@/constants/Colors';
import Icon from '@/components/ui/ThemeIcon';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import BouncyCheckbox from '@/components/BouncyCheckbox';
import { ThemedText } from '@/components/ui/ThemeText';



interface Category {
    name: string;
    count: number;
    checked?: boolean;
}



const Filter = ({ close }: { close: () => void }) => {

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
        <FlatList data={items} scrollEnabled={false} renderItem={renderItem} ListHeaderComponent={<ItemBox />} ListHeaderComponentStyle={{}} contentContainerStyle={{}} style={{ borderRadius: 10 }} />
    )
}




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



export default Filter