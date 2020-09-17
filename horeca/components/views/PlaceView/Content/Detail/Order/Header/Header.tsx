import { useTranslation } from 'react-i18next'

import { BackControl, Title, Wrapper } from '.'

const Header = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <BackControl />

      <Title>
        {t('Orders.Title')}
      </Title>
    </Wrapper>
  )
}

export default Header
