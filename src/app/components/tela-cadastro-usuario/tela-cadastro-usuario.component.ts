import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-tela-cadastro-usuario',
  templateUrl: './tela-cadastro-usuario.component.html',
  styleUrls: ['./tela-cadastro-usuario.component.css']
})
export class TelaCadastroUsuarioComponent implements OnInit {

  cadastroForm!: FormGroup;
  carregando = false;

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nomeCompleto: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]],
      confirmarSenha: [null, [Validators.required]]
    }, { validators: this.matchPassword });
  }

  matchPassword(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { mismatch: true };
  }

  async submitForm(): Promise<void> {
    if (this.cadastroForm.valid) {
      this.carregando = true;
      const { nomeCompleto, email, senha } = this.cadastroForm.value;

      // Cadastro no Supabase Auth
      const { data, error } = await this.supabaseService.signUp(email, senha);
      if (error) {
        alert('Erro ao cadastrar: ' + error.message);
        this.carregando = false;
        return;
      }

      // Salva dados adicionais na tabela 'Usuario'
      const userId = data.user?.id;
      await this.supabaseService.salvarUsuario(userId!, nomeCompleto);

      alert('Usuário cadastrado com sucesso!');
      this.cadastroForm.reset();
      this.carregando = false;
      this.router.navigate(['/login']);
    } else {
      Object.values(this.cadastroForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }
}
