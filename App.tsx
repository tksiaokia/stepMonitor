import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { Home } from './src/containers';
import { store } from './src/redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" hidden />
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
