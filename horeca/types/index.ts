import { FC, ReactNode } from 'react'

import { stores } from 'stores'

type Stores = Partial<typeof stores>

export type ConnectedComponent<T = any> = FC<{
  className?: string
  children?: ReactNode
} & T & Stores>

export type UUID = string

export type NavItem<T = string> = {
  name: T,
  label: string,
  isDisabled?: boolean
}

export type MediaUri = {
  url: string
}

export type MovementDirection = 'left' | 'right' | 'up' | 'down'

export type Coordinates = {
  x: number,
  y: number,
}

export type DistanceUnits = 'm' | 'km'
