import { StyleSheet } from 'react-native'
import { ltuRose } from '../../constants/colors'

type CardStylesProps = {
  xsBorder?: boolean;
};

export const CardStyles = ({ xsBorder }: CardStylesProps) =>
  StyleSheet.create({
    card: {
      borderRadius: xsBorder ? 10 : 20,
      padding: 17,
      backgroundColor: ltuRose,
    },
  })
