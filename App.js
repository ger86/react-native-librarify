import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContextProvider} from './src/contexts/AuthContext';
import SwitchAuthScreens from './SwitchAuthScreens';

function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <SwitchAuthScreens />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default App;
