import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria-form.model';
import { Gastos } from 'src/app/models/gastos-form.model';
import { Itens } from 'src/app/models/itens-form.model';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-tela-cadastros',
  templateUrl: './tela-cadastros.component.html',
  styleUrls: ['./tela-cadastros.component.css'],
})
export class TelaCadastrosComponent implements OnInit {
  novaCategoria: Categoria = {
    CodCat: 0,
    DesCat: '',
  };
  categorias: Categoria[] = [];
  itens: Itens[] = [];
  novoItem: Itens = {
    CodIte: 0,
    DesIte: '',
    CodCat: 0,
    CodUsu: undefined,
  };

  novoGasto: Gastos = {
    CodGas: 0,
    DatGas: new Date(),
    CodCat: 0,
    CodIte: 0,
    CodUsu: 0,
    ValGas: 0,
    CodMes: 0,
  };

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarItens();
  }

  opcaoSelecionada: 'gasto' | 'categoria' | 'item' = 'gasto';

  async salvarGastos() {
    if (
      !this.novoGasto.CodCat ||
      !this.novoGasto.CodIte ||
      !this.novoGasto.DatGas ||
      !this.novoGasto.ValGas ||
      !this.novoGasto.CodMes
    ) {
      alert(
        'Categoria / Item / Data gasto / Valor do gato e Mes são obrigatórios'
      );
      return;
    }

    const { data, error } = await this.supabaseService.inserirGastos(
      this.novoGasto
    );

    if (error) {
      alert('Erro ao salvar gasto: ' + error.message);
      this.novoGasto = {
        CodGas: 0,
        DatGas: new Date(),
        CodCat: 0,
        CodIte: 0,
        CodUsu: 0,
        ValGas: 0,
        CodMes: 0,
      };
      return;
    } else {
      alert('Gasto salvo com sucesso!');
      this.novoGasto = {
        CodGas: 0,
        DatGas: new Date(),
        CodCat: 0,
        CodIte: 0,
        CodUsu: 0,
        ValGas: 0,
        CodMes: 0,
      };
    }
  }

  async salvarItens() {
    if (!this.novoItem.DesIte || !this.novoItem.CodCat) {
      alert('Descrição e Categoria são obrigatórios');
      return;
    }

    const { data, error } = await this.supabaseService.inserirItem(
      this.novoItem.CodCat,
      this.novoItem.DesIte
    );

    if (error) {
      alert('Erro ao salvar item: ' + error.message);
      this.novaCategoria = {
        CodCat: 0,
        DesCat: '',
      };
      return;
    } else {
      alert('Item salvo com sucesso!');
      this.novaCategoria = {
        CodCat: 0,
        DesCat: '',
      };
    }
  }

  async carregarItens() {
    const { data, error } = await this.supabaseService.listarItens();

    if (error) {
      console.error('Erro ao carregar itens:', error.message);
      return;
    }

    this.itens = (data ?? []).map((item: any) => ({
      CodIte: item.CodIte,
      DesIte: item.DesIte,
      CodCat: item.CodCat,
      CodUsu: item.CodUsu,
    }));
  }

  async salvarCategoria() {
    if (!this.novaCategoria.DesCat) {
      alert('Descrição é obrigatória');
      return;
    }

    const { data, error } = await this.supabaseService.inserirCategoria(
      this.novaCategoria.DesCat
    );

    if (error) {
      alert('Erro ao salvar categoria: ' + error.message);
      this.novaCategoria = {
        CodCat: 0,
        DesCat: '',
      };
      return;
    } else {
      alert('Categoria salva com sucesso!');
      this.novaCategoria = {
        CodCat: 0,
        DesCat: '',
      };
    }
  }

  async carregarCategorias() {
    const { data, error } = await this.supabaseService.listarCategorias();

    if (error) {
      console.error('Erro ao carregar categorias:', error.message);
      return;
    }

    this.categorias = (data ?? []).map((cat: any) => ({
      CodCat: cat.CodCat,
      DesCat: cat.DesCat,
    }));
  }
}
