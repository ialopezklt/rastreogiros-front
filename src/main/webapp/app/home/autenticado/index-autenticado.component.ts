import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'app/core/util/alert.service';
import { ConsultaEstadoGiroService } from 'app/entities/consulta-estado-giro/consulta-estado-giro.service';
import { RespuestaSims } from 'app/entities/respuesta-sims/respuesta-sims.model';
import { User } from 'app/entities/user/user.model';
import { LoginService } from 'app/login/login.service';
import { SessionStorageService } from 'ngx-webstorage';
import { GlobalConstants } from '../globales';

@Component({
  selector: 'jhi-index-autenticado',
  templateUrl: './index-autenticado.component.html',
  styleUrls: ['./index-autenticado.component.scss'],
})
export class IndexAutenticadoComponent {
  fg_consultar_giro: FormGroup;
  mensajeAlerta = '';
  estadoGiro = '';
  mostrarEstado = false;
  mensajeResultado = '';

  constructor(
    private formBuilder: FormBuilder,
    private consultaEstadoGiroService: ConsultaEstadoGiroService,
    private sessionStorageService: SessionStorageService,
    private route: Router,
    private alert: AlertService,
    private loginService: LoginService
  ) {
    this.fg_consultar_giro = this.formBuilder.group({
      txt_pin: ['', [Validators.required]],
    });
  }

  get txt_pin(): any {
    return this.fg_consultar_giro.get('txt_pin');
  }

  consultarEnvio(): void {
    this.mostrarEstado = false;
    this.mensajeAlerta = '';
    const usuario: User = JSON.parse(this.sessionStorageService.retrieve('usuario'));

    this.consultaEstadoGiroService.consumirServicio(this.txt_pin.value, usuario.tipoDocumento!, usuario.numeroDocumento!).subscribe(
      (resp: RespuestaSims) => {
        if (resp.estado === 'error') {
          this.mensajeAlerta = resp.mensaje!;
          this.alert.addAlert({ type: 'warning', toast: true });
        } else {
          this.estadoGiro = resp.estado!;
          this.mostrarEstado = true;
          if (resp.estado === 'disponible') {
            this.mensajeResultado = GlobalConstants.mensajeGiroDisponible;
          } else {
            this.mensajeResultado = GlobalConstants.mensajeGiroNODisponible;
          }
        }
      },
      () => {
        this.mensajeAlerta = 'No se pudo obtener la inormación, por favor intenta mas tarde.';
        this.alert.addAlert({ type: 'warning', toast: true });
      }
    );
  }

  actualizarDatos(): void {
    this.route.navigateByUrl('actualizar-datos');
  }

  nuevaConsulta(): void {
    this.mensajeAlerta = '';
    this.mensajeResultado = '';
    this.fg_consultar_giro.get('txt_pin')?.setValue('');
  }

  salir(): void {
    this.loginService.logout();
    window.location.href = 'https://www.supergiros.com.co';
  }
}
