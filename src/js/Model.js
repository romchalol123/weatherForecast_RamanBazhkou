import { EventEmitter } from './helpers/EventEmitter';
import { getCurrentLocation, getTodayswWeatherData, getForecastData } from './services/forecast-service-api';

export class Model extends EventEmitter {
  constructor(recents = []) {
    super();
    this.defCity = 'Minsk';
    this.defChoice = 0;

    this.maxLength = 10;
    this.recents = recents;
  }

  async getLocation(city, choice = undefined) {
    const data = await getCurrentLocation(city);

    if (choice === undefined) {
      return data;
    }
    return data[choice];
  }

  async getLocationData(city = this.defCity, choice = this.defChoice) {
    const currentLocation = await this.getLocation(city, choice);
    const currentWeatherData = await getTodayswWeatherData(currentLocation.lat, currentLocation.lon);
    const forecastData = await getForecastData(currentLocation.lat, currentLocation.lon);

    const locationData = {
      location: currentLocation,
      now: currentWeatherData,
      forc: forecastData,
    };

    return locationData;
  }

  async getLocationList(writtenData) {
    const data = await this.getLocation(writtenData);

    return data;
  }

  addRecent(recent) {
    if (!this.recents.length) {
      this.recents.push(recent);
      this.emit('change', this.recents);

      return this.recents;
    }

    const match = this.recents.filter((item) => item.location === recent.location);

    if (!match.length) {
      if (this.recents.length < this.maxLength) {
        this.recents.push(recent);
      } else if (this.recents.length === this.maxLength) {
        this.recents.shift();
        this.recents.push(recent);
      }

      this.emit('change', this.recents);

      return this.recents;
    } else {
      return this.recents;
    }
  }

  deleteRecent(id) {
    const updatedRecents = this.recents.filter((item) => {
      if (item.id !== parseInt(id)) {
        return item;
      }
    });

    this.recents = updatedRecents;

    this.emit('change', this.recents);

    return this.recents;
  }

  onStart() {
    return this.recents;
  }
}
