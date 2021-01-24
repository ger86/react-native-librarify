import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LOGIN} from 'src/consts/screens';
import Login from 'src/views/Login/Login';

const LoggedOutStackNavigator = createStackNavigator();

export default function LoggedOutScreens() {
  return (
    <LoggedOutStackNavigator.Navigator>
      <LoggedOutStackNavigator.Screen name={LOGIN} component={Login} />
    </LoggedOutStackNavigator.Navigator>
  );
}
