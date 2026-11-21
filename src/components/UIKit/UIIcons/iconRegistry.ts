import type { ComponentType } from "react"
import type { UIIconProps } from "./types"
import { Icon } from "./Icon"
import { IconAdd } from "./IconAdd"
import { IconAddBell } from "./IconAddBell"
import { IconAddPen } from "./IconAddPen"
import { IconApprove } from "./IconApprove"
import { IconApps } from "./IconApps"
import { IconAppsList } from "./IconAppsList"
import { IconArrowLeft } from "./IconArrowLeft"
import { IconArrowRight } from "./IconArrowRight"
import { IconAscendentFilter } from "./IconAscendentFilter"
import { IconBell } from "./IconBell"
import { IconBirthdayCake } from "./IconBirthdayCake"
import { IconBone } from "./IconBone"
import { IconBrokenBone } from "./IconBrokenBone"
import { IconCalendarClock } from "./IconCalendarClock"
import { IconCalendarDownFilter } from "./IconCalendarDownFilter"
import { IconCamera } from "./IconCamera"
import { IconCat } from "./IconCat"
import { IconCategory } from "./IconCategory"
import { IconCheck } from "./IconCheck"
import { IconChevronDown } from "./IconChevronDown"
import { IconChevronLeft } from "./IconChevronLeft"
import { IconChevronRight } from "./IconChevronRight"
import { IconChevronUp } from "./IconChevronUp"
import { IconChevronsLeft } from "./IconChevronsLeft"
import { IconChevronsRight } from "./IconChevronsRight"
import { IconCircleQuestionMark } from "./IconCircleQuestionMark"
import { IconClock } from "./IconClock"
import { IconCloseCircle } from "./IconCloseCircle"
import { IconCopyRights } from "./IconCopyRights"
import { IconCreditCard } from "./IconCreditCard"
import { IconCut } from "./IconCut"
import { IconDescendentFilter } from "./IconDescendentFilter"
import { IconDocument } from "./IconDocument"
import { IconDocumentEdit } from "./IconDocumentEdit"
import { IconDog } from "./IconDog"
import { IconDots } from "./IconDots"
import { IconEngine } from "./IconEngine"
import { IconExclamationCircle } from "./IconExclamationCircle"
import { IconEye } from "./IconEye"
import { IconFemale } from "./IconFemale"
import { IconFilters } from "./IconFilters"
import { IconFishOff } from "./IconFishOff"
import { IconHeart } from "./IconHeart"
import { IconHeartPulse } from "./IconHeartPulse"
import { IconHistory } from "./IconHistory"
import { IconHome } from "./IconHome"
import { IconHomeLocation } from "./IconHomeLocation"
import { IconHospital } from "./IconHospital"
import { IconIdentificationCard } from "./IconIdentificationCard"
import { IconImage } from "./IconImage"
import { IconKey } from "./IconKey"
import { IconList } from "./IconList"
import { IconLoading } from "./IconLoading"
import { IconLocation } from "./IconLocation"
import { IconLocationEdit } from "./IconLocationEdit"
import { IconLogOut } from "./IconLogOut"
import { IconMale } from "./IconMale"
import { IconMenu } from "./IconMenu"
import { IconMoon } from "./IconMoon"
import { IconMoveUpRight } from "./IconMoveUpRight"
import { IconNext } from "./IconNext"
import { IconNotBell } from "./IconNotBell"
import { IconOutlet } from "./IconOutlet"
import { IconPallete } from "./IconPallete"
import { IconPaw } from "./IconPaw"
import { IconPayment } from "./IconPayment"
import { IconPercent } from "./IconPercent"
import { IconPill } from "./IconPill"
import { IconPrevious } from "./IconPrevious"
import { IconReservations } from "./IconReservations"
import { IconScheduler } from "./IconScheduler"
import { IconSearch } from "./IconSearch"
import { IconShare } from "./IconShare"
import { IconShareLink } from "./IconShareLink"
import { IconShield } from "./IconShield"
import { IconShoppoingCart } from "./IconShoppoingCart"
import { IconSquareExpand } from "./IconSquareExpand"
import { IconStar } from "./IconStar"
import { IconStarFill } from "./IconStarFill"
import { IconStethoscope } from "./IconStethoscope"
import { IconStore } from "./IconStore"
import { IconTelephone } from "./IconTelephone"
import { IconTicket } from "./IconTicket"
import { IconTrash } from "./IconTrash"
import { IconTruck } from "./IconTruck"
import { IconUpload } from "./IconUpload"
import { IconUploadFolder } from "./IconUploadFolder"
import { IconUser } from "./IconUser"
import { IconUserRound } from "./IconUserRound"
import { IconVaccine } from "./IconVaccine"
import { IconWeight } from "./IconWeight"
import { IconWithoutEye } from "./IconWithoutEye"
import { IconX } from "./IconX"
import { IconZoomIn } from "./IconZoomIn"
import { IconZoomOut } from "./IconZoomOut"

