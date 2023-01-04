import { EventEmitter } from "./helpers/EventEmitter.js";
import { getCurrentLocation, getTodayswWeatherData, getForecastData } from "./services/forecast-service-api.js";

export class Model extends EventEmitter {
    constructor(recents = []) {
        super();
        this.defCity = 'Minsk';
        this.defChoice = 0;

        this.maxLength = 10;
        this.recents = JSON.parse(recents);
    };

    async getLocation(city, choice = undefined){
        let data = await getCurrentLocation(city);

        if(choice === undefined){
            return data;
        } else {
            return data[choice];
        }
    }

    async getLocationData(city = this.defCity, choice = this.defChoice){
        const currentLocation = await this.getLocation(city, choice);
        const currentWeatherData = await getTodayswWeatherData(currentLocation.lat, currentLocation.lon);
        const forecastData = await getForecastData(currentLocation.lat, currentLocation.lon);

        const locationData = {
            location: currentLocation,
            now: currentWeatherData,
            forc: forecastData,
        }

        return locationData;
    }

    async getLocationList(writtenData){
        let data = await this.getLocation(writtenData);

        return data;
    }

    addRecent(recent){
        if(!this.recents.length){
            this.recents.push(recent);
            this.emit('change', this.recents);
    
            return this.recents;
        }

        let match = this.recents.filter(item => {
            if(item.location === recent.location){
                return item;
            }
        });

        if(!match.length){
            if(this.recents.length < this.maxLength){
                this.recents.push(recent);
    
            } else if(this.recents.length === this.maxLength){
                this.recents.shift();
                this.recents.push(recent);
            }
    
            this.emit('change', this.recents);
    
            return this.recents;
        }

        return;
    }

    deleteRecent(id){
        let updatedRecents = this.recents.filter(item => {
            if(item.id !== parseInt(id)){
                return item;
            }
        });

        this.recents = updatedRecents;

        this.emit('change', this.recents);

        return this.recents;
    }
    
    onStart(){
        return this.recents;
    }

}