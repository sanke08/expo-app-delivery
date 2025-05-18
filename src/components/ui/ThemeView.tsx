import { View, type ViewProps } from 'react-native';
import { twMerge } from "tailwind-merge"

export function ThemedView({ className, ...rest }: ViewProps) {
    return (
        <View className={twMerge(" dark:bg-black bg-white flex-1", className)} {...rest} />
    );
}