import { createStackNavigator } from 'react-navigation-stack';
import Settings from '../containers/Settings';

const SettingsNavigator = createStackNavigator(
  {
    Settings: {
      screen: Settings,
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

export default SettingsNavigator;