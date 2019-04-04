import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  // CONEXAO COM O BANCO
  getBD() {
    return this.sqlite.create({
      name: 'andromedadb',
      location: 'default'
    });
  }

  async createDatabase() {
    try {
      const db = await this.getBD();
      this.createTables(db);
    } catch (e) {
      return console.log(e);
    }
  }

  async createTables(db: SQLiteObject) {
    try {
      // tslint:disable-next-line:max-line-length
      await db.sqlBatch(['CREATE TABLE IF NOT EXISTS sensor(id integer primary key NOT NULL,nome VARCHAR(30) NOT NULL, high VARCHAR(30) NOT NULL, low VARCHAR(30) NOT NULL)']);
      console.log('Tabela criada com sucesso');
    } catch (e) {
      return console.error(e);
    }
  }
}
