import {useContext} from 'react';
import LibraryContext from '../contexts/LibraryContext';

export default function useLibraryContext() {
  return useContext(LibraryContext);
}
