import { FC, ReactNode } from 'react'

import { Row, Wrapper } from '.'

interface IProps {
  children: ReactNode
}

type InfoTableComponent = FC<IProps> & {
  Row: any,
}

const InfoTable: InfoTableComponent = ({ children }) =>
  <Wrapper>
    {children}
  </Wrapper>

InfoTable.Row = Row

export default InfoTable
