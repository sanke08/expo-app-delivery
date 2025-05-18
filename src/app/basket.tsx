import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import useBasketStore from '@/store/basketStore';
import { SafeAreaView } from 'react-native-safe-area-context';
// import ConfettiCannon from 'react-native-confetti-cannon';
import { Link } from 'expo-router';
// import SwipeableRow from '@/Components/SwipeableRow';
import { Colors, getThemeColor } from '@/constants/Colors';
import { useColorScheme } from 'nativewind';

const Basket = () => {
    const { products, total, clearCart, reduceProduct } = useBasketStore();
    const [order, setOrder] = useState(false);
    const { colorScheme } = useColorScheme()

    const FEES = {
        service: 2.99,
        delivery: 5.99,
    };

    const startCheckout = () => {
        setOrder(true);
        clearCart();
    };

    return (
        <>
            {/* {order && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fallSpeed={2500} fadeOut={true} autoStart={true} />} */}
            {order && (
                <View style={{ marginTop: '50%', padding: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Thank you for your order!</Text>
                    <Link href={'/'} asChild onPress={() => setOrder(false)}>
                        <TouchableOpacity style={styles.orderBtn}>
                            <Text style={styles.footerText}>New order</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            )}
            {!order && (
                <>
                    <FlatList
                        data={products}
                        // contentContainerStyle={{ paddingHorizontal: 20 }}
                        style={{ paddingHorizontal: 16 }}
                        ListHeaderComponent={<Text style={[styles.section, { color: getThemeColor(colorScheme).text }]}>Items</Text>}
                        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#ccc" }} />}
                        renderItem={({ item }) => (
                            //   <SwipeableRow onDelete={() => reduceProduct(item)}>
                            <View style={[styles.row, { backgroundColor: getThemeColor(colorScheme).secondaryBG }]}>
                                <Text style={{ color: Colors.primary, fontSize: 18 }}>{item.quantity}x</Text>
                                <Text style={{ flex: 1, fontSize: 18, color: getThemeColor(colorScheme).text }}>{item.name}</Text>
                                <Text style={{ fontSize: 18, color: getThemeColor(colorScheme).text }}>${item.price * item.quantity}</Text>
                            </View>
                            //   </SwipeableRow>
                        )}
                        ListFooterComponent={
                            <View >
                                <View style={{ height: 1, backgroundColor: "#ccc" }}></View>
                                <View style={[styles.totalRow, { backgroundColor: getThemeColor(colorScheme).secondaryBG }]}>
                                    <Text style={[styles.total, { backgroundColor: getThemeColor(colorScheme).secondaryBG, color: getThemeColor(colorScheme).text }]}>Subtotal</Text>
                                    <Text style={{ fontSize: 18, color: getThemeColor(colorScheme).text }}>${total}</Text>
                                </View>

                                <View style={[styles.totalRow, { backgroundColor: getThemeColor(colorScheme).secondaryBG }]}>
                                    <Text style={[styles.total, { backgroundColor: getThemeColor(colorScheme).secondaryBG, color: getThemeColor(colorScheme).text }]}>Service fee</Text>
                                    <Text style={{ fontSize: 18, color: getThemeColor(colorScheme).text }}>${FEES.service}</Text>
                                </View>

                                <View style={[styles.totalRow, { backgroundColor: getThemeColor(colorScheme).secondaryBG }]}>
                                    <Text style={[styles.total, { backgroundColor: getThemeColor(colorScheme).secondaryBG, color: getThemeColor(colorScheme).text }]}>Delivery fee</Text>
                                    <Text style={{ fontSize: 18, color: getThemeColor(colorScheme).text }}>${FEES.delivery}</Text>
                                </View>

                                <View style={[styles.totalRow, { backgroundColor: getThemeColor(colorScheme).secondaryBG }]}>
                                    <Text style={[styles.total, { backgroundColor: getThemeColor(colorScheme).secondaryBG, color: getThemeColor(colorScheme).text }]}>Order Total</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: getThemeColor(colorScheme).text }}>${(total + FEES.service + FEES.delivery).toFixed(2)}</Text>
                                </View>
                            </View>
                        }
                    />

                    <View style={[styles.footer, { backgroundColor: getThemeColor(colorScheme).secondaryBG }]}>
                        <SafeAreaView edges={['bottom']} >
                            <TouchableOpacity style={styles.fullButton} onPress={startCheckout}>
                                <Text style={[styles.footerText, { color: getThemeColor(colorScheme).text }]}>Order now</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </View>
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        // backgroundColor: '#fff',
        padding: 10,
        gap: 20,
        alignItems: 'center',
    },
    section: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        // backgroundColor: '#fff',
    },
    total: {
        fontSize: 18,
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
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 50,
    },
    footerText: {
        // color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    orderBtn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: 250,
        height: 50,
        justifyContent: 'center',
        marginTop: 20,
    },
});

export default Basket;
