import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'app/core/auth/account.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { User } from 'app/entities/user/user.model';
import { AutenticarService } from './autenticar.service';
import { FormAutenticacion } from './form-login-model';
import { GlobalConstants } from 'app/home/globales';
import { Router } from '@angular/router';
import { ParametroService } from 'app/entities/parametro/parametro.service';
import { IParametro } from 'app/entities/parametro/parametro.model';
import { AlertService } from 'app/core/util/alert.service';

@Component({
  selector: 'jhi-index-no-autenticado',
  templateUrl: './index-no-autenticado.component.html',
  styleUrls: ['./index-no-autenticado.component.scss'],
})
export class IndexNoAutenticadoComponent implements OnInit, AfterViewInit {
  @ViewChild('username', { static: false })
  username!: ElementRef;
  @Output() autenticado = new EventEmitter<boolean>();

  token: string | undefined;
  datosLogin = new FormAutenticacion('', '', '');
  submitted = false;
  focusId = false;
  focusPass = false;
  errorLogin = false;
  formularioValido = false;
  authenticationError = false;
  URL_TyC = GlobalConstants.URL_TyC;
  intentosDisponiblesDeLogin = 3;
  mensajeErrorLogin = '';
  tooltipCampoUsername = '';
  private listaParametros: IParametro[] | undefined;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private applicationConfigService: ApplicationConfigService,
    private autenticarService: AutenticarService,
    private router: Router,
    private parametroService: ParametroService,
    private service: AlertService
  ) {
    this.token = undefined;
  }

  ngOnInit(): void {
    // if already authenticated then navigate to home page
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
    // Trae los parametros generales
    this.parametroService.traeParametro().subscribe({
      next: (resp: IParametro[]) => {
        console.log(resp);
        this.listaParametros = resp;
        GlobalConstants.URL_TyC = this.listaParametros.find(elem => elem.parametroId === 35)!.valor!;
        GlobalConstants.mensajeErrorClaveIngreso = this.listaParametros.find(elem => elem.parametroId === 37)!.valor!;
        GlobalConstants.tooltipCampoUsername = this.listaParametros.find(elem => elem.parametroId === 38)!.valor!;
        this.URL_TyC = GlobalConstants.URL_TyC;
        this.tooltipCampoUsername = GlobalConstants.tooltipCampoUsername;
      },
      error: (err: any) => console.log(err),
    });
  }

  ngAfterViewInit(): void {
    this.URL_TyC = GlobalConstants.URL_TyC;
    this.tooltipCampoUsername = GlobalConstants.tooltipCampoUsername;

    /* this.username.nativeElement.focus(); */
  }

  public send(form: NgForm): void {
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
    this.autenticarService.login(this.datosLogin.username, this.datosLogin.password).subscribe({
      next: (usuario: User) => {
        this.service.addAlert({ type: 'success', toast: true, message: 'bienvenido' });
        this.autenticado.emit(true);
        GlobalConstants.autenticado = true;
        this.authenticationError = false;
      },
      error: error => {
        this.intentosDisponiblesDeLogin -= 1;
        if (this.intentosDisponiblesDeLogin === 0) {
          window.location.href = 'http://www.supergiros.com.co';
        } else {
          this.mensajeErrorLogin = GlobalConstants.mensajeErrorClaveIngreso.replace(
            '<--INTENTOS-->',
            this.intentosDisponiblesDeLogin.toString()
          );
          console.log(this.mensajeErrorLogin);
          this.service.addAlert({ type: 'warning', toast: true, message: this.mensajeErrorLogin });
        }
        this.errorLogin = true;
        this.authenticationError = true;
      },
    });
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
