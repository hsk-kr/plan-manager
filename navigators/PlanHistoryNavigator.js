import { createStackNavigator } from 'react-navigation-stack';
import PlanHistory from '../containers/PlanHistory';
import PlanHistoryList from '../containers/PlanHistoryList';
import PlanHistoryDetail from '../containers/PlanHistoryDetail';

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
    },
    PlanHistoryList: {
      screen: PlanHistoryList,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerStyle: {
          backgroundColor: navigation.getParam('headerBackgroundColor') || '#ffffff'
        },
      })
    },
    PlanHistoryDetail: {
      screen: PlanHistoryDetail,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerStyle: {
          backgroundColor: navigation.getParam('headerBackgroundColor') || '#ffffff'
        },
      })
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);

export default PlanHistoryNavigator;