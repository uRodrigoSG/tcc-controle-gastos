import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private perfilUsuarioSubject = new BehaviorSubject<any>(null);
  public perfilUsuario$ = this.perfilUsuarioSubject.asObservable();

  private logadoSubject = new BehaviorSubject<boolean>(false);
  public logado$ = this.logadoSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      'https://pqsmpzxmiaxlcwqbgqlc.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxc21wenhtaWF4bGN3cWJncWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODg4MTcsImV4cCI6MjA2Njk2NDgxN30.o-VQXnNn1GgAbeVzuvh4HPFUgNr9iZyYpx9S9mz8Ci0'
    );
  }

  async inserirCategoria(desCat: string) {
    const { data, error } = await this.supabase
      .from('Categorias')
      .insert([
        { DesCat: desCat }
      ]);

    if (error) {
      console.error('Erro ao inserir categoria:', error.message);
    }

    return { data, error };
  }

  async listarCategorias() {
  const { data, error } = await this.supabase
    .from('Categorias')
    .select('CodCat,DesCat');

  return { data, error };
  }

  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  async salvarUsuario(userId: string, nome: string) {
    return await this.supabase.from('Usuario').insert({
      CadUsu: userId,
      NomUsu: nome
    });
  }

  // 🔑 LOGIN
  async login(email: string, senha: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password: senha
    });

    if (error) {
      this.logadoSubject.next(false); // garante false
      throw new Error(error.message);
    }

    const userId = data.user?.id;

    const { data: perfil, error: erroPerfil } = await this.supabase
      .from('Usuario')
      .select('CodUsu,NomUsu')
      .eq('CadUsu', userId);

    if (erroPerfil || !perfil || perfil.length === 0) {
      console.error('Erro ao buscar perfil:', erroPerfil?.message || 'Perfil não encontrado');
      this.logadoSubject.next(false);
      return undefined;
    }

    const usuario = perfil[0];
    this.perfilUsuarioSubject.next(usuario);
    this.logadoSubject.next(true); // ✅ marca como logado
    return usuario;
  }

  // 🔓 LOGOUT
  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    this.perfilUsuarioSubject.next(null);
    this.logadoSubject.next(false); // ❌ deslogado
  }

  getPerfilAtual(): any {
    return this.perfilUsuarioSubject.getValue();
  }

  getLogadoAtual(): boolean {
    return this.logadoSubject.getValue();
  }
}

