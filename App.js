import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BooksList from './src/views/Library/BooksList';
import BookDetail from './src/views/Library/BookDetail';
import AddBook from './src/views/AddBook/AddBook';

const Tab = createBottomTabNavigator();

const LibraryStack = createStackNavigator();

function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="BooksList"
        component={BooksList}
        options={{title: 'Inicio'}}
      />
      <LibraryStack.Screen name="BookDetail" component={BookDetail} />
    </LibraryStack.Navigator>
  );
}

const App = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="LibraryTab" component={LibraryStackScreen} />
      <Tab.Screen name="AddBookTab" component={AddBook} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;
