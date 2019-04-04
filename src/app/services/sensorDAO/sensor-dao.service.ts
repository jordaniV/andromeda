import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './../database/database.service';
import { Injectable } from '@angular/core';
import { Sensor } from './../../domains/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorDAOService {

  constructor(public dbService: DatabaseService) { }

  public insert(sensor: Sensor): void {

    this.dbService.getBD()
      .then((db: SQLiteObject) => {
        const sql = 'INSERT INTO sensor (id, nome, high, low) VALUES (?,?,?,?)';
        const data = [sensor.id, sensor.nome, sensor.high, sensor.low];

        db.executeSql(sql, data)
          .then(() => console.log('Sensor cadastrado com sucesso.'))
          .catch((e) => console.error(e));
      })
      .catch(e => console.error(e));

  }

  public remove(id: number): void {

    this.dbService.getBD()
      .then((db: SQLiteObject) => {
        const sql = 'DELETE FROM sensor WHERE id = ?';
        const data = [id];

        db.executeSql(sql, data)
          .then(() => console.log('Sensor deletado com sucesso.'))
          .catch((e) => console.error(e));
      })
      .catch(e => console.error(e));

  }

  public update(sensor: Sensor): void {

    this.dbService.getBD()
      .then((db: SQLiteObject) => {
        const sql = 'UPDATE sensor SET id = ?, nome = ?, high = ?, low = ? WHERE id = ?';
        const data = [sensor.id, sensor.nome, sensor.high, sensor.low, sensor.id];

        db.executeSql(sql, data)
          .then(() => console.log('Sensor atualizado com sucesso.'))
          .catch((e) => console.error(e));
      })
      .catch(e => console.error(e));

  }

  public getAll() {

    this.dbService.getBD()
      .then((db: SQLiteObject) => {
        const sql = 'SELECT * FROM sensor';
        // tslint:disable-next-line:prefer-const
        let data: any[];
        db.executeSql(sql, data)
          // tslint:disable-next-line:no-shadowed-variable
          .then((data: any) => {
            if (data.rows.length > 0) {
              const sensores = new Array<Sensor>();
              for (let i = 0; i < data.rows.length; i++) {
                const tmp = data.rows.item(i);
                const novoSensor = new Sensor(tmp.id, tmp.nome, tmp.high, tmp.low);
                sensores.push(novoSensor);
              }
              return sensores;
            } else {
              return new Array<Sensor>();
            }
          })
          .catch((e) => {
            console.error(e);
            return null;
          });
      })
      .catch(e => {
        console.error(e);
        return null;
      });
    return null;
  }
}
