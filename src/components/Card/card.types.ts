import { FC, ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export interface CardProps {
  children: ReactNode
  xsBorder?: boolean
  style?: StyleProp<ViewStyle>
  topRightIndicator?: ReactNode
}
