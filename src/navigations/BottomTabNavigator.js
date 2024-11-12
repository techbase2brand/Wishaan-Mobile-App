import {Image, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import AccountScreen from '../screens/AccountScreen';
import CartScreen from '../screens/CartScreen';
import SavedScreen from '../screens/SavedScreen';
import {grayColor, redColor, whiteColor} from '../constants/Color';
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
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DeleteAccount from '../screens/DeleteAccount';
import DeleteAccountConfirmation from '../screens/DeleteAccountConfirmation';
import NotificationScreen from '../screens/NotificationScreen';
import ReferralScreen from '../screens/ReferralScreen';
import ReportIssueScreen from '../screens/ReportIssueScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {widthPercentageToDP as wp} from '../utils';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const totalQuantity = 4;
const totalSavedQuantity = 8;
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
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
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
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
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
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
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
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeleteAccountConfirmation"
        component={DeleteAccountConfirmation}
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
      <Stack.Screen
        name="ReferralScreen"
        component={ReferralScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReportIssueScreen"
        component={ReportIssueScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  // if (isLoading) {
  //   return <SplashScreen />; // Render the splash screen while loading
  // }
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
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    height: 10,
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}>
                  {totalSavedQuantity > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 6,
                        backgroundColor: redColor,
                        borderRadius: wp(2),
                        width: wp(4),
                        height: wp(4),
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 999,
                      }}>
                      <Text
                        style={{
                          color: whiteColor,
                          fontSize: wp(2.5),
                          fontWeight: 'bold',
                        }}>
                        {totalQuantity}
                      </Text>
                    </View>
                  )}
                </View>
                <Image
                  source={SAVED_ICON}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? redColor : grayColor,
                  }}
                />
              </View>
            ),
          };
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        // options={{headerShown: false}}
        options={{
          tabBarStyle: {backgroundColor: whiteColor},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <View
                style={{
                  height: 10,
                  width: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}>
                {totalQuantity > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 10,
                      backgroundColor: redColor,
                      borderRadius: wp(2),
                      width: wp(4),
                      height: wp(4),
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 999,
                    }}>
                    <Text
                      style={{
                        color: whiteColor,
                        fontSize: wp(2.5),
                        fontWeight: 'bold',
                      }}>
                      {totalQuantity}
                    </Text>
                  </View>
                )}
              </View>
              <Image
                source={CART_ICON}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? redColor : grayColor,
                }}
              />
            </View>
          ),
        }}
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
                routeName == 'AccountSettings' ||
                routeName == 'ReportIssueScreen' ||
                routeName == 'ProfileScreen'
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
