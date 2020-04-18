import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0e0e0',
    padding: 15,
  },
});

const App = () => (
  <SafeAreaView>
    <View style={styles.container}>
      <Text>Hola mundo</Text>
    </View>
  </SafeAreaView>
);

export default App;
