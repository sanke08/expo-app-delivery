import { ReactNode } from "react";
import { Dimensions, FlatListProps, ScrollViewProps } from "react-native";


const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_HEIGHT_PERCENTAGE = 90;
const PADDING = 16


type BottomSheetRef = {
    open: () => void;
    close: () => void;
};

type BottomSheetProps = {
    height?: string;
    children?: ReactNode
};


type BottomSheetScroll = {

    footer?: ReactNode
    header?: ReactNode
    footerHeight?: number
    headerHeight?: number
}


type BottomSheetScrollViewProps = BottomSheetProps & BottomSheetScroll & ScrollViewProps
type BottomSheetScrollProps = BottomSheetProps & BottomSheetScroll

const SPRING_CONFIG = {
    damping: 15,
}



export {
    BottomSheetRef,
    BottomSheetProps,
    SPRING_CONFIG,
    MAX_HEIGHT_PERCENTAGE,
    PADDING,
    SCREEN_HEIGHT,
    BottomSheetScrollViewProps,
    BottomSheetScrollProps
}