import {useCallback} from 'react';
import {useQuery, queryCache} from 'react-query';
import apiFetch from 'src/services/apiFetch';

const GET_AUTHORS = 'GET_AUTHORS';

export default function useAuthors() {
  async function fetchAuthors() {
    const response = await apiFetch('/authors');
    const json = await response.json();
    return json;
  }
  return useQuery(GET_AUTHORS, fetchAuthors);
}

export function useInvalidateAuthors() {
  const invalidateCache = useCallback(function() {
    queryCache.invalidateQueries(GET_AUTHORS);
  }, []);
  return invalidateCache;
}
