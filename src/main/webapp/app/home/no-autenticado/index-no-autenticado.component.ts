import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { User } from 'app/entities/user/user.model';
import { FormAutenticacion } from './form-login-model';
import { GlobalConstants } from 'app/home/globales';
import { Router } from '@angular/router';
import { ParametroService } from 'app/entities/parametro/parametro.service';
import { IParametro } from 'app/entities/parametro/parametro.model';
import { AlertService } from 'app/core/util/alert.service';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { Login } from 'app/login/login.model';
import { UserService } from 'app/entities/user/user.service';

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
    private accountService: AccountService,
    private router: Router,
    private parametroService: ParametroService,
    private service: AlertService,
    private sessionStorageService: SessionStorageService,
    private authServerProvider: AuthServerProvider,
    private userService: UserService
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
    this.parametroService.traeParametrosPublicos().subscribe({
      next: (resp: IParametro[]) => {
        console.log(resp);
        this.listaParametros = resp;
        GlobalConstants.URL_TyC = this.listaParametros.find(elem => elem.parametroId === 35)!.valor!;
        GlobalConstants.mensajeErrorClaveIngreso = this.listaParametros.find(elem => elem.parametroId === 37)!.valor!;
        GlobalConstants.tooltipCampoUsername = this.listaParametros.find(elem => elem.parametroId === 38)!.valor!;
        GlobalConstants.mensajeGiroDisponible = this.listaParametros.find(elem => elem.parametroId === 40)!.valor!;
        GlobalConstants.mensajeGiroNODisponible = this.listaParametros.find(elem => elem.parametroId === 41)!.valor!;
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

  public login(): void {
    this.submitted = true;
    const loginStruct: Login = new Login(this.datosLogin.username, this.datosLogin.password, false);

    this.authServerProvider.login(loginStruct).subscribe({
      next: () => {
        this.consultarDatosUsuario();
        this.service.addAlert({ type: 'success', toast: true, message: 'bienvenido' });
        this.autenticado.emit(true);
        GlobalConstants.autenticado = true;
        this.authenticationError = false;
      },
      error: () => {
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

  public consultarDatosUsuario(): void {
    this.userService.consultar().subscribe({
      next: (usuario: User) => {
        this.sessionStorageService.store('username', usuario.numeroDocumento);
        this.sessionStorageService.store('usuario', JSON.stringify(usuario));
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
