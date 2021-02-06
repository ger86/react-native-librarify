import React from 'react';
import {View, Text} from 'react-native';
import {LOGGED_IN, LOADING} from 'src/contexts/AuthContext';
import useAuthContext from 'src/hooks/useAuthContext';
import LoggedInScreens from './LoggedInScreens';
import LoggedOutScreens from './LoggedOutScreens';

function SwitchAuthScreens(props) {
  const {loggedState} = useAuthContext();

  if (loggedState === LOADING) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (loggedState === LOGGED_IN) {
    return <LoggedInScreens />;
  }

  return <LoggedOutScreens />;
}

export default SwitchAuthScreens;
