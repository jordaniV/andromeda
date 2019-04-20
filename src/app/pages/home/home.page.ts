import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { NavController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private bluetoothSerial: BluetoothSerial,
              private toastCtrl: ToastController) {
    // this.checkBluetoothEnabled();
  }

  openAutomacao() {
    this.navCtrl.navigateForward('/conexao-bluetooth/automacao');
  }

  openDashboard() {
    this.navCtrl.navigateForward('/conexao-bluetooth/dashboard');
  }

}
