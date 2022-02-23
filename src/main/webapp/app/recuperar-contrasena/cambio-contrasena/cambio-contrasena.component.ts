import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
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
  iconoMostadoBotonEmail = this.iconFaeye;
  iconoMostadoBotonSMS = this.iconFaeye;
  codigoEmailVisible = false;
  codigoSMSVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private applicationConfigService: ApplicationConfigService,
    private router: Router,
    private usuarioService: UsuarioServiceService,
    private alertService: AlertService
  ) {}

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
  actualizarClave(): void {
    this.cambioClavePayload.nuevaClave = this.contrasena1;

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
