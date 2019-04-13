import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConexaoBluetoothPageModule } from './pages/conexao-bluetooth/conexao-bluetooth.module';
import { IonicStorageModule } from '@ionic/storage';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { StorageService } from './services/storage/storage.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            IonicStorageModule.forRoot(),
            ConexaoBluetoothPageModule],
  providers: [
    BluetoothSerial,
    SplashScreen,
    StatusBar,
    StorageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
