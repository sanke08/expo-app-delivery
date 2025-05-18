import { Text, type TextProps } from 'react-native';
import { twMerge } from "tailwind-merge"

export function ThemedText({ className, ...rest }: TextProps) {
    return (
        <Text className={twMerge(" dark:text-white text-black ", className)} {...rest} />
    );
}