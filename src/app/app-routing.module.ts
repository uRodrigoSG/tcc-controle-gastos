import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescRodapeComponent } from './components/desc-rodape/desc-rodape.component';

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
  {
    path: 'descricao-rodape',
    loadChildren: () =>
      import('./modules/descricao-rodape/descricao-rodape.module').then(
        (m) => m.DescricaoRodapeModule
      ),
  },
  {
    path: 'exclusao-cadastros',
    loadChildren: () =>
      import('./modules/exclusao-cadastros/exclusao-cadastros.module').then(
        (m) => m.ExclusaoCadastrosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
