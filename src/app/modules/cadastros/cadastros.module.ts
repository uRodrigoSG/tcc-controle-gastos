import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrosComponent } from './cadastros.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadastrosRoutingModule } from './cadastros-routing.module';



@NgModule({
  declarations: [
    CadastrosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CadastrosRoutingModule
  ]
})
export class CadastrosModule { }
