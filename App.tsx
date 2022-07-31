import {createTheme, Icon, ThemeProvider} from '@rneui/themed';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {store} from './src/redux/store';
import RNLocation from 'react-native-location';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {BottomNavigationTabBar} from './src/components/base/BottomNavigationTabBar';

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
          <BottomNavigationTabBar />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
