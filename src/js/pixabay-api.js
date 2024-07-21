import axios from 'axios';

const API_KEY = '44903420-1183eb8cf2f9f1f8b99b46ba0';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Network response was not ok');
  }
}
