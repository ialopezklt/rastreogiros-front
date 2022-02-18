import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'app/core/auth/account.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { User } from 'app/entities/user/user.model';
import { AutenticarService } from './autenticar.service';
import { FormAutenticacion } from './form-login-model';
import { GlobalConstants } from 'app/home/globales';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-index-no-autenticado',
  templateUrl: './index-no-autenticado.component.html',
  styleUrls: ['./index-no-autenticado.component.scss'],
})
export class IndexNoAutenticadoComponent {
  token: string | undefined;
  datosLogin = new FormAutenticacion('', '', '');
  submitted = false;
  focusId = false;
  focusPass = false;
  autenticado = GlobalConstants.autenticado;
  errorLogin = false;
  formularioValido = false;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private applicationConfigService: ApplicationConfigService,
    private autenticarService: AutenticarService,
    private router: Router
  ) {
    this.token = undefined;
  }

  public send(form: NgForm): void {
    console.log('entro');
    this.submitted = true;

    /*
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    } */

    this.login();

    // relizar login
    // this.login(form.controls["numero_id"]);

    console.debug(`Token [${this.token}] generated`);
  }

  public login(): void {
    this.autenticarService.login(this.datosLogin.username, this.datosLogin.password).subscribe(
      (usuario: User) => {
        console.log(usuario);
        this.autenticado = true;
        GlobalConstants.autenticado = true;
        this.router.navigateByUrl('/');
        window.location.reload();
      },
      error => {
        console.log(error);
        this.errorLogin = true;
      }
    );
  }

  public validarIngresoDatos(): void {
    if (this.datosLogin.aceptaTyC && this.datosLogin.username !== '' && this.datosLogin.aceptaTyC) {
      this.errorLogin = false;
      this.formularioValido = true;
    }
  }

  public actualizarDatos(): void {
    return;
  }

  public restrictInputNumeroId(e: any): boolean {
    let input = '';
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    let tecla = String.fromCharCode(e.which);
    if (this.datosLogin.username.indexOf('-') >= 0 && tecla === '-') {
      tecla = '';
    }
    input = tecla;
    return !!/[\d\s\w-]/.test(input);
  }
}
