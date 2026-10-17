import { UIKitCategoryIcon } from "./UIKitCategoryIcon"
import { UIKitStethoscopeIcon } from "./UIKitStethoscopeIcon"
import { UIKitTelephoneIcon } from "./UIKitTelephoneIcon"
import { UIKitHospitalIcon } from "./UIKitHospitalIcon"

type UIKitIconProps = {
    name: string,
    iconColor: string
}

export function UIKitIcon({ name, iconColor }: UIKitIconProps){
    return (
        <>
        <div>
            {(name === 'categories') && <UIKitCategoryIcon color={iconColor}/>}
            {(name === 'stethoscope') && <UIKitStethoscopeIcon color={iconColor}/>}
            {(name === 'telephone') && <UIKitTelephoneIcon color={iconColor}/>}
            {(name === 'hospital') && <UIKitHospitalIcon color={iconColor}/>}
        </div>
        </>
    )
}