import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'conexao-bluetooth', loadChildren: './pages/conexao-bluetooth/conexao-bluetooth.module#ConexaoBluetoothPageModule' },
  { path: 'conexao-bluetooth/:caminho', loadChildren: './pages/conexao-bluetooth/conexao-bluetooth.module#ConexaoBluetoothPageModule' },
  { path: 'automacao', loadChildren: './pages/automacao/automacao.module#AutomacaoPageModule' },
  { path: 'automacao/:info', loadChildren: './pages/automacao/automacao.module#AutomacaoPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'dashboard/:info', loadChildren: './pages/dashboard/dashboard/dashboard.module#DashboardPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
