import { createStackNavigator } from 'react-navigation-stack';
import PlanHistory from '../containers/PlanHistoryContainer';

const PlanHistoryNavigator = createStackNavigator(
  {
    PlanHistory: {
      screen: PlanHistory,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('title') || '',
        headerStyle: {
          backgroundColor: navigation.getParam('headerBackgroundColor') || '#ffffff'
        },
        headerTitleStyle: {
          color: navigation.getParam('headerTitleColor') || '#000000',
        }
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);

export default PlanHistoryNavigator;