import type { UIIconProps } from "./types"

export function IconArrowLeft({ color = "#ffffff", size, ...props }: UIIconProps) {
    return (
        <svg
            {...props}
            width={size ?? 24}
            height={size ?? 24}
            viewBox="0 0 24 24"
            fill="none"
            color={color}
        >
            <path d="M11.1155 2.36611C11.6036 1.87796 12.3957 1.87796 12.8839 2.36611C13.3718 2.85422 13.3718 3.64519 12.8839 4.13329L6.26735 10.7497H20.7496C21.44 10.7497 22 11.3097 22 12C21.9998 12.6902 21.4398 13.2493 20.7496 13.2493H6.26735L12.8839 19.8656C13.372 20.3538 13.372 21.1458 12.8839 21.634C12.3957 22.1219 11.6036 22.1221 11.1155 21.634L2.36612 12.8836C1.87796 12.3955 1.87796 11.6034 2.36612 11.1153L11.1155 2.36611Z" fill="currentColor" />
        </svg>
    )
}
