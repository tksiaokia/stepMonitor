import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Route} from '../../constants/constant';
import {HomeScreen, StepHistoryScreen, WeatherScreen} from '../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';

export const BottomNavigationTabBar = () => {
  const Tab = createBottomTabNavigator();

  const tabConfig = [
    {
      name: Route.WEATHER,
      iconName: 'cloud-sun',
      screen: WeatherScreen,
    },
    {
      name: Route.HOME,
      iconName: 'shoe-prints',
      screen: HomeScreen,
    },
    {
      name: Route.HISTORY,
      iconName: 'history',
      screen: StepHistoryScreen,
    },
  ];
  const tabs = tabConfig.map(config => {
    return (
      <Tab.Screen
        key={config.name}
        options={{
          tabBarLabel: config.name,
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({color}) => (
            <Icon
              name={config.iconName}
              type="font-awesome-5"
              color={color}
              size={26}
            />
          ),
        }}
        name={config.name}
        component={config.screen}
      />
    );
  });

  return (
    <Tab.Navigator
      initialRouteName={Route.HOME}
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: '#81B622',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        tabBarStyle: {
          paddingTop: 5,
          backgroundColor: '#81B622',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#ffffff80',
      })}>
      {tabs}
    </Tab.Navigator>
  );
};
