import React from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import PlanListNavigator from './PlanListNavigator';
import PlanManagementNavigator from './PlanManagementNavigator';
import SettingsNavigator from './SettingsNavigator';
import theme from '../theme';

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
    PlanMananger: {
      screen: PlanManagementNavigator,
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
      activeTintColor: theme.main,
      inactiveTintColor: theme.inactive,
      activeBackgroundColor: theme.activeBackground,
      inactiveBackgroundColor: theme.tabBackground
    }
  }
);

export default createAppContainer(AppContainer);