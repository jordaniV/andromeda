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
    private storageService: StorageService) {
  }

  ngOnInit() {
    this.info = this.activatedRoute.snapshot.paramMap.get('info');
    this.loadSensores();
  }

  loadSensores() {
    this.storageService
      .getAll()
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

            data.habilitado = true;
            data.id = Date.now();

            this.storageService
              .add(data)
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
            console.log(data);
            this.storageService
              .update(data)
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
              this.storageService.delete(sensor.id).then(() => {
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
