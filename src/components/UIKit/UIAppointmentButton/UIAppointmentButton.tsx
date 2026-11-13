import { useState } from "react"
import { IconScheduler, IconUserRound } from "../../UIKit/UIIcons"

export type UIAppointmentButtonAppointmentType = "date-time" | "veterinarian"
export type UIAppointmentButtonState = "default" | "selected"

export type UIAppointmentButtonProps = {
    appointmentType: UIAppointmentButtonAppointmentType
    title: string
    description: string
    onClick: () => void
    state?: UIAppointmentButtonState
    onStateChange?: (state: UIAppointmentButtonState) => void
    className?: string
}

export function UIAppointmentButton({
    appointmentType,
    title,
    description,
    onClick,
    state,
    onStateChange,
    className = "",
}: UIAppointmentButtonProps) {
    const [internalState, setInternalState] = useState<UIAppointmentButtonState>(
        state ?? "default",
    )
    const currentState = state ?? internalState
    const typeClass = `ui-appointment-button--${appointmentType}`
    const stateClass = currentState === "selected" ? " ui-appointment-button--selected" : ""
    const customClass = className ? ` ${className}` : ""
    const Icon = appointmentType === "date-time" ? IconScheduler : IconUserRound

    function handleClick() {
        const nextState = currentState === "selected" ? "default" : "selected"

        if (state === undefined) {
            setInternalState(nextState)
        }

        onStateChange?.(nextState)
        onClick()
    }

    return (
        <button
            className={`ui-appointment-button ${typeClass}${stateClass}${customClass}`}
            type="button"
            aria-pressed={currentState === "selected"}
            onClick={handleClick}
        >
            <span className="ui-appointment-button__heading">
                <Icon
                    className="ui-appointment-button__icon"
                    color="var(--terciario-30-color)"
                    aria-hidden="true"
                />
                <span className="ui-appointment-button__title">{title}</span>
            </span>
            <span className="ui-appointment-button__description">{description}</span>
        </button>
    )
}
