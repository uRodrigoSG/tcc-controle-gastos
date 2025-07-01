import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  @Output() irParaLogin = new EventEmitter();
  @Output() irParaRegister = new EventEmitter();
  @Output() irParaCadastros = new EventEmitter();
  @Output() irParaHistorico = new EventEmitter();
  
  estaLogado = false;

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.supabaseService.logado$.subscribe((logado) => {
      this.estaLogado = logado;
    });
  }

  onClickLogin(){
    this.irParaLogin.emit();
  }

  onClickRegister(){
    this.irParaRegister.emit();
  }

  onClickCadastros(){
    
    this.irParaCadastros.emit();
  }

  onClickHistorico(){
    this.irParaHistorico.emit();
  }

  logout() {
    this.supabaseService.logout();
  }
}

