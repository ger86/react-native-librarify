import React from 'react';
import {SafeAreaView, Button} from 'react-native';
import useAuthContext from 'src/hooks/useAuthContext';

function Profile(props) {
  const {logout} = useAuthContext();

  return (
    <SafeAreaView>
      <Button onPress={logout} title="Cerrar sesión" />
    </SafeAreaView>
  );
}

export default Profile;
