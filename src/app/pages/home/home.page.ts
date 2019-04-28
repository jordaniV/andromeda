import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { NavController, ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  subscription: any;

  constructor(public navCtrl: NavController,
              private bluetoothSerial: BluetoothSerial,
              private toastCtrl: ToastController,
              private platform: Platform) {

  }

  ionViewDidEnter() {

    this.subscription = this.platform.backButton.subscribe(() => {
        navigator['app'].exitApp();
    });
}

ionViewWillLeave() {
    this.subscription.unsubscribe();
}

  openAutomacao() {
    this.navCtrl.navigateForward('/conexao-bluetooth/automacao');
  }

  openDashboard() {
    this.navCtrl.navigateForward('/conexao-bluetooth/dashboard');
  }

}
