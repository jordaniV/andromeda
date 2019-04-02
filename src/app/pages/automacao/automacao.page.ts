import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-automacao',
  templateUrl: './automacao.page.html',
  styleUrls: ['./automacao.page.scss'],
})
export class AutomacaoPage implements OnInit {

  info;

  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController,
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
          name: 'descricao',
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
          handler: () => {
            // executa salvar sensor
          }
        }
      ]
    });

    alert.present();

  }

  // abre a tela para conectar dispositivo bluetooth
  connectBluetooth() {
    this.navCtrl.navigateForward('conexao-bluetooth');
  }
}
