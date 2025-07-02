import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescricaoRodapeComponent } from './descricao-rodape.component';

const routes: Routes = [
  {
    path: '',
    component: DescricaoRodapeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescricaoRodapeRoutingModule {}
