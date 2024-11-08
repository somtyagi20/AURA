import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Adjust the import path as necessary
import HomeScreen from '../../screens/home-screen/HomeScreen';
import CameraFeed from '../../screens/live-camera-feed-screen/CameraFeedScreen';
import DeviceScreen from '../../screens/device-screen/DeviceScreen';
import NotificationScreen from '../../screens/notification-screen/NotificationScreen';
import ProfileScreen from '../../screens/profile-screen/ProfileScreen';

type TabStackParamList = {
  Home: undefined;
  CameraFeed: undefined;
  Device: undefined;
  Notification: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator: React.FC = () => {
  const tabs = [
    { name: 'Home', icon: 'home', component: HomeScreen },
    { name: 'CameraFeed', icon: 'camera', component: CameraFeed },
    { name: 'Device', icon: 'view-grid', component: DeviceScreen },
    { name: 'Notification', icon: 'bell', component: NotificationScreen },
    { name: 'Profile', icon: 'account', component: ProfileScreen },
  ];

  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName="Home"
      screenOptions={{ headerShown: false, tabBarStyle: {
        height: 60,
        paddingBottom: 5,
      }}}
    >
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name={tab.icon} color={color} size={size || 24} />
            ),
            tabBarShowLabel: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
