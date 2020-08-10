import {useQuery} from 'react-query';

const GET_BOOK = 'GET_BOOK';

export default function useBook({bookId}) {
  async function fetchBook() {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}`);
    const json = await response.json();
    return json;
  }
  return useQuery([GET_BOOK, bookId], fetchBook);
}
