import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from './../../../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Sensor } from 'src/app/domains/sensor';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
})
export class SensorPage implements OnInit {

  descSensor;
  sensor: Sensor;

  constructor(private activatedRoute: ActivatedRoute,
              private storageService: StorageService,
              private bluetoothSerial: BluetoothSerial,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.descSensor = this.activatedRoute.snapshot.paramMap.get('descSensor');
    this.getSensor();
  }

  getSensor() {

    this.storageService
        .getByNome('sensores', this.descSensor)
        .then((resultado: Sensor) => {
          this.sensor = resultado;
        })
        .catch((error) => { this.showError(error); });
  }
  sendData(valor: string) {
    valor += '\n';

    this.bluetoothSerial.write(valor).then(success => {
      this.showToast(success);
    }, error => {
      this.showError(error);
    });
  }

  async showToast(msj) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 300
    });
    toast.present();
  }

  async showError(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erro',
      subHeader: error,
      buttons: ['Fechar']
    });
    alert.present();
  }

}
