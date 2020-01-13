import { createStackNavigator } from 'react-navigation-stack';
import PlanManager from '../containers/PlanManagerContainer';
import theme from '../theme';

const PlanManagementNavigator = createStackNavigator(
  {
    PlanManager: {
      screen: PlanManager,
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

export default PlanManagementNavigator;