import { apiRequest } from './api';

export const getCurrentLocation = (currentCity) =>
  apiRequest(`geo/1.0/direct?q=${currentCity}&limit=5`);
export const getTodayswWeatherData = (lat, lon) =>
  apiRequest(`data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`);
export const getForecastData = (lat, lon) =>
  apiRequest(`data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=27&units=metric`);
