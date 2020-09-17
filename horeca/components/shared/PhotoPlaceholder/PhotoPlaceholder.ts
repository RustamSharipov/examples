import styled from 'styled-components'

import { Photo } from 'components/shared'

import { RESTAURANT_PLACEHOLDER_IMAGE } from 'defaults'

interface IProps {
  type?: 'restaurant'
}

const srcSet = {
  restaurant: RESTAURANT_PLACEHOLDER_IMAGE,
}

export default styled(Photo).attrs(({ type = 'restaurant' }: IProps) => ({ src: srcSet[type] }))``
