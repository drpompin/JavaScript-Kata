export const CurrencyFormatter = (amount) => {
    return amount < 100 ? `${amount} Pence` : `£${Math.round(((amount/100) + Number.EPSILON) * 100) / 100}`
}