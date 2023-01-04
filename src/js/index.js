import { StorageHelper } from './helpers/StorageHelper.js';
import { DOMHelper } from "./helpers/DOMHelper.js";

import { Model } from './Model.js'
import { View } from './View.js'
import { Controller } from './Controller.js'

const units = {
    temp: '°C',
    pres: 'hPa',
    wind: 'm/s',
    hum: '%',
    vis: 'km',
    srise: '',
    sset: '',
};

const recents = StorageHelper.getItem('recents');

const model = new Model(JSON.parse(recents) || []);
model.on('change', (recents) => StorageHelper.setItem('recents', recents));

const view = new View(new DOMHelper(units));
const controller = new Controller(model, view);

controller.init();