import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { TabsNavigator } from './TabsNavigator'
import { ltuWhite } from '../constants/colors';

const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: ltuWhite,
    },
  };

export const RootNavigator = () => {
    return (
        <NavigationContainer theme={navTheme}>
            <TabsNavigator />
        </NavigationContainer>
    )
}
