import React, {useState} from 'react';
import {View, Button, StyleSheet, TextInput, Text} from 'react-native';
import useAuthContext from 'src/hooks/useAuthContext';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 16,
    color: '#c00',
  },
});

function Login(props) {
  const {login} = useAuthContext();
  const [magicWord, setMagicWord] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (magicWord === 'LATTEANDCODE') {
      login();
    } else {
      setError('Introduce la palabra mágica');
    }
  }
  return (
    <View>
      <TextInput
        placeholder="Escribe la palabra mágica"
        value={magicWord}
        onChangeText={setMagicWord}
      />
      <Button title="Iniciar sesión" onPress={handleSubmit} />
      {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default Login;
