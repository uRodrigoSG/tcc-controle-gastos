import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescricaoRodapeRoutingModule } from './descricao-rodape-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DescricaoRodapeComponent } from './descricao-rodape.component';

@NgModule({
  declarations: [DescricaoRodapeComponent],
  imports: [CommonModule, DescricaoRodapeRoutingModule, SharedModule],
})
export class DescricaoRodapeModule {}
