import type { ReactNode } from "react"

export interface CommonTechnicalSheetData {
    especie?: string
    funcion?: string
    capacidad?: string
    peso?: string
    medidas?: string
    material?: string
    caracteristicas?: string[]
}

export interface FoodTechnicalSheetData {
    especie?: string
    etapaVida?: string
    saborPrincipal?: string
    condicionEspecial?: string
    ingredientes?: string
    colorantes?: string
    conservantes?: string
    informacionNutricional?: string
}

export type UITechnicalSheetProps =
    | { variant: "common"; data: CommonTechnicalSheetData }
    | { variant: "food"; data: FoodTechnicalSheetData }

type TechnicalSheetField = {
    label: string
    value: ReactNode
}

function hasText(value: string | undefined): value is string {
    return value !== undefined && value.trim().length > 0
}

function TechnicalSheetRow({ label, value }: TechnicalSheetField) {
    return (
        <div className="ui-technical-sheet__row">
            <dt className="ui-technical-sheet__label">{label}</dt>
            <dd className="ui-technical-sheet__value">{value}</dd>
        </div>
    )
}

export function UITechnicalSheet(props: UITechnicalSheetProps) {
    let fields: TechnicalSheetField[]

    if (props.variant === "common") {
        const features = props.data.caracteristicas?.filter(hasText) ?? []
        fields = [
            { label: "Especie", value: props.data.especie },
            { label: "Función", value: props.data.funcion },
            { label: "Capacidad", value: props.data.capacidad },
            { label: "Peso", value: props.data.peso },
            { label: "Medidas", value: props.data.medidas },
            { label: "Material", value: props.data.material },
            {
                label: "Características",
                value: features.length > 0
                    ? (
                        <ul>
                            {features.map((feature, index) => (
                                <li key={`${feature}-${index}`}>{feature}</li>
                            ))}
                        </ul>
                    )
                    : undefined,
            },
        ]
    } else {
        fields = [
            { label: "Especie", value: props.data.especie },
            { label: "Etapa de vida", value: props.data.etapaVida },
            { label: "Sabor principal", value: props.data.saborPrincipal },
            { label: "Condición especial", value: props.data.condicionEspecial },
            { label: "Ingredientes", value: props.data.ingredientes },
            { label: "Colorantes", value: props.data.colorantes },
            { label: "Conservantes", value: props.data.conservantes },
            { label: "Información nutricional", value: props.data.informacionNutricional },
        ]
    }

    return (
        <dl className="ui-technical-sheet">
            {fields
                .filter(({ value }) => typeof value === "string" ? hasText(value) : value)
                .map(({ label, value }) => <TechnicalSheetRow key={label} label={label} value={value} />)}
        </dl>
    )
}
