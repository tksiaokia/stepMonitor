import {createTheme, Icon, ThemeProvider} from '@rneui/themed';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {Home} from './src/containers';
import {store} from './src/redux/store';
import {Colors} from './node_modules/@rneui/base/dist/helpers/colors.d';
import RNLocation from 'react-native-location';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {WeatherScreen} from './src/screens/WeatherScreen';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './src/screens/HomeScreen';

RNLocation.configure({
  distanceFilter: 5.0,
});

const myTheme = createTheme({
  Text: {
    style: {
      color: '#fff',
    },
  },
});

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Weather"
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
      <Tab.Screen
        options={{
          tabBarLabel: 'Weather',
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({color}) => (
            <Icon
              name="cloud-sun"
              type="font-awesome-5"
              color={color}
              size={26}
            />
          ),
        }}
        name="Weather"
        component={WeatherScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({color}) => (
            <Icon
              name="shoe-prints"
              type="font-awesome-5"
              color={color}
              size={26}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Steps History',
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({color}) => (
            <Icon
              name="history"
              type="font-awesome-5"
              color={color}
              size={26}
            />
          ),
        }}
        name="Steps History"
        component={WeatherScreen}
      />
    </Tab.Navigator>
  );
}
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#81B622',
  },
};
const App: React.FC = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer theme={navigationTheme}>
          <MyTabs />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
