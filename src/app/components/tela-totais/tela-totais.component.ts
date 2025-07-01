import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gasto } from 'src/app/models/gastos-form.model';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-tela-totais',
  templateUrl: './tela-totais.component.html',
  styleUrls: ['./tela-totais.component.css']
})
export class TelaTotaisComponent implements OnInit {
  
  constructor() { }

  gastos: Gasto[] = [
    // Simule aqui seus gastos cadastrados
    { categoria: 'Alimentação', item: 'Mercado', valor: 500, data: '2025-06-10' },
    { categoria: 'Alimentação', item: 'Restaurante', valor: 300, data: '2025-06-12' },
    { categoria: 'Transporte', item: 'Ônibus', valor: 200, data: '2025-06-10' },
    { categoria: 'Transporte', item: 'Uber', valor: 150, data: '2025-05-15' },
    { categoria: 'Lazer', item: 'Cinema', valor: 100, data: '2025-06-20' }
  ];

  totaisPorCategoria: { categoria: string; total: number }[] = [];
  totaisPorItem: { item: string; total: number }[] = [];
  totaisPorMes: { mesAno: string; total: number }[] = [];

  totalGastosNoMesAtual = 0;
  meta = 1000;

  ngOnInit(): void {
    this.calcularTotais();  
  }

  calcularTotais() {
  const mapaCategoria = new Map<string, number>();
  const mapaItem = new Map<string, number>();
  const mapaMes = new Map<string, number>();

  const hoje = new Date();

  // Zera o total antes de somar
  this.totalGastosNoMesAtual = 0;

  // Função para padronizar a chave mes/ano
  function formatarMesAno(data: Date): string {
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${mes}/${ano}`;
  }

  this.gastos.forEach(gasto => {
    // soma categoria
    mapaCategoria.set(gasto.categoria, (mapaCategoria.get(gasto.categoria) || 0) + gasto.valor);

    // soma item
    mapaItem.set(gasto.item, (mapaItem.get(gasto.item) || 0) + gasto.valor);

    // soma mes
    const data = new Date(gasto.data);
    const chaveMes = formatarMesAno(data); // agora formatado com zero à esquerda
    mapaMes.set(chaveMes, (mapaMes.get(chaveMes) || 0) + gasto.valor);
  });

  this.totaisPorCategoria = Array.from(mapaCategoria.entries()).map(([categoria, total]) => ({ categoria, total }));
  this.totaisPorItem = Array.from(mapaItem.entries()).map(([item, total]) => ({ item, total }));
  this.totaisPorMes = Array.from(mapaMes.entries()).map(([mesAno, total]) => ({ mesAno, total }));

  // Agora pega o total do mês atual do sistema para verificar meta
  const chaveMesAtual = formatarMesAno(hoje);
  console.log('Chave atual: ', chaveMesAtual);
  console.log('Total do mês no mapa:', mapaMes.get(chaveMesAtual));

  this.totalGastosNoMesAtual = mapaMes.get(chaveMesAtual) || 0;

  console.log('Meta:', this.meta, 'Total gasto:', this.totalGastosNoMesAtual);
}
}
