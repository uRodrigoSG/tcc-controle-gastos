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
  formConsulta!: FormGroup;

  categoriasLista: Categoria[] = [];
  itensLista: Itens[] = [];
  gastosLista: Gastos[] = [];

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formConsulta = this.fb.group({
      categoriaSelecionada: [null],
      itemSelecionado: [null],
      mesConsulta: [null],
      gastoSelecionado: [null],
    });

    this.formConsulta.get('mesConsulta')?.valueChanges.subscribe((mes) => {
      if (mes) {
        this.carregarGastos(mes);
      } else {
        this.gastosLista = [];
      }
    });
  }

  async carregarCategorias() {
    const { data, error } = await this.supabaseService.listarCategorias();

    if (error) {
      console.error('Erro ao carregar categorias:', error.message);
      return;
    }

    this.categoriasLista = (data ?? []).map((cat: any) => ({
      CodCat: cat.CodCat,
      DesCat: cat.DesCat,
    }));
  }

  async carregarItens() {
    const { data, error } = await this.supabaseService.listarItens();

    if (error) {
      console.error('Erro ao carregar itens:', error.message);
      return;
    }

    this.itensLista = (data ?? []).map((item: any) => ({
      CodIte: item.CodIte,
      DesIte: item.DesIte,
      CodCat: item.CodCat,
    }));
  }

  async carregarGastos(mes: number) {
    const { data, error } = await this.supabaseService.listarGastos(mes);

    if (error) {
      console.error('Erro ao carregar gastos:', error.message);
      return;
    }

    this.gastosLista = (data ?? []).map((g: any) => ({
      CodGas: g.CodGas,
      DatGas: g.DatGas,
      CodCat: g.CodCat,
      DesCat: g.Categorias?.DesCat ?? 'Sem categoria',
      CodIte: g.CodIte,
      DesIte: g.Itens?.DesIte ?? 'Sem item',
      CodUsu: g.CodUsu,
      ValGas: g.ValGas,
      CodMes: g.CodMes,
      DesMes: g.Meses?.DesMes ?? 'Sem mês',
    }));
  }

  async excluirCategoria() {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const codCat = this.formConsulta.get('categoriaSelecionada')?.value;
    if (!codCat) {
      this.mensagemErro = 'Selecione uma categoria para exclusão.';
      return;
    }

    const error = await this.supabaseService.excluirCategoria(codCat);
    if (error) {
      if (error.code === '23503') {
        this.mensagemErro =
          'Esta categoria está vinculada a lançamentos ou itens. Exclua os registros relacionados primeiro.';
      } else {
        this.mensagemErro = 'Erro ao excluir categoria: ' + error.message;
      }
    } else {
      this.mensagemSucesso = 'Categoria excluída com sucesso!';
      this.formConsulta.get('categoriaSelecionada')?.setValue(null);
      this.carregarCategorias();
    }
  }

  async excluirItem() {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const codIte = this.formConsulta.get('itemSelecionado')?.value;
    if (!codIte) {
      this.mensagemErro = 'Selecione um item para exclusão.';
      return;
    }

    const error = await this.supabaseService.excluirItem(codIte);
    if (error) {
      if (error.code === '23503') {
        this.mensagemErro =
          'Este item está vinculado a lançamentos. Exclua os lançamentos relacionados antes.';
      } else {
        this.mensagemErro = 'Erro ao excluir item: ' + error.message;
      }
    } else {
      this.mensagemSucesso = 'Item excluído com sucesso!';
      this.formConsulta.get('itemSelecionado')?.setValue(null);
      this.carregarItens();
    }
  }

  async excluirGasto() {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const codGas = this.formConsulta.get('gastoSelecionado')?.value;
    if (!codGas) {
      this.mensagemErro = 'Selecione um lançamento para exclusão.';
      return;
    }

    const error = await this.supabaseService.excluirGasto(codGas);
    if (error) {
      this.mensagemErro = 'Erro ao excluir lançamento: ' + error.message;
    } else {
      this.mensagemSucesso = 'Lançamento excluído com sucesso!';
      this.formConsulta.get('gastoSelecionado')?.setValue(null);

      const mes = this.formConsulta.get('mesConsulta')?.value;
      if (mes) {
        this.carregarGastos(mes);
      }
    }
  }
}
