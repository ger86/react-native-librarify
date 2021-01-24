import React from 'react';
import useAuthContext from 'src/hooks/useAuthContext';
import LoggedInScreens from './LoggedInScreens';
import LoggedOutScreens from './LoggedOutScreens';

function SwitchAuthScreens(props) {
  const {isLoggedIn} = useAuthContext();

  if (isLoggedIn) {
    return <LoggedInScreens />;
  }

  return <LoggedOutScreens />;
}

export default SwitchAuthScreens;
