import { FC, ReactNode } from 'react'

import { Label, Value, Wrapper } from '.'

interface IProps {
  children: ReactNode
}

type TotalComponent = FC<IProps> & {
  Label: any,
  Value: any,
}

const Total: TotalComponent = ({ children }) =>
  <Wrapper>
    {children}
  </Wrapper>

Total.Label = Label

Total.Value = Value

export default Total
