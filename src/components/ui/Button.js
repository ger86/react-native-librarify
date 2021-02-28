import React from 'react';
import {Button as RNEButton} from 'react-native-elements';

export default function Button({title, onPress, disabled, type}) {
  return (
    <RNEButton
      title={title}
      onPress={onPress}
      disabled={disabled}
      type={type}
    />
  );
}
