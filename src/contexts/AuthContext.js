import React, {
  useReducer,
  useCallback,
  createContext,
  useMemo,
  useEffect,
} from 'react';
import storage from 'src/services/storage';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOADING = 'LOADING';

const APP_LOGGED_KEY = 'app.logged_key';

const AuthContext = createContext();

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_STATE = 'SET_STATE';

function reducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return LOGGED_IN;
    case LOGOUT:
      return LOGGED_OUT;
    case SET_STATE:
      return action.payload;
    default:
      return state;
  }
}

export function AuthContextProvider({children}) {
  const [state, dispatch] = useReducer(reducer, LOADING);

  const login = useCallback(() => {
    storage.set(APP_LOGGED_KEY, LOGGED_IN);
    dispatch({type: LOGIN});
  }, [dispatch]);

  const logout = useCallback(() => {
    storage.set(APP_LOGGED_KEY, LOGGED_OUT);
    dispatch({type: LOGOUT});
  }, [dispatch]);

  const contextValue = useMemo(
    () => ({
      login,
      logout,
      loggedState: state,
    }),
    [login, logout, state],
  );

  useEffect(function() {
    async function fetchState() {
      const status = await storage.get(APP_LOGGED_KEY);
      dispatch({
        type: SET_STATE,
        payload: status ?? LOGGED_OUT,
      });
    }
    fetchState();
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
