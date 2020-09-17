import { Currency } from 'types/localization'

export function formatCurrency(price: number, currency: Currency): string {
  switch (currency) {
    case 'USD':
      return `$ ${price}`

    case 'EUR':
      return `€ ${price}`

    case 'RUB':
      return `${price} ₽`

    default:
      return String(price)
  }
}
