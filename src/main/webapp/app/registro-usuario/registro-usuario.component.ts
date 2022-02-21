import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IUser, User } from 'app/entities/user/user.model';
import { RegistroUsuarioService } from './registro-usuario.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CodigosMensaje } from 'app/entities/Interfaces/codigos-mensaje.model';

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
  selector: 'jhi-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent implements OnInit {
  title = 'Supergiros - Rastreo de Giro';
  token: string | undefined;
  datosUsuario!: IUser;
  grupoFormularioDatosRegistro: FormGroup;
  pass2!: string;
  recapv2!: any;
  errorEnRegistro = false;
  closeResult = '';
  email_ofuscado = '';
  celular_ofuscado = '';
  codigoEmailVisible = false;
  codigoSMSVisible = false;
  iconFaeye = faEye;
  iconFaeyeSlash = faEyeSlash;
  iconoMostadoBotonEmail = this.iconFaeye;
  iconoMostadoBotonSMS = this.iconFaeye;
  codigosEnviados: CodigosMensaje | undefined;
  codigoEmailIngresado: string | undefined;
  codigoSMSIngresado: string | undefined;
  numeroIntentosRegistro = 0;
  modal: NgbModalRef | undefined;
  modalSalir: NgbModalRef | undefined;
  mostrarAlertaSalir = false;
  // 5 minutos de timeout
  timerEnvioMensajes: any | undefined;
  clickEnviar = false;
  intentosRestantes = 2;
  mostarAlertaIntentosExcedidos = false;
  mostrarAlertaCodigosErrados = false;
  inputCelular = '3';

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroUsuarioService,
    private applicationConfigService: ApplicationConfigService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.token = undefined;

    this.initDatosUsuario();

    // Se inicializa la sección del formulario
    this.grupoFormularioDatosRegistro = this.formBuilder.group(
      {
        tipoIdentificacion: ['', [Validators.required]],
        numeroIdentificacion: ['', [Validators.required, Validators.pattern('[A-Z0-9-]+')]],
        primerNombre: ['', [Validators.required, Validators.pattern('(?![A-Z0-9Ñ]*?([A-Z])\\1\\1)[A-Z0-9Ñ]+')]],
        segundoNombre: ['', Validators.pattern('(?![A-Z0-9Ñ]*?([A-Z])\\1\\1)[A-Z0-9Ñ]+')],
        primerApellido: ['', [Validators.required, Validators.pattern('(?![A-Z0-9Ñ]*?([A-Z])\\1\\1)[A-Z0-9Ñ]+')]],
        segundoApellido: ['', Validators.pattern('(?![A-Z0-9Ñ]*?([A-Z])\\1\\1)[A-Z0-9Ñ]+')],
        contrasena1: ['', [Validators.required, Validators.minLength(8)]],
        contrasena2: ['', [Validators.required]],
        correoElectronico: ['', [Validators.required, Validators.pattern('(?!.*(.)\\1\\1).{2,}@[a-zA-Z0-9-]{2,}.[a-zA-Z0-9-.]+')]],
        celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        aceptarTyC: ['', Validators.required],
        recaptcha: ['', Validators.required],
      },
      { validators: compararClavesValidator }
    );
  }

  get tipoIdentificacion(): any {
    return this.grupoFormularioDatosRegistro.get('tipoIdentificacion');
  }
  get numeroIdentificacion(): any {
    return this.grupoFormularioDatosRegistro.get('numeroIdentificacion');
  }
  get primerNombre(): any {
    return this.grupoFormularioDatosRegistro.get('primerNombre');
  }
  get segundoNombre(): any {
    return this.grupoFormularioDatosRegistro.get('segundoNombre');
  }
  get primerApellido(): any {
    return this.grupoFormularioDatosRegistro.get('primerApellido');
  }
  get segundoApellido(): any {
    return this.grupoFormularioDatosRegistro.get('segundoApellido');
  }
  get contrasena1(): any {
    return this.grupoFormularioDatosRegistro.get('contrasena1');
  }
  get contrasena2(): any {
    return this.grupoFormularioDatosRegistro.get('contrasena2');
  }
  get correoElectronico(): any {
    return this.grupoFormularioDatosRegistro.get('correoElectronico');
  }
  get celular(): any {
    return this.grupoFormularioDatosRegistro.get('celular');
  }
  get recaptcha(): any {
    return this.grupoFormularioDatosRegistro.get('recaptcha');
  }
  get aceptarTyC(): any {
    return this.grupoFormularioDatosRegistro.get('aceptarTyC');
  }

  ngOnInit(): void {
    //    this.datosUsuario
  }

  getValue(event: KeyboardEvent): boolean {
    // const result= (event.target as HTMLInputElement).value;
    if (event.key.match('[0-9]')) {
      return true;
    } else {
      return false;
    }
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
  initDatosUsuario(): void {
    this.datosUsuario = new User();
    this.datosUsuario.celular = 0;
    this.datosUsuario.clave = '';
    this.datosUsuario.correo = '';
    this.datosUsuario.numeroDocumento = 0;
    this.datosUsuario.primerApellido = '';
    this.datosUsuario.primerNombre = '';
    this.datosUsuario.segundoApellido = '';
    this.datosUsuario.segundoNombre = '';
    this.datosUsuario.tipoDocumento = '';
  }

  // ===========================================================================================
  public enviarDatosFormulario(): void {
    this.errorEnRegistro = false;

    this.datosUsuario.celular = this.celular?.value;
    this.datosUsuario.clave = this.contrasena1?.value;
    this.datosUsuario.correo = this.correoElectronico?.value;
    this.datosUsuario.numeroDocumento = this.numeroIdentificacion?.value;
    this.datosUsuario.primerApellido = this.primerApellido?.value;
    this.datosUsuario.primerNombre = this.primerNombre?.value;
    this.datosUsuario.segundoApellido = this.segundoApellido?.value;
    this.datosUsuario.segundoNombre = this.segundoNombre?.value;
    this.datosUsuario.tipoDocumento = this.tipoIdentificacion?.value;

    this.registroService.registrar(this.datosUsuario).subscribe(
      (resp: IUser) => {
        this.datosUsuario = resp;
        if (this.timerEnvioMensajes !== undefined) {
          clearTimeout(this.timerEnvioMensajes);
        }
        this.modal?.close();
        console.log(resp);
        alert('Bienvenido');
        this.router.navigateByUrl('/');
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorEnRegistro = true;
        this.clickEnviar = false;
      }
    );
  }

  // ===========================================================================================
  public validarCodigoIngresados(): void {
    this.intentosRestantes -= 1;

    if (this.intentosRestantes <= 0) {
      this.mostarAlertaIntentosExcedidos = true;
      if (this.timerEnvioMensajes !== undefined) {
        clearTimeout(this.timerEnvioMensajes);
      }

      setTimeout(() => {
        this.modal?.close();
        this.router.navigateByUrl('/');
      }, 500);
    } else {
      if (this.codigoEmailIngresado === this.codigosEnviados?.codigoEmail && this.codigoSMSIngresado === this.codigosEnviados?.codigoSMS) {
        this.clickEnviar = true;
        this.enviarDatosFormulario();
      } else {
        this.mostrarAlertaCodigosErrados = true;
      }
    }
  }

  // ===========================================================================================

  public salir(): void {
    this.router.navigateByUrl('/');
  }

  // ===========================================================================================
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
    if (this.numeroIdentificacion.indexOf('-') >= 0 && tecla === '-') {
      tecla = '';
    }
    input = tecla;
    return !!/[\d\s\w-]/.test(input);
  }

  // ===========================================================================================

  enviarMensajesValidacion(): void {
    if (this.timerEnvioMensajes !== undefined) {
      clearTimeout(this.timerEnvioMensajes);
    }
    this.timerEnvioMensajes = setTimeout(() => {
      this.router.navigateByUrl('/');
      this.modal?.close();
    }, 300000);
    const numcel = this.celular.value;
    const dircorreo = this.correoElectronico.value;
    this.registroService.enviarMensajesRegistro(numcel, dircorreo).subscribe(
      (resp: CodigosMensaje) => {
        this.codigosEnviados = resp;
      },
      (err: any) => console.log(err)
    );
  }

  // ===========================================================================================
  abrirModal(content: any): void {
    this.numeroIntentosRegistro += 1;
    if (this.numeroIntentosRegistro >= 2) {
      this.mostrarAlertaSalir = true;
      setTimeout(() => {
        this.modal?.close();
        this.router.navigateByUrl('/');
      }, 500);
    }
    this.enviarMensajesValidacion();
    // ofuscar correo y telefono
    let temp1 = '';
    temp1 = this.correoElectronico.value.split('@')[0].substring(0, 2);
    let temp2 = '';
    temp2 = this.correoElectronico.value.split('@')[0].substring(2).replace(/./g, '*');
    let temp3 = '';
    temp3 = this.correoElectronico.value.split('@')[1];

    this.email_ofuscado = temp1 + temp2 + '@' + temp3;

    this.celular_ofuscado = this.celular.value.replace(/....../, '******');

    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modal.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // ===========================================================================================
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // ===========================================================================================
}
