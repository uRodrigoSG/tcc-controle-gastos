import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  irParaLogin(){
    this.router.navigate(['/login']);
  }

  irParaRegister(){
    this.router.navigate(['/cadastro-user']);
  }

  irParaCadastros(){
    this.router.navigate(['/cadastros']);
  }

  irParaHistorico(){
    this.router.navigate(['/historico']);
  }

}
