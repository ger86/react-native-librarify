import React from 'react';
import {Input} from 'react-native-elements';

export default function TextInput({label, onChangeText, value}) {
  return <Input label={label} onChangeText={onChangeText} value={value} />;
}
