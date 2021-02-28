import React from 'react';
import {StyleSheet} from 'react-native';
import {Text as RNEText} from 'react-native-elements';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Open Sans',
  },
});

function Text({children, ...props}) {
  return (
    <RNEText style={styles.text} {...props}>
      {children}
    </RNEText>
  );
}

export default Text;
