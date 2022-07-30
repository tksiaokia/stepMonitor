import {createTheme, ThemeProvider} from '@rneui/themed';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {Home} from './src/containers';
import {store} from './src/redux/store';
import {Colors} from './node_modules/@rneui/base/dist/helpers/colors.d';
import RNLocation from 'react-native-location';

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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{backgroundColor: '#81B622'}}>
          <Home />
        </SafeAreaView>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
