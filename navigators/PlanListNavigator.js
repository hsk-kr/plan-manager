import { createStackNavigator } from 'react-navigation-stack';
import PlanList from '../containers/PlanListContainer';
import PlanDetail from '../containers/PlanDetailContainer';

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
        }
      })
    },
    PlanDetail: {
      screen: PlanDetail,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerStyle: {
          backgroundColor: navigation.getParam('headerBackgroundColor') || '#ffffff'
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

export default PlanListNavigator;