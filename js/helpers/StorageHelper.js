export class StorageHelper {
    static getItem(key){
        const value = localStorage.getItem(key);

        if(value){
            return JSON.stringify(value);
        }

        return null;
    }

    static setItem(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

}