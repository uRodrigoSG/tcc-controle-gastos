import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gastos } from 'src/app/models/gastos-form.model';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-tela-historico',
  templateUrl: './tela-historico.component.html',
  styleUrls: ['./tela-historico.component.css'],
})
export class TelaHistoricoComponent implements OnInit {
  mesConsulta: number = 0;
  gastos: Gastos[] = [];
  displayData: Gastos[] = [];
  form!: FormGroup;

  // Mapa para guardar o estado da ordenação de cada coluna (ascend, descend, null)
  sortMap: { [key: string]: string | null } = {
    CodGas: null,
    DatGas: null,
    DesCat: null,
    DesIte: null,
    ValGas: null,
    DesMes: null,
  };

  // Guarda qual coluna está ordenada atualmente, só uma ordenação simples
  sortKey: string | null = null;
  sortValue: string | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      mesConsulta: [null, [Validators.required]],
    });
  }

  async listarGastos() {
    const { data, error } = await this.supabaseService.listarGastos(
      this.form.value.mesConsulta
    );

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

    this.displayData = [...this.gastos];
    this.resetSortMap();
  }

  aoSelecionarMes() {
    this.listarGastos();
  }

  resetSortMap(): void {
    Object.keys(this.sortMap).forEach((key) => (this.sortMap[key] = null));
    this.sortKey = null;
    this.sortValue = null;
  }

  onSortChange(sort: any): void {
    const s = sort as { key: string; value: string | null };

    this.resetSortMap();

    // Converte para keyof Gastos
    const key = s.key as keyof Gastos;
    const value = s.value;

    this.sortKey = key;
    this.sortValue = value;
    this.sortMap[s.key] = value;

    // Se sortValue ou sortKey for null, reseta a tabela e retorna
    if (!value || !key) {
      this.displayData = [...this.gastos];
      return;
    }

    this.displayData = [...this.gastos].sort((a, b) => {
      let compare = 0;

      if (key === 'DatGas') {
        compare = new Date(a[key]).getTime() - new Date(b[key]).getTime();
      } else if (key === 'ValGas') {
        compare = (a[key] as number) - (b[key] as number);
      } else {
        const valA = a[key] ? String(a[key]).toLowerCase() : '';
        const valB = b[key] ? String(b[key]).toLowerCase() : '';
        compare = valA.localeCompare(valB);
      }

      return value === 'ascend' ? compare : -compare;
    });
  }
}
