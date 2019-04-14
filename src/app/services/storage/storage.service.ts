import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }


  getAll(KEY: string): Promise<any[]> {

    return this.storage.get(KEY);

  }

  add(array: any, KEY: string): Promise<any> {

    return this.storage
      .get(KEY)
      .then((items: any[]) => {
        if (items) {
          items.push(array);
          return this.storage.set(KEY, items);
        } else {
          return this.storage.set(KEY, [array]);
        }
      });
  }

  update(array: any, KEY: string): Promise<any> {

    return this.storage
      .get(KEY)
      .then((items: any[]) => {
        if (!items || items.length === 0) {
          return null;
        }

        const novosItems: any[] = [];

        for (const i of items) {
          if (i.id === array.id) {
            novosItems.push(array);
          } else {
            novosItems.push(i);
          }
        }

        return this.storage.set(KEY, novosItems);
      });

  }

  delete(id: number, KEY: string): Promise<any> {

    return this.storage
      .get(KEY)
      .then((items: any[]) => {
        if (!items || items.length === 0) {
          return null;
        }

        const toKeep: any[] = [];

        for (const i of items) {
          if (i.id !== id) {
            toKeep.push(i);
          }
        }

        return this.storage.set(KEY, toKeep);
      });
  }
}
