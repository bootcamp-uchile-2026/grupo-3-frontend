import type { UIIconProps } from "./types"
import { iconRegistry } from "./iconRegistry"
import type { UIKitIconName } from "./iconRegistry"

export type { UIKitIconName } from "./iconRegistry"

export type UIKitIconProps = UIIconProps & {
    name: UIKitIconName
    iconColor?: string
}

export function UIKitIcon({ name, color, iconColor, ...props }: UIKitIconProps) {
    const icon = iconRegistry[name]

    if (!icon) {
        throw new RangeError(`Unknown UIKit icon: ${name}`)
    }

    const IconComponent = icon.component
    return <IconComponent {...props} color={color ?? iconColor} />
}