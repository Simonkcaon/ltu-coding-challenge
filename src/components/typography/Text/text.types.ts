import { TextProps } from 'react-native'
import { ReactNode } from 'react'

export interface LtuTextProps extends TextProps {
  children: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
  bold?: boolean
  textCenter?: boolean
}
