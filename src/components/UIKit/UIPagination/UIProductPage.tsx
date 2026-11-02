type UIProductPageProps = {
    number: number
    color?: string
}
export function UIProductPage({ number = 0, color }: UIProductPageProps) {

    return (
        <div className={`ui-product-page ${color || ''}`}>{number}</div>
    )

}