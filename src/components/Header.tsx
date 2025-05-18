import { useRef } from 'react';
import { View, TouchableOpacity, Image } from 'react-native'
import Icon from './ui/ThemeIcon';
import SearchBar from './SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from './ui/ThemeText';
import { Colors, getThemeColor } from '@/constants/Colors';
import { useColorScheme } from 'nativewind';
import { twMerge } from 'tailwind-merge';
import { BottomSheetRef } from './bottom-sheet';
// import BottomSheet from './BottomSheet';
import BottomSheetView from './bottom-sheet/BottomSheetView';
import BottomSheet from './BottomSheet';

const Header = () => {
    const bottomSheetRef = useRef<BottomSheetRef>(null);
    const { colorScheme } = useColorScheme()

    const openModal = () => {
        bottomSheetRef.current?.open();
    };

    const closeModel = () => {
        bottomSheetRef.current?.close()
    }



    return (
        <SafeAreaView className=" gap-4 bg-secondary px-5 pb-2">
            <BottomSheetView ref={bottomSheetRef} height='50%'>
                <BottomSheet close={closeModel} />
            </BottomSheetView>



            <View className=" h-16 w-full flex flex-row items-center justify-between gap-5">
                <TouchableOpacity onPress={openModal}>
                    <Image className="w-10 h-10" source={require('../../assets/images/bike.png')} />
                </TouchableOpacity>

                <TouchableOpacity className=" flex-1" onPress={openModal}>
                    <ThemedText className="text-sm ">Delivery · Now</ThemedText>
                    <View className="flex-row items-center">
                        <ThemedText className="text-lg font-bold">London</ThemedText>
                        <Icon name='chevron-down' color={getThemeColor(colorScheme).icon} size={16} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className={twMerge("p-2 rounded-full", `bg-black`)}>
                    <Icon name='person-outline' color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <SearchBar />
        </SafeAreaView>
    )
}

export default Header