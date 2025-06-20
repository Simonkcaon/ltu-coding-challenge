import React, { FC } from 'react'
import { Text } from 'react-native'
import { LtuTextProps } from './text.types'
import { TextStyles } from './text.styles'
export const LtuText: FC<LtuTextProps> = ({
  children,
  bold,
  style,
  size,
  textCenter,
  ...props
}) => (
  <Text
    style={[
      TextStyles.text,
      style,
      size === 'xs' && { fontSize: 12 },
      size === 'sm' && { fontSize: 14 },
      size === 'md' && { fontSize: 16 },
      size === 'lg' && { fontSize: 18 },
      bold && { fontWeight: 'bold', fontFamily: 'PrimaryFont-700' },
      textCenter && { textAlign: 'center' },
    ]}
    {...props}
  >
    {children}
  </Text>
)
