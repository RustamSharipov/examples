import { inject,observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

import { Description, Title, Total, Subtotal, Wrapper } from '.'

import { ConnectedComponent } from 'types'

const Summary: ConnectedComponent = ({ placeState }) => {
  const { t } = useTranslation()

  const { menuItems, getOrderAmount } = placeState

  if (!menuItems) return null

  return (
    <Wrapper>
      <Title>
        {t('Orders.Summary.Title')}
      </Title>

      <Subtotal>
        <Subtotal.Label>
          {t('Orders.Summary.Subtotal')}
        </Subtotal.Label>

        <Subtotal.Value>
          {getOrderAmount()}
        </Subtotal.Value>
      </Subtotal>

      <Description>
        {t('Orders.Summary.ServicesDescription')}
      </Description>

      <Total>
        <Total.Label>
          {t('Orders.Summary.Total')}
        </Total.Label>

        <Total.Value>
          {getOrderAmount()}
        </Total.Value>
      </Total>
    </Wrapper>
  )
}

export default inject('placeState')(observer(Summary))
