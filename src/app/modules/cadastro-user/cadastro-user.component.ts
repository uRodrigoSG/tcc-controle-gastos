import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.css'],
})
export class CadastroUserComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
