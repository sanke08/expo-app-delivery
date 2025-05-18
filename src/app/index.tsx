
import Categories from '@/components/Categories'
import Restaurants from '@/components/Restaurants'
import { ThemedText } from '@/components/ui/ThemeText'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const index = () => {


    return (
        <SafeAreaView className=' flex-1'>
            <ScrollView >
                <Categories />
                <ThemedText className=' text-lg font-bold pl-5 mt-4'>Top picks in your neighbourhood</ThemedText>
                <Restaurants />
                <ThemedText className=' text-lg font-bold pl-5 mt-4'>Offers near you</ThemedText>
                <Restaurants />
            </ScrollView>
        </SafeAreaView>
    )
}

export default index
