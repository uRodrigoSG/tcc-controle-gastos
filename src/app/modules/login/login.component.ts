import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
