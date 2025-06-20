import React, { FC } from 'react'
import { View } from 'react-native'
import { CardProps } from './card.types'
import { CardStyles } from './card.styles'

export const LtuCard: FC<CardProps> = ({
  children,
  style,
  xsBorder = false,
  topRightIndicator,
}) => {
  const styles = CardStyles({ xsBorder })
  return <View style={[styles.card, style]}>
    {topRightIndicator && (
      <View style={styles.topRightIndicatorContainer}>
        {topRightIndicator}
      </View>
    )}
    {children}
  </View>
}
