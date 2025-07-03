import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria-form.model';
import { Gastos } from 'src/app/models/gastos-form.model';
import { Itens } from 'src/app/models/itens-form.model';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-tela-exclusao',
  templateUrl: './tela-exclusao.component.html',
  styleUrls: ['./tela-exclusao.component.css'],
})
export class TelaExclusaoComponent implements OnInit {
  categoriasLista: Categoria[] = [];
  itensLista: Itens[] = [];
  gastosLista: Gastos[] = [];

  categoriaSelecionada!: number;
  itemSelecionado!: number;
  gastoSelecionado!: number;

  formConsulta: FormGroup;

  constructor(
    private supabaseService: SupabaseService,
    private fb: FormBuilder
  ) {
    this.formConsulta = this.fb.group({
      mesConsulta: [null],
    });
  }

  ngOnInit(): void {
    /*this.formConsulta.get('mesConsulta')?.valueChanges.subscribe((mes) => {
      if (mes) {
        this.carregarGastos(mes);
      } else {
        this.gastosLista = [];
      }
    });*/
  }

  async carregarCategorias() {
    const { data, error } = await this.supabaseService.listarCategorias();
    if (!error && data) {
      this.categoriasLista = data.map((cat: any) => ({
        CodCat: cat.CodCat,
        DesCat: cat.DesCat,
      }));
    }
  }

  async carregarItens() {
    const { data, error } = await this.supabaseService.listarItens();
    if (!error && data) {
      this.itensLista = data.map((item: any) => ({
        CodIte: item.CodIte,
        DesIte: item.DesIte,
        CodCat: item.CodCat,
      }));
    }
  }

  async carregarGastos(mes: any) {
    const { data, error } = await this.supabaseService.listarGastos(mes);
    if (!error && data) {
      this.gastosLista = data.map((gastos: any) => ({
        CodGas: gastos.CodGas,
        DatGas: gastos.DatGas,
        CodCat: gastos.CodCat,
        DesCat: gastos.DesCat,
        CodIte: gastos.CodIte,
        DesIte: gastos.DesIte,
        CodUsu: gastos.CodUsu,
        ValGas: gastos.ValGas,
        CodMes: gastos.CodMes,
        DesMes: gastos.DesMes,
      }));
    }
  }
}