type IconRegistryEntry = {
    component: ComponentType<UIIconProps>
    componentName: string
}

export const iconRegistry = {
    Add: { component: IconAdd, componentName: "IconAdd" },
    AddBell: { component: IconAddBell, componentName: "IconAddBell" },
    AddPen: { component: IconAddPen, componentName: "IconAddPen" },
    Approve: { component: IconApprove, componentName: "IconApprove" },
    Apps: { component: IconApps, componentName: "IconApps" },
    AppsList: { component: IconAppsList, componentName: "IconAppsList" },
    ArrowLeft: { component: IconArrowLeft, componentName: "IconArrowLeft" },
    ArrowRight: { component: IconArrowRight, componentName: "IconArrowRight" },
    AscendentFilter: { component: IconAscendentFilter, componentName: "IconAscendentFilter" },
    Bell: { component: IconBell, componentName: "IconBell" },
    BirthdayCake: { component: IconBirthdayCake, componentName: "IconBirthdayCake" },
    Bone: { component: IconBone, componentName: "IconBone" },
    BrokenBone: { component: IconBrokenBone, componentName: "IconBrokenBone" },
    CalendarClock: { component: IconCalendarClock, componentName: "IconCalendarClock" },
    CalendarDownFilter: { component: IconCalendarDownFilter, componentName: "IconCalendarDownFilter" },
    Camera: { component: IconCamera, componentName: "IconCamera" },
    Cat: { component: IconCat, componentName: "IconCat" },
    Category: { component: IconCategory, componentName: "IconCategory" },
    Check: { component: IconCheck, componentName: "IconCheck" },
    ChevronDown: { component: IconChevronDown, componentName: "IconChevronDown" },
    ChevronLeft: { component: IconChevronLeft, componentName: "IconChevronLeft" },
    ChevronRight: { component: IconChevronRight, componentName: "IconChevronRight" },
    ChevronUp: { component: IconChevronUp, componentName: "IconChevronUp" },
    ChevronsLeft: { component: IconChevronsLeft, componentName: "IconChevronsLeft" },
    ChevronsRight: { component: IconChevronsRight, componentName: "IconChevronsRight" },
    CircleQuestionMark: { component: IconCircleQuestionMark, componentName: "IconCircleQuestionMark" },
    Clock: { component: IconClock, componentName: "IconClock" },
    CloseCircle: { component: IconCloseCircle, componentName: "IconCloseCircle" },
    CopyRights: { component: IconCopyRights, componentName: "IconCopyRights" },
    CreditCard: { component: IconCreditCard, componentName: "IconCreditCard" },
    Cut: { component: IconCut, componentName: "IconCut" },
    DescendentFilter: { component: IconDescendentFilter, componentName: "IconDescendentFilter" },
    Document: { component: IconDocument, componentName: "IconDocument" },
    DocumentEdit: { component: IconDocumentEdit, componentName: "IconDocumentEdit" },
    Dog: { component: IconDog, componentName: "IconDog" },
    Dots: { component: IconDots, componentName: "IconDots" },
    Engine: { component: IconEngine, componentName: "IconEngine" },
    ExclamationCircle: { component: IconExclamationCircle, componentName: "IconExclamationCircle" },
    Eye: { component: IconEye, componentName: "IconEye" },
    Female: { component: IconFemale, componentName: "IconFemale" },
    Filters: { component: IconFilters, componentName: "IconFilters" },
    FishOff: { component: IconFishOff, componentName: "IconFishOff" },
    Heart: { component: IconHeart, componentName: "IconHeart" },
    HeartPulse: { component: IconHeartPulse, componentName: "IconHeartPulse" },
    History: { component: IconHistory, componentName: "IconHistory" },
    Home: { component: IconHome, componentName: "IconHome" },
    HomeLocation: { component: IconHomeLocation, componentName: "IconHomeLocation" },
    Hospital: { component: IconHospital, componentName: "IconHospital" },
    Icon: { component: Icon, componentName: "Icon" },
    IdentificationCard: { component: IconIdentificationCard, componentName: "IconIdentificationCard" },
    Image: { component: IconImage, componentName: "IconImage" },
    Key: { component: IconKey, componentName: "IconKey" },
    List: { component: IconList, componentName: "IconList" },
    Loading: { component: IconLoading, componentName: "IconLoading" },
    Location: { component: IconLocation, componentName: "IconLocation" },
    LocationEdit: { component: IconLocationEdit, componentName: "IconLocationEdit" },
    LogOut: { component: IconLogOut, componentName: "IconLogOut" },
    Male: { component: IconMale, componentName: "IconMale" },
    Menu: { component: IconMenu, componentName: "IconMenu" },
    Moon: { component: IconMoon, componentName: "IconMoon" },
    MoveUpRight: { component: IconMoveUpRight, componentName: "IconMoveUpRight" },
    Next: { component: IconNext, componentName: "IconNext" },
    NotBell: { component: IconNotBell, componentName: "IconNotBell" },
    Outlet: { component: IconOutlet, componentName: "IconOutlet" },
    Pallete: { component: IconPallete, componentName: "IconPallete" },
    Paw: { component: IconPaw, componentName: "IconPaw" },
    Payment: { component: IconPayment, componentName: "IconPayment" },
    Percent: { component: IconPercent, componentName: "IconPercent" },
    Pill: { component: IconPill, componentName: "IconPill" },
    Previous: { component: IconPrevious, componentName: "IconPrevious" },
    Reservations: { component: IconReservations, componentName: "IconReservations" },
    Scheduler: { component: IconScheduler, componentName: "IconScheduler" },
    Search: { component: IconSearch, componentName: "IconSearch" },
    Share: { component: IconShare, componentName: "IconShare" },
    ShareLink: { component: IconShareLink, componentName: "IconShareLink" },
    Shield: { component: IconShield, componentName: "IconShield" },
    ShoppoingCart: { component: IconShoppoingCart, componentName: "IconShoppoingCart" },
    SquareExpand: { component: IconSquareExpand, componentName: "IconSquareExpand" },
    Star: { component: IconStar, componentName: "IconStar" },
    StarFill: { component: IconStarFill, componentName: "IconStarFill" },
    Stethoscope: { component: IconStethoscope, componentName: "IconStethoscope" },
    Store: { component: IconStore, componentName: "IconStore" },
    Telephone: { component: IconTelephone, componentName: "IconTelephone" },
    Ticket: { component: IconTicket, componentName: "IconTicket" },
    Trash: { component: IconTrash, componentName: "IconTrash" },
    Truck: { component: IconTruck, componentName: "IconTruck" },
    Upload: { component: IconUpload, componentName: "IconUpload" },
    UploadFolder: { component: IconUploadFolder, componentName: "IconUploadFolder" },
    User: { component: IconUser, componentName: "IconUser" },
    UserRound: { component: IconUserRound, componentName: "IconUserRound" },
    Vaccine: { component: IconVaccine, componentName: "IconVaccine" },
    Weight: { component: IconWeight, componentName: "IconWeight" },
    WithoutEye: { component: IconWithoutEye, componentName: "IconWithoutEye" },
    X: { component: IconX, componentName: "IconX" },
    ZoomIn: { component: IconZoomIn, componentName: "IconZoomIn" },
    ZoomOut: { component: IconZoomOut, componentName: "IconZoomOut" },
} satisfies Record<string, IconRegistryEntry>

export type UIKitIconName = keyof typeof iconRegistry
