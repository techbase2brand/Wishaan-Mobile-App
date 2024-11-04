import {Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
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
import ReelsScreen from '../screens/ReelsScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import OrderHistory from '../screens/OrderHistory';
import PickupAddressScreen from '../screens/PickupAddressScreen';
import ConfirmDeliveryLocation from '../screens/ConfirmDeliveryLocation';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SearchScreen from '../screens/SearchScreen';
import SellerProfileScreen from '../screens/SellerProfileScreen';
import {useEffect, useState} from 'react';
import SplashScreen from '../screens/SplashScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReelsScreen"
        component={ReelsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AddressStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Address"
        component={PickupAddressScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConfirmDeliveryLocation"
        component={ConfirmDeliveryLocation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function SavedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Saved"
        component={SavedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SellerProfile"
        component={SellerProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={({route}) => ({
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="PickupAddressScreen"
        component={PickupAddressScreen}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="ReportIssueScreen"
        component={ReportIssueScreen}
        options={({ route }) => ({
          headerShown: false,
        })}
      /> */}
      {/* <Stack.Screen
        name="ReturnRequestScreen"
        component={ReturnRequestScreen}
        options={({ route }) => ({
          headerShown: false,
        })} ReturnRequestScreen
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={({ route }) => ({
          headerShown: false,
        })} ReturnRequestScreen
      /> */}
      {/* <Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={({ route }) => ({
          headerShown: false,
        })} ReturnRequestScreen
      /> */}
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Orders"
        component={OrderHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Address"
        component={AddressStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />; // Render the splash screen while loading
  }
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
            {route?.name}
          </Text>
        ),
      })}
      tabBarOptions={{
        style: {height: 70, paddingBottom: 10, paddingTop: 10},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Saved"
        component={SavedStack}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          return {
            tabBarStyle: {
              display:
                routeName == 'Saved' ||
                routeName == 'ReviewScreen' ||
                routeName == 'ProductDetails'
                  ? 'none'
                  : 'flex',
            },
            headerShown: false,
          };
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Account"
        component={ProfileStack}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          return {
            tabBarStyle: {
              display:
                routeName == 'Account' ||
                routeName == 'Address' ||
                routeName == 'ConfirmDeliveryLocation' ||
                routeName == 'AccountSettings'
                  ? 'none'
                  : 'flex',
            },
            headerShown: false,
          };
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
