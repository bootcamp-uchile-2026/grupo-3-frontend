import { UIKitCategoryIcon } from "./UIKitCategoryIcon"

type UIKitIconProps = {
    name: string,
    iconColor: string
}

export function UIKitIcon({ name, iconColor }: UIKitIconProps){
    return (
        <>
        <div>
            {(name === 'categories') && <UIKitCategoryIcon color={iconColor}/>}
        </div>
        </>
    )
}