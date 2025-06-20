import { Ionicons } from '@expo/vector-icons'
import React, { FC } from 'react'
import { ltuBlue } from '../../constants/colors'
import { IconProps } from './icon.types'

export const LtuIcon: FC<IconProps> = ({
  name,
  size = 24,
  color = ltuBlue,
  style,
}) => <Ionicons name={name} size={size} color={color} style={style} />
