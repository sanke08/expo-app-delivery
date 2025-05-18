import { View, Text, StyleSheet, Image, TouchableOpacity, SectionList, ListRenderItem, ScrollView, } from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { restaurant } from '@/assets/data/restaurant';
import { Link, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useScrollViewOffset, useSharedValue, withTiming, } from 'react-native-reanimated';
import { Colors, getThemeColor } from '@/constants/Colors';
import useBasketStore from '@/store/basketStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorScheme, useColorScheme } from 'nativewind';
const IMG_HEIGHT = 300

const Details = () => {
    const navigation = useNavigation();
    const { colorScheme } = useColorScheme()
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<TouchableOpacity[]>([]);
    const { items, total } = useBasketStore();
    const DATA = restaurant.food.map((item, index) => ({
        title: item.category,
        data: item.meals,
        index,
    }));


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: Colors.primary,
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.roundButton, { backgroundColor: getThemeColor(colorScheme).secondaryBG }]}>
                    <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity style={[styles.roundButton, { backgroundColor: getThemeColor(colorScheme).secondaryBG }]}>
                        <Ionicons name="share-outline" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.roundButton, { backgroundColor: getThemeColor(colorScheme).secondaryBG }]}>
                        <Ionicons name="search-outline" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
            ),
            headerBackground: () => {
                return (
                    <Animated.View style={[headerAnimatedStyle, { height: 100, backgroundColor: getThemeColor(colorScheme).secondaryBG }]} />
                )
            }
        });
    }, []);


    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollY.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-100, 0, 200],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, IMG_HEIGHT * 0.7],
                [0, 1]
            )
        }
    })


    const stickyHeaderStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, IMG_HEIGHT - 40, IMG_HEIGHT + 20],
                [0, 0, 1],
            ),
            transform: [
                {
                    translateY: withTiming(interpolate(
                        scrollY.value,
                        [0, IMG_HEIGHT - 40, IMG_HEIGHT + 20],
                        [-40, -40, 0],
                        Extrapolation.CLAMP

                    ))
                }
            ]
        }
    })

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);

        selected.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
        });
    };

    return (
        <>
            <Animated.ScrollView
                style={{ flex: 1 }}
                onScroll={scrollHandler}
                // ref={scrollRef}
                scrollEventThrottle={16}
            >
                <Animated.Image
                    source={restaurant.img}
                    // className={"h-96"}
                    style={[{ height: 340 }, imageAnimatedStyle]}
                    resizeMode="cover"
                />
                <MealDeals data={DATA} />
            </Animated.ScrollView>

            <Animated.View style={[styles.stickySegments, stickyHeaderStyle, { backgroundColor: getThemeColor(colorScheme).secondaryBG, borderBlockColor: getThemeColor(colorScheme).gray }]}>
                <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.segmentScrollview}>
                    {restaurant.food.map((item, index) => (
                        <TouchableOpacity

                            ref={(ref) => (itemsRef.current[index] = ref!)}
                            key={index}
                            style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton}
                            onPress={() => selectCategory(index)}
                        >

                            <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentText}>{item.category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>

            {items > 0 && (
                <View style={[styles.footer, { backgroundColor: getThemeColor(colorScheme).secondaryBG }]}>
                    <SafeAreaView edges={['bottom']} >
                        <Link href="/basket" asChild>
                            <TouchableOpacity style={styles.fullButton}>
                                <Text style={styles.basket}>{items}</Text>
                                <Text style={styles.footerText}>View Basket</Text>
                                <Text style={styles.basketTotal}>${total}</Text>
                            </TouchableOpacity>
                        </Link>
                    </SafeAreaView>
                </View>
            )}

        </>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: "#1111111",
    },
    stickySection: {
        backgroundColor: '#fff',
        marginLeft: 70,
        height: 100,
        justifyContent: 'flex-end',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        // backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    stickySectionText: {
        fontSize: 20,
        margin: 10,
    },
    restaurantName: {
        fontSize: 30,
        margin: 16,
    },
    restaurantDescription: {
        fontSize: 16,
        margin: 16,
        lineHeight: 22,
        // color: "aaaaaa"
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 40,
        margin: 16,
    },
    item: {
        // backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
    },
    dishImage: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },
    dish: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dishText: {
        fontSize: 14,
        // color: "aaaaaa",
        paddingVertical: 4,
    },
    stickySegments: {
        position: 'absolute',
        height: 50,
        left: 0,
        right: 0,
        top: 90,
        // backgroundColor: '#fff',
        overflow: 'hidden',
        paddingBottom: 4,
        borderBottomWidth: 1,
        // borderBlockColor: "#ddd"
    },
    segmentsShadow: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '100%',
    },
    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentText: {
        color: Colors.primary,
        fontSize: 16,
    },
    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    segmentScrollview: {
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 20,
        paddingBottom: 4,
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
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        height: 50,
    },
    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    basket: {
        color: '#fff',
        backgroundColor: '#19AA86',
        fontWeight: 'bold',
        padding: 8,
        borderRadius: 2,
    },
    basketTotal: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Details;



const MealDeals = ({ data, }: { data: any }) => {
    const { colorScheme } = useColorScheme()

    const renderItem: ListRenderItem<any> = ({ item, index }) => (
        <Link href={{ pathname: '/(modal)/dish', params: { id: item.id } }} asChild>
            <TouchableOpacity style={styles.item} className=' dark:bg-black bg-white'>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dish} className=' dark:text-white text-black'>{item.name}</Text>
                    <Text style={styles.dishText} className=' dark:text-white/80 text-black/70'>{item.info}</Text>
                    <Text style={styles.dishText} className=' dark:text-white/80 text-black/70'>${item.price}</Text>
                </View>
                <Image source={item.img} style={styles.dishImage} />
            </TouchableOpacity>
        </Link>
    );


    return (
        <View className=' dark:bg-black bg-white'>
            <View style={styles.detailsContainer}>
                <Text style={styles.restaurantName} className=' dark:text-white text-black'>{restaurant.name}</Text>
                <Text style={styles.restaurantDescription} className=' dark:text-white/80 text-black/70'>
                    {restaurant.delivery} · {restaurant.tags.map((tag, index) => `${tag}${index < restaurant.tags.length - 1 ? ' · ' : ''}`)}
                </Text>
                <Text style={styles.restaurantDescription} className=' dark:text-white/80 text-black/70'>{restaurant.about}</Text>
                <SectionList
                    contentContainerStyle={{ paddingBottom: 50 }}
                    keyExtractor={(item, index) => `${item.id + index}`}
                    scrollEnabled={false}
                    sections={data}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ marginHorizontal: 16, height: 1, backgroundColor: getThemeColor(colorScheme).gray }} />}
                    SectionSeparatorComponent={() => <View style={{ height: 1, backgroundColor: getThemeColor(colorScheme).gray }} />}
                    renderSectionHeader={({ section: { title, index } }) => <Text style={[styles.sectionHeader, { color: getThemeColor(colorScheme).text }]}>{title}</Text>}
                />
            </View>
        </View>
    )
}