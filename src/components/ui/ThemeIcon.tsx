import {
    Ionicons,
    FontAwesome,
} from '@expo/vector-icons'



export type IconType = "Ionicons" | "FontAwesome"

type IoniconsName = keyof typeof Ionicons.glyphMap;
type FontAwesomeName = keyof typeof FontAwesome.glyphMap;

export type IconNameTypes = IoniconsName & FontAwesomeName

export type IconProps = {
    name: IoniconsName | FontAwesomeName;
    color?: string;
    size?: number;
    type?: IconType;
    style?: object;
};


const getIconComponent = (type: IconType) => {
    switch (type) {
        case 'FontAwesome':
            return FontAwesome;
        default:
            return Ionicons;
    }
};

export default function Icon({
    name,
    color = '#000',
    size = 24,
    type = 'Ionicons',
    ...rest
}: IconProps) {
    const IconComponent = getIconComponent(type);
    return <IconComponent name={name as any} size={size} color={color}  {...rest} />;
}