import type { UIIconProps } from "./types"

export function IconChevronUp({ color = "#ffffff", size, ...props }: UIIconProps) {
    return (
        <svg
            {...props}
            width={size ?? 24}
            height={size ?? 24}
            viewBox="0 0 24 24"
            fill="none"
            color={color}
        >
            <path d="M11.0988 6.32054C11.6599 5.86289 12.487 5.89517 13.0101 6.4182L21.5816 14.9897C22.1395 15.5476 22.1395 16.4519 21.5816 17.0098C21.0237 17.5677 20.1194 17.5677 19.5615 17.0098L12 9.44836L4.43853 17.0098C3.88064 17.5677 2.97632 17.5677 2.41842 17.0098C1.86053 16.4519 1.86053 15.5476 2.41842 14.9897L10.9899 6.4182L11.0988 6.32054Z" fill="currentColor" />
        </svg>
    )
}
