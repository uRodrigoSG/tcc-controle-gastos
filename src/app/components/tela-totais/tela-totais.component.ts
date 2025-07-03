import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Gastos } from 'src/app/models/gastos-form.model';

@Component({
  selector: 'app-tela-totais',
  templateUrl: './tela-totais.component.html',
  styleUrls: ['./tela-totais.component.css'],
})
export class TelaTotaisComponent implements OnInit {
  gastos: Gastos[] = [];

  totaisPorCategoria: { nome: string; total: number }[] = [];
  totaisPorItem: { nome: string; total: number }[] = [];
  totaisPorMes: { nome: string; total: number }[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.carregarGastos();
  }

  async carregarGastos() {
    const { data, error } = await this.supabaseService.listarGastosTotais();

    if (error) {
      console.error('Erro ao carregar gastos:', error.message);
      return;
    }

    this.gastos = (data ?? []).map((gasto: any) => ({
      CodGas: gasto.CodGas,
      DatGas: gasto.DatGas,
      CodCat: gasto.Categorias?.CodCat,
      DesCat: gasto.Categorias?.DesCat,
      CodIte: gasto.Itens?.CodIte,
      DesIte: gasto.Itens?.DesIte,
      CodUsu: gasto.CodUsu,
      ValGas: gasto.ValGas,
      CodMes: gasto.Meses?.CodMes,
      DesMes: gasto.Meses?.DesMes,
    }));

    this.calcularTotais();
  }

  calcularTotais() {
    this.totaisPorCategoria = this.agruparTotais(this.gastos, 'DesCat');
    this.totaisPorItem = this.agruparTotais(this.gastos, 'DesIte');
    this.totaisPorMes = this.agruparTotais(this.gastos, 'DesMes');
  }

  private agruparTotais(
    data: Gastos[],
    chave: keyof Gastos
  ): { nome: string; total: number }[] {
    const mapa = new Map<string, number>();
    data.forEach((g) => {
      const key = g[chave] ?? 'Outros';
      mapa.set(String(key), (mapa.get(String(key)) ?? 0) + (g.ValGas ?? 0));
    });
    return Array.from(mapa.entries()).map(([nome, total]) => ({ nome, total }));
  }
}
