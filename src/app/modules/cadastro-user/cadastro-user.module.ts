import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroUserComponent } from './cadastro-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadastroUserRoutingModule } from './cadastro-user-routing.module';



@NgModule({
  declarations: [
    CadastroUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CadastroUserRoutingModule,
  ]
})
export class CadastroUserModule { }
