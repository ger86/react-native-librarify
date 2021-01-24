import {useContext} from 'react';
import AuthContext from 'src/contexts/AuthContext';

export default function useAuthContext() {
  return useContext(AuthContext);
}
