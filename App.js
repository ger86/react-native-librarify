import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LibraryContextProvider} from './src/contexts/LibraryContext';
import BooksList from './src/views/Library/BooksList';
import BookDetail from './src/views/Library/BookDetail';
import BookEdit from './src/views/Library/BookEdit';
import AddBook from './src/views/AddBook/AddBook';
import SelectCategory from './src/views/Category/SelectCategory';

const Tab = createBottomTabNavigator();

const LibraryRootStack = createStackNavigator();
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
      <LibraryStack.Screen name="BookEdit" component={BookEdit} />
    </LibraryStack.Navigator>
  );
}

function LibraryRootStackScreen() {
  return (
    <LibraryRootStack.Navigator mode="modal">
      <LibraryRootStack.Screen
        name="LibraryStackScreen"
        component={LibraryStackScreen}
        options={{headerShown: false}}
      />
      <LibraryRootStack.Screen
        name="SelectCategoryModal"
        component={SelectCategory}
      />
    </LibraryRootStack.Navigator>
  );
}

const App = () => (
  <LibraryContextProvider>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="LibraryTab"
          component={LibraryRootStackScreen}
          options={{title: 'Librería'}}
        />
        <Tab.Screen
          name="AddBookTab"
          component={AddBook}
          options={{title: 'Añadir libro'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  </LibraryContextProvider>
);

export default App;
