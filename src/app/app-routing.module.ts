import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'cadastro-user',
    loadChildren: () =>
      import('./modules/cadastro-user/cadastro-user.module').then(
        (m) => m.CadastroUserModule
      ),
  },
  {
    path: 'cadastros',
    loadChildren: () =>
      import('./modules/cadastros/cadastros.module').then(
        (m) => m.CadastrosModule
      ),
  },
  {
    path: 'historico',
    loadChildren: () =>
      import('./modules/historico/historico.module').then(
        (m) => m.HistoricoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
