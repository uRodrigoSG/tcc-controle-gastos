import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  estaLogado = false;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.supabaseService.logado$.subscribe((logado) => {
      this.estaLogado = logado;
    });
  }
}
