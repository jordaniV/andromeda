import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController, IonList } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Sensor } from 'src/app/domains/sensor';
import { StorageService } from './../../services/storage/storage.service';

@Component({
  selector: 'app-automacao',
  templateUrl: './automacao.page.html',
  styleUrls: ['./automacao.page.scss'],
})
export class AutomacaoPage implements OnInit {

  info;
  sensores: Sensor[] = [];

  @ViewChild('lista') lista: IonList;

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private bluetoothSerial: BluetoothSerial) {
  }


  ngOnInit() {
    this.info = this.activatedRoute.snapshot.paramMap.get('info');
    this.loadSensores();
  }

  ionViewWillEnter() {
    // this.loadSensores();
  }

  loadSensores() {
    this.storageService
      .getAll('sensores')
      .then(sensores => {
        this.sensores = sensores;
      });
  }

  async novo() {
    const alert = await this.alertCtrl.create({
      header: 'Cadastro de sensor',
      inputs: [
        {
          placeholder: 'Descrição',
          name: 'nome',
          type: 'text',
        },
        {
          placeholder: 'Valor HIGH',
          name: 'high',
          type: 'text'
        },
        {
          placeholder: 'Valor LOW',
          name: 'low',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Fechar',
          role: 'fechar',
          handler: () => { return; }
        },
        {
          text: 'Salvar',
          role: 'salvar',
          handler: ((data: Sensor) => {

            data.habilitado = false;
            data.id = Date.now();
            data.dispositivoPai = this.info;

            this.storageService
              .add(data, 'sensores')
              .then(sensor => {
                data = <Sensor>{};
                this.showToast('Sensor adicionado com sucesso!');
                this.loadSensores();
                return;
              });
          })
        }
      ]
    });

    alert.present();

  }

  async update(sensor: Sensor) {

    const alert = await this.alertCtrl.create({
      header: 'Atualização de Sensores',
      inputs: [
        {
          placeholder: 'Descrição',
          name: 'nome',
          type: 'text',
          value: sensor.nome
        },
        {
          placeholder: 'Valor HIGH',
          name: 'high',
          type: 'text',
          value: sensor.high
        },
        {
          placeholder: 'Valor LOW',
          name: 'low',
          type: 'text',
          value: sensor.low
        }
      ],
      buttons: [
        {
          text: 'Fechar',
          role: 'fechar',
          handler: () => { return; }
        },
        {
          text: 'Atualizar',
          role: 'atualizar',
          handler: ((data: Sensor) => {
            data.id = sensor.id;
            this.storageService
              .update(data, 'sensores')
              .then(() => {
                this.showToast('Sensor Atualizado!');
                this.lista.closeSlidingItems();
                this.loadSensores();
              })
              .catch((error) => {
                this.showToast(error);
                this.lista.closeSlidingItems();
              });
          })
        }
      ]
    });
    await alert.present();
  }

  updateHabilitado(sensor: Sensor) {

    this.storageService
        .updateHabilitado(sensor, 'sensores')
        .then(() => console.log('Estado do sensor alterado com sucesso.'))
        .catch((error) => console.error(error));

  }

  async delete(sensor: Sensor) {

    const alert1 = await this.alertCtrl.create({
      header: 'Aviso',
      subHeader: 'Deseja excluir o sensor permanentemente?',
      buttons: [
        {
          text: 'Não',
          role: 'nao',
          handler: () => { return; }
        },
        {
          text: 'Sim',
          role: 'sim',
          handler: () => {
            this.storageService.delete(sensor.id, 'sensores').then(() => {
              this.showToast('Sensor removido');
              this.lista.closeSlidingItems(); // Fix or sliding is stuck afterwards
              this.loadSensores(); // Or splice it from the array directly
            });
          }
        }
      ]
    });

    alert1.present();

  }

  // abre a tela para conectar dispositivo bluetooth
  connectBluetooth() {
    this.navCtrl.navigateForward('conexao-bluetooth');
  }

  async deviceDisconnected() {

    const info = await this.alertCtrl.create({
      header: 'Aviso',
      subHeader: 'Deseja desconectar o dispositivo?',
      buttons: [
        {
          text: 'Não',
          role: 'nao',
          handler: () => { return; }
        },
        {
          text: 'Sim',
          role: 'sim',
          handler: () => {
            // Unsubscribe from data receiving
            this.bluetoothSerial.disconnect();
            this.showToast('Dispositivo desconectado.');
            this.navCtrl.navigateRoot('conexao-bluetooth');
          }
        }
      ]
    });

    info.present();

  }

  async showToast(msj) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1500
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
