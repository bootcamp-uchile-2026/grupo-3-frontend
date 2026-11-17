import type { ReactNode } from "react"

export interface UIProductUsageProps {
    description: ReactNode
}

export function UIProductUsage({ description }: UIProductUsageProps) {
    return <div className="ui-product-usage">{description}</div>
}
