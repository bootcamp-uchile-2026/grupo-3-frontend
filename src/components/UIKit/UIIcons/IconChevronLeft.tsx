import type { UIIconProps } from "./types"

export function IconChevronLeft({ color = "#ffffff", size, ...props }: UIIconProps) {
    return (
        <svg
            {...props}
            width={size ?? 23}
            height={size ?? 24}
            viewBox="0 0 23 24"
            fill="none"
            color={color}
        >
            <path d="M14.6529 2.41842C15.1899 1.86053 16.0603 1.86053 16.5973 2.41842C17.1342 2.97632 17.1342 3.88064 16.5973 4.43853L9.31929 12L16.5973 19.5615C17.1342 20.1194 17.1342 21.0237 16.5973 21.5816C16.0603 22.1395 15.1899 22.1395 14.6529 21.5816L6.40274 13.0101C5.86575 12.4522 5.86575 11.5478 6.40274 10.9899L14.6529 2.41842Z" fill="currentColor" />
        </svg>
    )
}
