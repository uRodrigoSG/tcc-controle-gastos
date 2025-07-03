import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExclusaoCadastrosComponent } from './exclusao-cadastros.component';

const routes: Routes = [
  {
    path: '',
    component: ExclusaoCadastrosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExclusaoCadastrosRoutingModule {}
