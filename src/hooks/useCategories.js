import {useQuery} from 'react-query';
import apiFetch from 'src/services/apiFetch';

const GET_CATEGORIES = 'GET_CATEGORIES';

export default function useBook() {
  async function fetchCategories() {
    const response = await apiFetch('/categories');
    const json = await response.json();
    return json;
  }
  return useQuery(GET_CATEGORIES, fetchCategories);
}
