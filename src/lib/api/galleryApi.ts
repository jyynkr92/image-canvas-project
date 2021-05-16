import axios from 'axios';

const client = axios.create({
  baseURL: 'https://picsum.photos/v2',
});

export function getGalleryList() {
  const response = client.get('/list');
  return response;
}
