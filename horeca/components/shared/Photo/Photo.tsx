import { FC } from 'react'

import { Content, Wrapper } from '.'

interface IProps {
  src: string
}

const Photo: FC<IProps> = ({ src }) => {
  return (
    <Wrapper>
      <Content src={src} />
    </Wrapper>
  )
}

export default Photo
