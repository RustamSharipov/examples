import { inject, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

import { Button } from 'components/shared'
import { Wrapper } from '.'

import { ConnectedComponent } from 'types'

const Footer: ConnectedComponent = ({ placeState }) => {
  const { t } = useTranslation()

  const { clearOrderItems } = placeState

  const handleClearAll = () => {
    clearOrderItems()
  }

  return (
    <Wrapper>
      <Button onClick={handleClearAll}>
        {t('Orders.RemoveAll')}
      </Button>
    </Wrapper>
  )
}

export default inject('placeState')(observer(Footer))
