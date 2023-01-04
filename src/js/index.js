import '../css/all.css';
import '../css/media.scss';

import { StorageHelper } from './helpers/StorageHelper';
import { DOMHelper } from './helpers/DOMHelper';

import { Model } from './Model';
import { View } from './View';
import { Controller } from './Controller';

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

const model = new Model(recents || []);
model.on('change', (recents) => StorageHelper.setItem('recents', recents));

const view = new View(new DOMHelper(units));
const controller = new Controller(model, view);

controller.init();
