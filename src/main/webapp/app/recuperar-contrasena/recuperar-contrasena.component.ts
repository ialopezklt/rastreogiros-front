import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { faEye, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { User } from 'app/entities/user/user.model';
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
  usuarioConsultado: User;
  cedulaBuscadaExiste = false;
  busquedaRealizada = false;

  constructor(
    private formBuilder: FormBuilder,
    private applicationConfigService: ApplicationConfigService,
    private modalService: NgbModal,
    private router: Router,
    private usuarioService: UsuarioServiceService
  ) {
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
    this.usuarioService.consultarUsuario(this.usuarioId).subscribe(
      (resp: User) => {
        this.usuarioConsultado = resp;
        this.cedulaBuscadaExiste = true;
        this.busquedaRealizada = true;
        const cor = this.usuarioConsultado.correo!;
        const cel = this.usuarioConsultado.celular!;

        this.ofuscarUsuarioYCorreo(cor, cel.toString());
      },
      error => {
        this.cedulaBuscadaExiste = false;
        this.busquedaRealizada = true;
      }
    );
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
}
