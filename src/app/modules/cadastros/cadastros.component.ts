import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.css'],
})
export class CadastrosComponent implements OnInit {
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
