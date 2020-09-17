import { FC, ReactNode } from 'react'

import { Content, Price, Title, Wrapper } from '.'

import { MenuItem } from 'types/menus'
import { Currency } from 'types/localization'
import { formatCurrency } from 'utils'

interface IProps {
  currency: Currency
  data: MenuItem
  renderExpandInfoControl?: () => ReactNode
}

const MenuItemInfo: FC<IProps> = ({ data, currency, renderExpandInfoControl }) => {
  const { price, title } = data

  return (
    <Wrapper>
      <Content>
        <Title>
          {title}
        </Title>

        <Price>
          {formatCurrency(price, currency)}
          {/*
            ToDo: Replace by i18next:
            {t('UI.Price', { currency, price })}
          */}
        </Price>
      </Content>

      {renderExpandInfoControl && renderExpandInfoControl()}
    </Wrapper>
  )
}

export default MenuItemInfo
