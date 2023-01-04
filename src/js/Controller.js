export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('load', this.getLocationList.bind(this));
        view.on('add', this.addRecent.bind(this));
        view.on('update', this.updateLocation.bind(this));
        view.on('delete', this.deleteRecent.bind(this));
    }
    
    async init(){
        const locationData = await this.model.getLocationData();
        const recents = this.model.onStart();

        this.view.showRecentsList(recents);
        this.view.showWeather(locationData);
    }

    async getLocationList(writtenData){
        let data = await this.model.getLocationList(writtenData);

        this.view.showLocationList(data);
    }

    async updateLocation(locationName){
        let data = await this.model.getLocationData(locationName);

        this.view.updateWeather(data);
    }

    addRecent(locationName){
        let recents = this.model.addRecent({
            location: locationName,
            id: Date.now(),
        });

        this.view.showRecentsList(recents)
    }

    deleteRecent(id){
        let recents = this.model.deleteRecent(id);

        this.view.showRecentsList(recents);
    }

}
