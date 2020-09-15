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
import {
  ADD_BOOK,
  BOOK_DETAIL,
  BOOK_EDIT,
  SELECT_CATEGORY_MODAL,
} from 'src/consts/screens';

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
      <LibraryStack.Screen name={BOOK_DETAIL} component={BookDetail} />
      <LibraryStack.Screen name={BOOK_EDIT} component={BookEdit} />
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
        name={SELECT_CATEGORY_MODAL}
        component={SelectCategory}
      />
    </LibraryRootStack.Navigator>
  );
}

function AddBookStackScreen() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name={ADD_BOOK}
        component={AddBook}
        options={{title: 'Añadir libro'}}
      />
    </LibraryStack.Navigator>
  );
}

function AddBookRootStackScreen() {
  return (
    <LibraryRootStack.Navigator mode="modal">
      <LibraryRootStack.Screen
        name="AddBookStackScreen"
        component={AddBookStackScreen}
        options={{headerShown: false}}
      />
      <LibraryRootStack.Screen
        name={SELECT_CATEGORY_MODAL}
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
          component={AddBookRootStackScreen}
          options={{title: 'Añadir libro'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  </LibraryContextProvider>
);

export default App;
