import { FC, ReactNode } from 'react'

import { Wrapper } from '.'

interface IProps {
  children: ReactNode
}

const Content: FC<IProps> = ({ children }) =>
  <Wrapper>
    {children}
  </Wrapper>

export default Content
