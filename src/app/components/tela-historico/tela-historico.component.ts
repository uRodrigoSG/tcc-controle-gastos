import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gasto } from 'src/app/models/gastos-form.model';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-tela-historico',
  templateUrl: './tela-historico.component.html',
  styleUrls: ['./tela-historico.component.css']
})
export class TelaHistoricoComponent implements OnInit {

  constructor() { }

  gastos: Gasto[] = [
    { data: '2025-06-10', categoria: 'Alimentação', item: 'Mercado', valor: 150 },
    { data: '2025-06-15', categoria: 'Transporte', item: 'Gasolina', valor: 100 },
    { data: '2025-07-01', categoria: 'Lazer', item: 'Cinema', valor: 50 },
  ];

  gastosFiltrados: Gasto[] = [];

  filtros = {
    data: null as Date | null,
    mes: null as Date | null,
    valor: null as number | null,
    tipoValor: 'igual', // 'igual', 'maior', 'menor'
    categoria: '',
    item: '',
  };

  ngOnInit(): void {
      this.aplicarFiltros()// inicia com todos os gastos

  }

  aplicarFiltros(): void {
    this.gastosFiltrados = this.gastos.filter((g) => {
      const dataGasto = new Date(g.data);

      const matchData = this.filtros.data
        ? dataGasto.toDateString() === this.filtros.data.toDateString()
        : true;

      const filtroMesValido =
        this.filtros.mes instanceof Date && !isNaN(this.filtros.mes.getTime());

      const matchMes = filtroMesValido
        ? dataGasto.getMonth() === this.filtros.mes?.getMonth() &&
          dataGasto.getFullYear() === this.filtros.mes?.getFullYear()
        : true;

      const matchValor = this.filtros.valor !== null
        ? this.filtros.tipoValor === 'maior'
          ? g.valor > this.filtros.valor
          : this.filtros.tipoValor === 'menor'
          ? g.valor < this.filtros.valor
          : g.valor === this.filtros.valor
        : true;

      const matchCategoria = this.filtros.categoria
        ? g.categoria.toLowerCase().includes(this.filtros.categoria.toLowerCase())
        : true;

      const matchItem = this.filtros.item
        ? g.item.toLowerCase().includes(this.filtros.item.toLowerCase())
        : true;

      return matchData && matchMes && matchValor && matchCategoria && matchItem;
    });
  }

  limparFiltros(): void {
    this.filtros = {
      data: null,
      mes: null,
      valor: null,
      tipoValor: 'igual',
      categoria: '',
      item: '',
    };
    this.aplicarFiltros();
  }

}
