import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Sensor } from 'src/app/domains/sensor';

@Component({
  selector: 'app-automacao',
  templateUrl: './automacao.page.html',
  styleUrls: ['./automacao.page.scss'],
})
export class AutomacaoPage implements OnInit {

  info;

  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.info = this.activatedRoute.snapshot.paramMap.get('info');
  }

  async novoSensor() {
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
            // codigo inserção
          })
        }
      ]
    });

    alert.present();

  }

  // abre a tela para conectar dispositivo bluetooth
  connectBluetooth() {
    this.navCtrl.navigateForward('conexao-bluetooth');
  }

  async showToast(msj) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1000
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
