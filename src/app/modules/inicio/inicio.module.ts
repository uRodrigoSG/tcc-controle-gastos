import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InicioComponent } from './inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';



@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    SharedModule,
    InicioRoutingModule,
  ]
})
export class InicioModule { }
