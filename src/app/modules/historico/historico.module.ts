import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoComponent } from './historico.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoricoRoutingModule } from './historico-routing.module';



@NgModule({
  declarations: [
    HistoricoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoricoRoutingModule
  ]
})
export class HistoricoModule { }
