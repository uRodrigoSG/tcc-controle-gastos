import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-tela-cadastros',
  templateUrl: './tela-cadastros.component.html',
  styleUrls: ['./tela-cadastros.component.css'],
})
export class TelaCadastrosComponent implements OnInit {
  novaCategoria: string = '';
  categorias: string[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  opcaoSelecionada: 'categoria' | 'item' | 'gasto' = 'categoria';

  itens: { descricao: string; categoria: string }[] = [];

  novoItem = { descricao: '', categoria: '' };
  novoGasto = { categoria: '', item: '', data: '', valor: null };

  salvar() {
    if (this.opcaoSelecionada === 'categoria') {
      this.categorias.push(this.novaCategoria);
      this.novaCategoria = '';
    } else if (this.opcaoSelecionada === 'item') {
      this.itens.push({ ...this.novoItem });
      this.novoItem = { descricao: '', categoria: '' };
    } else if (this.opcaoSelecionada === 'gasto') {
      console.log('Gasto salvo:', this.novoGasto);
      // Aqui você pode chamar uma API para salvar o gasto
      this.novoGasto = { categoria: '', item: '', data: '', valor: null };
    }
  }

  async salvarCategoria() {
    if (!this.novaCategoria.trim()) {
      alert('Descrição é obrigatória');
      return;
    }

    const { data, error } = await this.supabaseService.inserirCategoria(
      this.novaCategoria
    );

    if (error) {
      alert('Erro ao salvar categoria: ' + error.message);
      this.categorias = [];
      return;
    } else {
      alert('Categoria salva com sucesso!');
      this.novaCategoria = '';
    }
  }

  async carregarCategorias() {
    const { data, error } = await this.supabaseService.listarCategorias();

    if (error) {
      console.error('Erro ao carregar categorias:', error.message);
      return;
    }

    // Aqui pegamos só o campo DesCat, se for o que você quer exibir
    this.categorias = (data ?? []).map((cat: any) => cat.DesCat);
  }
}
