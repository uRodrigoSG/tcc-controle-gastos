import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {
  @Output() irParaLogin = new EventEmitter();
  @Output() irParaRegister = new EventEmitter();
  @Output() irParaCadastros = new EventEmitter();
  @Output() irParaHistorico = new EventEmitter();
  @Output() irParaTotais = new EventEmitter();
  @Output() irParaExcluir = new EventEmitter();

  estaLogado = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.supabaseService.logado$.subscribe((logado) => {
      this.estaLogado = logado;
    });
  }

  onClickLogin() {
    this.irParaLogin.emit();
  }

  onClickRegister() {
    this.irParaRegister.emit();
  }

  onClickTotais() {
    if (this.estaLogado) {
      this.irParaTotais.emit();
    } else {
      this.router.navigate(['/login']);
      alert('Necessário fazer login. Verifique !!!');
    }
  }

  onClickExcluir() {
    if (this.estaLogado) {
      this.irParaExcluir.emit();
    } else {
      this.router.navigate(['/login']);
      alert('Necessário fazer login. Verifique !!!');
    }
  }

  onClickCadastros() {
    if (this.estaLogado) {
      this.irParaCadastros.emit();
    } else {
      this.router.navigate(['/login']);
      alert('Necessário fazer login. Verifique !!!');
    }
  }

  onClickHistorico() {
    if (this.estaLogado) {
      this.irParaHistorico.emit();
    } else {
      this.router.navigate(['/login']);
      alert('Necessário fazer login. Verifique !!!');
    }
  }

  logout() {
    this.supabaseService.logout();
    this.router.navigate(['/login']);
  }
}
