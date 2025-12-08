import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
        <Tab.Screen name="Raporlar" component={ReportsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
