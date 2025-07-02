import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descricao-rodape',
  templateUrl: './descricao-rodape.component.html',
  styleUrls: ['./descricao-rodape.component.css'],
})
export class DescricaoRodapeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

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
}
