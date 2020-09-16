import {useCallback} from 'react';
import {useQuery, queryCache} from 'react-query';
import apiFetch from 'src/services/apiFetch';

const GET_CATEGORIES = 'GET_CATEGORIES';

export default function useCategories() {
  async function fetchCategories() {
    const response = await apiFetch('/categories');
    const json = await response.json();
    return json;
  }
  return useQuery(GET_CATEGORIES, fetchCategories);
}

export function useInvalidateCategories() {
  const invalidateCache = useCallback(function() {
    queryCache.invalidateQueries(GET_CATEGORIES);
  }, []);
  return invalidateCache;
}
