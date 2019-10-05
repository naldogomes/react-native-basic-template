import { createStackNavigator, createAppContainer } from 'react-navigation';
import './config/StatusBarConfig';

import HomeScreen from './pages/HomeScreen';
import SplashScreen from './pages/SplashScreen';
import SignIn from './pages/SignIn';

const AppNavigator = createStackNavigator({
  'Splash': {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    },
  },
  'SignIn': {
    screen: SignIn,
    navigationOptions: {
      header: null
    },
  },
  'Home': {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    },
  },
}, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#3232ff",
      borderBottomWidth: 1,
      borderBottomColor: "#C5C5C5",
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,
    }
  }
});

const App = createAppContainer(AppNavigator);

export default App;
