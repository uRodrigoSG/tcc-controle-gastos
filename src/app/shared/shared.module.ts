import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { CabecalhoComponent } from '../components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../components/rodape/rodape.component';
import { TelaLoginComponent } from '../components/tela-login/tela-login.component';
import { CadastroUserComponent } from '../modules/cadastro-user/cadastro-user.component';
import { TelaCadastroUsuarioComponent } from '../components/tela-cadastro-usuario/tela-cadastro-usuario.component';
import { TelaCadastrosComponent } from '../components/tela-cadastros/tela-cadastros.component';
import { TelaHistoricoComponent } from '../components/tela-historico/tela-historico.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { TelaTotaisComponent } from '../components/tela-totais/tela-totais.component';

const NG_ZORRO_MODULES = [
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzDatePickerModule,
  NzDividerModule,
  NzEmptyModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputNumberModule,
  NzInputModule,
  NzListModule,
  NzNotificationModule,
  NzRadioModule,
  NzSelectModule,
  NzSwitchModule,
  NzUploadModule,
  NzModalModule,
  NzSpinModule,
  NzDescriptionsModule,
  NzAlertModule,
  NzResultModule,
  NzTimePickerModule,
  NzToolTipModule,
  NzLayoutModule,
  NzPaginationModule,
  NzTableModule,
];

const CUSTOM_COMPONENTS = [
  CabecalhoComponent,
  RodapeComponent,
  TelaLoginComponent,
  TelaCadastroUsuarioComponent,
  TelaCadastrosComponent,
  TelaHistoricoComponent,
  TelaTotaisComponent,
];

@NgModule({
  declarations: [...CUSTOM_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...NG_ZORRO_MODULES,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...CUSTOM_COMPONENTS,
    ...NG_ZORRO_MODULES,
  ],
})
export class SharedModule {}
