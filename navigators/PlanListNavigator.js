import { createStackNavigator } from 'react-navigation-stack';
import PlanList from '../containers/PlanList';
import PlanDetail from '../containers/PlanDetail';

const PlanListNavigator = createStackNavigator(
  {
    PlanList: {
      screen: PlanList,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('title') || '',
        headerStyle: {
          backgroundColor: navigation.getParam('headerBackgroundColor') || '#ffffff'
        },
        headerTitleStyle: {
          color: navigation.getParam('headerTitleColor') || '#000000',
        },
        headerShown: navigation.getParam('shown') || false
      })
    },
    PlanDetail: {
      screen: PlanDetail,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerStyle: {
          backgroundColor: navigation.getParam('headerBackgroundColor') || '#ffffff'
        },
        headerShown: navigation.getParam('shown') || false
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);

export default PlanListNavigator;