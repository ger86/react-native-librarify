import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

export default function Home({navigation}) {
  return (
    <View>
      <Text>Hola soy la home</Text>
      <TouchableHighlight onPress={() => navigation.navigate('Library')}>
        <Text>Ir a la librería</Text>
      </TouchableHighlight>
    </View>
  );
}
