import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'automacao', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'conexao-bluetooth', loadChildren: './pages/conexao-bluetooth/conexao-bluetooth.module#ConexaoBluetoothPageModule' },
  { path: 'automacao', loadChildren: './pages/automacao/automacao.module#AutomacaoPageModule' },
  { path: 'automacao/:info', loadChildren: './pages/automacao/automacao.module#AutomacaoPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
