import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Storage } from '@ionic/storage';
import { Dispositivo } from 'src/app/domains/dispositivo';

@Component({
  selector: 'app-conexao-bluetooth',
  templateUrl: './conexao-bluetooth.page.html',
  styleUrls: ['./conexao-bluetooth.page.scss'],
})
export class ConexaoBluetoothPage implements OnInit {

  listaPareados: Dispositivo[];
  listaExiste = false;
  selecionado = false;
  pairedDeviceID = 0;
  dataSend = '';
  loaded;
  address;
  name: string;
  info;
  caminho;


  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private bluetoothSerial: BluetoothSerial,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private activatedRoute: ActivatedRoute) {
    this.checkBluetoothEnabled();
  }

  ngOnInit() {
    this.caminho = this.activatedRoute.snapshot.paramMap.get('caminho');
  }

  selecionadoDispositivo() {
    this.selecionado = true;
  }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(success => {
      this.listPairedDevices();
    }, error => {
      this.showError('Por favor habilite o Bluetooth.');
    });
  }

  listPairedDevices() {
    this.selecionado = false;
    this.bluetoothSerial.list().then(success => {
      this.listaPareados = success;
      this.listaExiste = true;
    }, error => {
      this.showError('Por favor habilite o Bluetooth.');
      this.listaExiste = false;
      this.selecionado = false;
    });
  }

  selectDevice() {
    const connectedDevice = this.listaPareados[this.pairedDeviceID];
    if (!connectedDevice.address) {
      this.showError('Selecione o dispositivo pareado para conexão.');
      return;
    } else {
      this.address = connectedDevice.address;
      this.name = connectedDevice.name;
      this.info = `${this.name} - ${this.address}`; // JUNTO AS DUAS INFORMAÇÕES PARA ENVIAR PELO NAV CONTROLLER
      this.connect(this.address);
      this.showToast(this.name);
    }
  }

  connect(address) {
    // Attempt to connect device with specified address, call app.deviceConnected if success
    this.showLoading('Conectando...');
    this.bluetoothSerial.connect(address).subscribe(success => {
      this.loaded.dismiss();
      this.showToast('Conexão executada com sucesso!');
      this.deviceConnected();
      this.navCtrl.navigateForward(`/${this.caminho}/${this.info}`);
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

    setTimeout(() => {
      this.loaded.dismiss();
    }, 15000);
  }

}

