import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'controle-gastos';
  estaLogado = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.supabaseService.logado$.subscribe((logado) => {
      this.estaLogado = logado;
    });

    if (!this.estaLogado) {
      this.router.navigate(['/inicio']);
    }
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  irParaRegister() {
    this.router.navigate(['/cadastro-user']);
  }

  irParaCadastros() {
    this.router.navigate(['/cadastros']);
  }

  irParaHistorico() {
    this.router.navigate(['/historico']);
  }

  irParaTotais() {
    this.router.navigate(['/inicio']);
  }

  irParaExcluir() {
    this.router.navigate(['/exclusao-cadastros']);
  }
}
