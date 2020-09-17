import { FC, ReactNode } from 'react'

import { Wrapper } from '.'

interface IProps {
  children: ReactNode
  isExpanded: boolean
  onClick: () => void
}

const Row: FC<IProps> = ({ children, isExpanded, onClick }) =>
  <Wrapper
    isExpanded={isExpanded}
    onClick={onClick}
  >
    {children}
  </Wrapper>

export default Row
