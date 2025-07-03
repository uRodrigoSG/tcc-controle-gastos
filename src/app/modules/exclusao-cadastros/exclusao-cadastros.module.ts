import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExclusaoCadastrosComponent } from './exclusao-cadastros.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExclusaoCadastrosRoutingModule } from './exclusao-cadastros-routing.module';

@NgModule({
  declarations: [ExclusaoCadastrosComponent],
  imports: [CommonModule, SharedModule, ExclusaoCadastrosRoutingModule],
})
export class ExclusaoCadastrosModule {}
