import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
}, 
{
  initialRouteName: 'Home',
  headerMode: 'none',
});

export default createAppContainer(AppNavigator);
