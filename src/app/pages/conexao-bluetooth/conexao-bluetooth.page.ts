import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
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
  loaded;
  address;
  name: string;
  info;


  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private bluetoothSerial: BluetoothSerial,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
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
    } else {
      this.address = connectedDevice.address;
      this.name = connectedDevice.name;
      this.info = `${this.name} - ${this.address}`; // JUNTO AS DUAS INFORMAÇÕES PARA ENVIAR PELO NAV CONTROLLER
      this.connect(this.address);
    }
  }

  connect(address) {
    // Attempt to connect device with specified address, call app.deviceConnected if success
    this.showLoading('Conectando...');
    this.bluetoothSerial.connect(address).subscribe(success => {
      this.loaded.dismiss();
      this.showToast('Conexão executada com sucesso!');
      this.navCtrl.navigateForward(`/automacao/${this.info}`);
      this.deviceConnected();
    }, error => {
      this.loaded.dismiss();
      this.showError('Erro de conexão com o dispositivo ou já existe um conectado, tente novamente.');
    });
  }

  deviceConnected() {
    // Subscribe to data receiving as soon as the delimiter is read
    this.bluetoothSerial.subscribe('\n').subscribe(success => {
      this.handleData(success);
    }, error => {
      this.showError(error);
    });
  }

  handleData(data) {
    this.showToast(data);
  }

  deviceDisconnected() {
    // Unsubscribe from data receiving
    this.bluetoothSerial.disconnect();
    this.showToast('Dispositivo desconectado.');
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

  async showLoading(message) {
    this.loaded = await this.loadingCtrl.create({
      message: message
    });
    this.loaded.present();
  }

}

