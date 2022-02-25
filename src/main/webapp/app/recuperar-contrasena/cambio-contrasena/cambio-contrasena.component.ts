import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'app/core/util/alert.service';
import { UsuarioRecuperarClave } from 'app/entities/user/usuario-recuperar-clave.model';
import { UsuarioServiceService } from 'app/shared/usuario-service.service';

// Validator para comparar si las claves ingresadas son iguales
export const compararClavesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pass1 = control.get('contrasena1');
  const pass2 = control.get('contrasena2');

  if (pass1 && pass2 && pass1.value === pass2.value) {
    pass2.setErrors(null);
    return null;
  } else {
    pass2?.setErrors({ clavesIguales: false });
    return { clavesIguales: false };
  }
};
@Component({
  selector: 'jhi-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.scss'],
})
export class CambioContrasenaComponent implements OnInit {
  @Input()
  cambioClavePayload!: UsuarioRecuperarClave;
  nuevaContrasena1: string | undefined;
  nuevaContrasena2: string | undefined;
  fgCambioClave!: FormGroup;
  iconFaeye = faEye;
  iconFaeyeSlash = faEyeSlash;
  iconoMostadoClave1 = this.iconFaeye;
  iconoMostadoClave2 = this.iconFaeye;
  codigoClave1Visible = false;
  codigoClave2Visible = false;
  claseCSSclave1 = 'ng-valid';
  claseCSSclave2 = 'ng-valid';
  parametrosRecibidos: any | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioServiceService,
    private alertService: AlertService
  ) {
    this.parametrosRecibidos = router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.nuevaContrasena1 = '';
    this.nuevaContrasena2 = '';
    this.fgCambioClave = this.formBuilder.group(
      {
        contrasena1: ['', [Validators.required, Validators.minLength(8)]],
        contrasena2: ['', [Validators.required]],
      },
      { validators: compararClavesValidator }
    );
  }

  get contrasena1(): any {
    return this.fgCambioClave.get('contrasena1');
  }
  get contrasena2(): any {
    return this.fgCambioClave.get('contrasena2');
  }
  // ===========================================================================================
  togleClave1(): void {
    this.codigoClave1Visible = !this.codigoClave1Visible;
    this.iconoMostadoClave1 = this.iconoMostadoClave1 === this.iconFaeye ? this.iconFaeyeSlash : this.iconFaeye;
  }

  // ===========================================================================================
  togleClave2(): void {
    this.codigoClave2Visible = !this.codigoClave2Visible;
    this.iconoMostadoClave2 = this.iconoMostadoClave2 === this.iconFaeye ? this.iconFaeyeSlash : this.iconFaeye;
  }
  // ===========================================================================================
  actualizarClave(): void {
    this.cambioClavePayload = new UsuarioRecuperarClave();
    this.cambioClavePayload.nuevaClave = this.contrasena1;
    this.cambioClavePayload.claveEmail = this.parametrosRecibidos.codigosEnviados.codigoEmail;
    this.cambioClavePayload.claveSMS = this.parametrosRecibidos.codigosEnviados.codigoSMS;

    this.usuarioService.actualizarContrasena(this.cambioClavePayload).subscribe({
      next: () => {
        this.alertService.addAlert({ type: 'success', message: 'Actualización exitosa', toast: true });
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 1500);
      },
      error: () => {
        this.alertService.addAlert({
          type: 'danger',
          message: 'La actualización no se pudo realizar, por favor intenta mas tarde',
          toast: true,
        });
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 1500);
      },
    });
  }
}
