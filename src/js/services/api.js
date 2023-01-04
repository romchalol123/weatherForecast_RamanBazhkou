import { key } from './key';

const BASE_URL = 'http://api.openweathermap.org/';

export async function apiRequest(url) {
  const response = await fetch(`${BASE_URL}/${url}&appid=${key}`);

  if (response.status >= 400 && response.status < 600) {
    throw new Error(`Error status: ${response.status}. Error message: ${response.message}`);
  } else {
    const responseData = await response.json();

    return responseData;
  }
}
