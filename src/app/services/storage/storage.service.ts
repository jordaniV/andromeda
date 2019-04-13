import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Sensor } from './../../domains/sensor';

const SENSORES_KEY = 'sensores';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }


  getAll(): Promise<Sensor[]> {

    return this.storage.get(SENSORES_KEY);

  }

  add(sensor: Sensor): Promise<any> {

    return this.storage
      .get(SENSORES_KEY)
      .then((sensores: Sensor[]) => {
        if (sensores) {
          sensores.push(sensor);
          return this.storage.set(SENSORES_KEY, sensores);
        } else {
          return this.storage.set(SENSORES_KEY, [sensor]);
        }
      });
  }

  update(sensor: Sensor): Promise<any> {

    return this.storage
      .get(SENSORES_KEY)
      .then((sensores: Sensor[]) => {
        if (!sensores || sensores.length === 0) {
          return null;
        }

        const novosSensores: Sensor[] = [];

        for (const i of sensores) {
          if (i.id === sensor.id) {
            novosSensores.push(sensor);
          } else {
            novosSensores.push(i);
          }
        }

        return this.storage.set(SENSORES_KEY, novosSensores);
      });

  }

  delete(id: number): Promise<Sensor> {

    return this.storage
      .get(SENSORES_KEY)
      .then((sensores: Sensor[]) => {
        if (!sensores || sensores.length === 0) {
          return null;
        }

        const toKeep: Sensor[] = [];

        for (const i of sensores) {
          if (i.id !== id) {
            toKeep.push(i);
          }
        }

        return this.storage.set(SENSORES_KEY, toKeep);
      });
  }
}
