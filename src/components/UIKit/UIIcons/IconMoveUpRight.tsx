import type { UIIconProps } from "./types"

export function IconMoveUpRight({ color = "#ffffff", size, ...props }: UIIconProps) {
    return (
        <svg
            {...props}
            width={size ?? 24}
            height={size ?? 24}
            viewBox="0 0 24 24"
            fill="none"
            color={color}
        >
            <path d="M22 10.75C22 11.4404 21.4404 12 20.75 12C20.0596 12 19.5 11.4404 19.5 10.75V6.2676L4.1337 21.6339C3.64555 22.122 2.85428 22.122 2.36612 21.6339C1.87796 21.1457 1.87796 20.3545 2.36612 19.8663L17.7324 4.50001H13.25C12.5596 4.50001 12 3.94037 12 3.25001C12 2.55965 12.5596 2 13.25 2H20.75C21.4404 2 22 2.55965 22 3.25001V10.75Z" fill="currentColor" />
        </svg>
    )
}
