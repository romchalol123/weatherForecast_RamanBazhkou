import { EventEmitter } from "./helpers/EventEmitter.js";

const IMG_DOUBLE_SCALE = '2x';

export class View extends EventEmitter{
    constructor(domElementConstructor) {
        super();

        this.domElementConstructor = domElementConstructor;
        this.form = document.querySelector('#search-form');
        this.formInput = document.querySelector('#search-input');
        this.resultBox = document.querySelector('.dropped-box');
        this.searchList = document.querySelector('.search-list');
        this.recentsList = document.querySelector('.recents-list');
        this.empty = document.querySelector('.empty-msg');
        this.title = document.querySelector('.location');
        this.weatherBox = document.querySelector('.weather-info');
        this.forecastBox = document.querySelector('.forecast-container');

        this.resultBox.addEventListener('click', this.handleUpdateWeather.bind(this));
        window.addEventListener('click', this.handleResBoxBehavior.bind(this));
        this.form.addEventListener('submit', this.handleCreateLocationList.bind(this));
    }

    showTitle(location){
        this.title.textContent = `${location.name}, ${location.sys.country}`;
    }

    showWeather(data){
        this.showTitle(data.now);
        let weatherCard = this.createCurrentWeather(data.now);
        this.weatherBox.append(weatherCard);

        this.showWeatherForecast(data.forc.list);
    }

    clearCityData(){
        this.weatherBox.textContent = '';
        this.forecastBox.textContent = '';
        return;
    }

    updateWeather(data){
        this.clearCityData();
        return this.showWeather(data);
    }

    convertDateToUTC(date){
        let newDate = new Date(date * 1000);
        newDate = newDate.toUTCString().slice(0, 11);
        return newDate;
    }

    convertTimeToUTC(date){
        let newDate = new Date(date * 1000);
        let hours = newDate.getUTCHours();
        let mins = newDate.getUTCMinutes();

        if (mins < 10) {
            mins = `0${mins}`;
        } 

        return `${hours}:${mins}`;
    }

    showWeatherForecast(locationData){
        locationData.forEach((item) => {
            let newFCCard = this.createWeatherForecastCard(item, item.dt);

            this.forecastBox.append(newFCCard);
        });

        return this.forecastBox;
    }

    showLocationList(data){
        this.searchList.textContent = '';
        this.resultBox.style.display = 'block';

        data.forEach((item, index) => {
            let listItem = this.domElementConstructor.createLocationItem(item, index);
            this.searchList.append(listItem);
        });
    }

    showRecentsList(data){
        this.recentsList.textContent = '';
        
        if(data){
            this.empty.style.display = 'none';

            data.forEach((item) => {
                let deleteBtn = this.domElementConstructor.createRecentDeleteBtn(item.id);
                let listItem = this.domElementConstructor.createLocationItem(item.location, item.id, 'rec', [deleteBtn]);
                this.recentsList.append(listItem);
            });
        } else {
            this.empty.style.display = 'block';
        }
    }

    /* ---------------- handlers -------------------- */

    handleUpdateWeather(event){
        const element = event.target;

        if(element.className === 'list-item'){
            if(!!element.closest('.search-list')){
                this.emit('add', element.textContent);
            }
            
            this.emit('update', element.textContent);
        }

        if(element.className === 'btn-close'){
            this.emit('delete', element.id);
        }
    }

    handleCreateLocationList(event){
        event.preventDefault();
        const writtenText = this.formInput.value;
        this.formInput.value = '';

        if(writtenText.trim() === ''){
            alert('Please, enter valid location value!');

            return;
        }

        this.emit('load', writtenText);
    }

    handleResBoxBehavior(event){
        let element = event.target;

        if(element.id === this.formInput.id || element.className === 'btn-close'){
            this.resultBox.style.display = 'block';
        } else {
            this.resultBox.style.display = 'none';
        }
    }

    /* ------------ dom-element creators ------------ */

    createCurrentWeather(location){
        const date = this.domElementConstructor.createDate(this.convertDateToUTC(location.dt), 'h4');
        const dailyTemp = this.domElementConstructor.createAvgTemp(location.main.temp_max, location.main.temp_min);
        const conditionImg = this.domElementConstructor.createConditionImg(location.weather[0].icon, IMG_DOUBLE_SCALE);
        const description = this.domElementConstructor.createDescription(location.weather[0].description);
        const tempNow = this.domElementConstructor.createNowNFeelTemp(location.main.temp, location.main.feels_like);
        const addTitleCont = this.domElementConstructor.createBoxElement('div', ['title-box'], [date, dailyTemp, conditionImg, description, tempNow]);

        const wind = this.domElementConstructor.createAddParameter('wind', 'Wind speed', location.wind.speed, location.wind.deg);
        const humidity = this.domElementConstructor.createAddParameter('hum', 'Humidity', location.main.humidity);
        const pressure = this.domElementConstructor.createAddParameter('pres', 'Pressure', location.main.pressure);
        const visibility = this.domElementConstructor.createAddParameter('vis', 'Visibility', (location.visibility/1000).toFixed(1));
        const addCont = this.domElementConstructor.createBoxElement('div', ['add-box'], [wind, humidity, pressure, visibility]);

        const sunTime = this.domElementConstructor.createSunTime(this.convertTimeToUTC(location.sys.sunrise), this.convertTimeToUTC(location.sys.sunset));
        
        return this.domElementConstructor.createBoxElement('div', ['bg-cont'], [addTitleCont, addCont, sunTime]);
    }

    createWeatherForecastCard(data){
        const newDate = this.domElementConstructor.createDate(this.convertDateToUTC(data.dt));
        const timeStamp = this.domElementConstructor.createTime(this.convertTimeToUTC(data.dt));
        const conditionImg = this.domElementConstructor.createConditionImg(data.weather[0].icon);
        const currTemp = this.domElementConstructor.createTemp(data.main.temp);

        const leftPart = this.domElementConstructor.createBoxElement('div', ['left-part'], [newDate, timeStamp, conditionImg, currTemp])

        const status = this.domElementConstructor.createDescription(data.weather[0].description);

        return this.domElementConstructor.createBoxElement('div', ['card'], [leftPart, status], [{prop:'id', value: data.dt}]);
    }
}