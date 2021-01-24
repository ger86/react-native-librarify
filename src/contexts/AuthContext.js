import React, {useReducer, useCallback, createContext, useMemo} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

function reducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
}

export function AuthContextProvider({children}) {
  const [state, dispatch] = useReducer(reducer, false);

  const login = useCallback(() => dispatch({type: LOGIN}), [dispatch]);

  const logout = useCallback(() => dispatch({type: LOGOUT}), [dispatch]);

  const contextValue = useMemo(
    () => ({
      login,
      logout,
      isLoggedIn: state,
    }),
    [login, logout, state],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
