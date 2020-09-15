import {API_TOKEN, BACKEND_URL} from 'src/consts/backend';

const apiFetch = (function() {
  const defaultOptions = {
    headers: {
      'X-AUTH-TOKEN': API_TOKEN,
      'Content-Type': 'application/json',
    },
  };

  return async function(path, options) {
    return fetch(`${BACKEND_URL}${path}`, {...defaultOptions, ...options});
  };
})();

export default apiFetch;
