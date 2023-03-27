export const CurrencyFormatter = (amount) => {
    return amount < 100 ? `${amount} Pence` : `£${Math.round((amount + Number.EPSILON) * 100) / 100}`
}