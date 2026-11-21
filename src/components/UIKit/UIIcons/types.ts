import type { SVGProps } from "react"

export type UIIconProps = Omit<SVGProps<SVGSVGElement>, "color" | "width" | "height"> & {
    color?: string
    size?: number | string
}
