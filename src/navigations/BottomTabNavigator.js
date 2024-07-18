import {Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import AccountScreen from '../screens/AccountScreen';
import CartScreen from '../screens/CartScreen';
import SavedScreen from '../screens/SavedScreen';
import {grayColor, redColor} from '../constants/Color';
import {
  ACCOUNT_ICON,
  CART_ICON,
  HOME_ICON,
  SAVED_ICON,
  WALLET_ICON,
} from '../assets/Image';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          let iconSource;

          if (route.name === 'Home') {
            iconSource = HOME_ICON;
          } else if (route.name === 'Wallet') {
            iconSource = WALLET_ICON;
          } else if (route.name === 'Saved') {
            iconSource = SAVED_ICON;
          } else if (route.name === 'Cart') {
            iconSource = CART_ICON;
          } else if (route.name === 'Account') {
            iconSource = ACCOUNT_ICON;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                tintColor: focused ? redColor : grayColor,
              }}
            />
          );
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? redColor : grayColor,
              fontSize: 12,
              marginTop: -5,
            }}>
            {route.name}
          </Text>
        ),
      })}
      tabBarOptions={{
        style: {height: 70, paddingBottom: 10, paddingTop: 10},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
