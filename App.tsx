// App.tsx

import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './gluestack-ui.config';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    // This Provider makes the Redux store available to the entire app
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        {/* The AppNavigator will handle all screen rendering */}
        <AppNavigator />
      </GluestackUIProvider>
    </Provider>
  );
};

export default App;
