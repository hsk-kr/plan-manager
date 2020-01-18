import React from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import PlanListNavigator from './PlanListNavigator';
import PlanHistoryNavigator from './PlanHistoryNavigator';
import SettingsNavigator from './SettingsNavigator';

const AppContainer = createBottomTabNavigator(
  {
    PlanList: {
      screen: PlanListNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name='list' type='font-awesome' color={tintColor} size={24} />
        )
      })
    },
    PlanHistory: {
      screen: PlanHistoryNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name='bar-chart' type='font-awesome' color={tintColor} size={24} />
        )
      })
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name='cogs' type='font-awesome' color={tintColor} size={24} />
        )
      })
    }
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#353b48',
      inactiveTintColor: '#a4b0be',
      activeBackgroundColor: '#d1d8e0',
      inactiveBackgroundColor: '#ffffff'
    }
  }
);

export default createAppContainer(AppContainer);