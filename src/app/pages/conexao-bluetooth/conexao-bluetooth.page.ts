import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Dispositivo } from 'src/app/domains/dispositivo';

@Component({
  selector: 'app-conexao-bluetooth',
  templateUrl: './conexao-bluetooth.page.html',
  styleUrls: ['./conexao-bluetooth.page.scss'],
})
export class ConexaoBluetoothPage {

  pairedList: Dispositivo[];
  listToggle = false;
  pairedDeviceID = 0;
  dataSend = '';


  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private bluetoothSerial: BluetoothSerial,
    private toastCtrl: ToastController) {
    this.checkBluetoothEnabled();
  }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(success => {
      this.listPairedDevices();
    }, error => {
      this.showError('Por favor habilite o Buetooth.');
    });
  }

  listPairedDevices() {
    this.bluetoothSerial.list().then(success => {
      this.pairedList = success;
      this.listToggle = true;
    }, error => {
      this.showError('Por favor habilite o Buetooth.');
      this.listToggle = false;
    });
  }

  selectDevice() {
    const connectedDevice = this.pairedList[this.pairedDeviceID];
    if (!connectedDevice.address) {
      this.showError('Selecione o dispositivo pareado para conexão.');
      return;
    }
    const address = connectedDevice.address;
    const name = connectedDevice.name;

    this.connect(address);
    this.navCtrl.navigateForward('automacao');
  }

  connect(address) {
    // Attempt to connect device with specified address, call app.deviceConnected if success
    this.bluetoothSerial.connect(address).subscribe(success => {
      this.deviceConnected();
      this.showToast('Conexão executada com sucesso!');
    }, error => {
      this.showError('Erro de conexão com o dispositivo.');
    });
  }

  deviceConnected() {
    // Subscribe to data receiving as soon as the delimiter is read
    this.bluetoothSerial.subscribe('\n').subscribe(success => {
      this.handleData(success);
      this.showToast('Conexão executada com sucesso!');
    }, error => {
      this.showError(error);
    });
  }

  deviceDisconnected() {
    // Unsubscribe from data receiving
    this.bluetoothSerial.disconnect();
    this.showToast('Dispositivo desconectado.');
  }

  handleData(data) {
    this.showToast(data);
  }

  sendData() {
    this.dataSend += '\n';
    this.showToast(this.dataSend);

    this.bluetoothSerial.write(this.dataSend).then(success => {
      this.showToast(success);
    }, error => {
      this.showError(error);
    });
  }

  async showError(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erro',
      subHeader: error,
      buttons: ['Fechar']
    });
    alert.present();
  }

  async showToast(msj) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();

  }

}

