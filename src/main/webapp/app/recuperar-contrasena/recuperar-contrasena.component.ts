import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { faEye, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { User } from 'app/entities/user/user.model';
import { UsuarioRecuperarClave } from 'app/entities/user/usuario-recuperar-clave.model';
import { UsuarioServiceService } from 'app/shared/usuario-service.service';

@Component({
  selector: 'jhi-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss'],
})
export class RecuperarContrasenaComponent implements OnInit {
  email_ofuscado = '';
  celular_ofuscado = '';
  codigoEmailVisible = false;
  codigoSMSVisible = false;
  iconFaeye = faEye;
  iconFaeyeSlash = faEyeSlash;
  iconFaSearch = faSearch;
  iconoMostadoBotonEmail = this.iconFaeye;
  iconoMostadoBotonSMS = this.iconFaeye;
  codigoSMSIngresado = '';
  codigoEmailIngresado = '';
  usuarioId = '';
  usuarioConsultado: UsuarioRecuperarClave;
  cedulaBuscadaExiste = false;
  busquedaRealizada = false;
  claseCodigoEmail = 'ng-valid';
  claseCodigoSMS = 'ng-valid';
  mostrarModalCambioClave = false;

  constructor(private router: Router, private usuarioService: UsuarioServiceService) {
    this.usuarioConsultado = new User();
  }

  ngOnInit(): void {
    this.codigoEmailIngresado = '';
  }

  // ===========================================================================================
  togleCodigoEmail(): void {
    this.codigoEmailVisible = !this.codigoEmailVisible;
    this.iconoMostadoBotonEmail = this.iconoMostadoBotonEmail === this.iconFaeye ? this.iconFaeyeSlash : this.iconFaeye;
  }

  // ===========================================================================================
  togleCodigoSMS(): void {
    this.codigoSMSVisible = !this.codigoSMSVisible;
    this.iconoMostadoBotonSMS = this.iconoMostadoBotonSMS === this.iconFaeye ? this.iconFaeyeSlash : this.iconFaeye;
  }

  // ===========================================================================================
  buscarPorUsername(): void {
    this.usuarioService.consultarUsuarioRecuperacionClave(this.usuarioId).subscribe({
      next: (resp: UsuarioRecuperarClave) => {
        this.usuarioConsultado = resp;
        this.cedulaBuscadaExiste = true;
        this.busquedaRealizada = true;
        const cor = this.usuarioConsultado.correo!;
        const cel = this.usuarioConsultado.celular!;

        this.ofuscarUsuarioYCorreo(cor, cel.toString());
      },
      error: error => {
        this.cedulaBuscadaExiste = false;
        this.busquedaRealizada = true;
      },
    });
  }

  // ===========================================================================================
  public ofuscarUsuarioYCorreo(correo: string, celular: string): void {
    let temp1 = '';
    temp1 = correo.split('@')[0].substring(0, 2);
    let temp2 = '';
    temp2 = correo.split('@')[0].substring(2).replace(/./g, '*');
    let temp3 = '';
    temp3 = correo.split('@')[1];

    this.email_ofuscado = temp1 + temp2 + '@' + temp3;

    this.celular_ofuscado = celular.replace(/....../, '******');
  }

  // ===========================================================================================
  validarCodigos(): void {
    if (this.usuarioConsultado.claveSMS === this.codigoSMSIngresado && this.usuarioConsultado.claveEmail === this.codigoEmailIngresado) {
      this.habilitarCambioClave();
    } else {
      this.claseCodigoEmail = this.usuarioConsultado.claveEmail === this.codigoEmailIngresado ? 'ng-valid' : 'ng-invalid';
      this.claseCodigoSMS = this.usuarioConsultado.claveSMS === this.codigoSMSIngresado ? 'ng-valid' : 'ng-invalid';
    }
  }
  // ===========================================================================================
  habilitarCambioClave(): void {
    this.mostrarModalCambioClave = true;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        codigoEmail: this.usuarioConsultado.claveEmail,
        codigoSMS: this.usuarioConsultado.claveSMS,
        username: this.usuarioConsultado.username,
      },
    };
    this.router.navigate(['/cambio-contrasena'], { state: { codigosEnviados: navigationExtras } });
  }
}
