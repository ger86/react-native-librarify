import {useQuery} from 'react-query';

const GET_CATEGORIES = 'GET_CATEGORIES';

export default function useCategories() {
  async function fetchCategories() {
    const response = await fetch('http://127.0.0.1:8000/api/categories');
    const json = await response.json();
    return json;
  }
  return useQuery(GET_CATEGORIES, fetchCategories);
}
