import {useCallback} from 'react';
import {useQuery, queryCache} from 'react-query';
import apiFetch from 'src/services/apiFetch';

const GET_BOOK = 'GET_BOOK';

export default function useBook({bookId}) {
  async function fetchBook() {
    const response = await apiFetch(`/books/${bookId}`);
    const json = await response.json();
    return json;
  }
  return useQuery([GET_BOOK, bookId], fetchBook);
}

export function useInvalidateBook({bookId}) {
  const invalidateCache = useCallback(
    function() {
      queryCache.invalidateQueries([GET_BOOK, bookId]);
    },
    [bookId],
  );
  return invalidateCache;
}
