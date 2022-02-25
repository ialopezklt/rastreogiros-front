import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'app/entities/user/user.model';
import { UsuarioServiceService } from 'app/shared/usuario-service.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.scss'],
})
export class ActualizarDatosComponent implements OnInit {
  primerNombre: string | undefined;
  segundoNombre: string | undefined;
  primerApellido!: string | undefined;
  segundoApellido!: string | undefined;
  tipoIdentificacion!: string | undefined;
  numeroIdentidicacion!: string | undefined;
  sessionStorageService!: SessionStorageService;
  fgActualizarDatos: FormGroup | undefined;

  constructor(usuarioService: UsuarioServiceService, sessionStorageService: SessionStorageService, formBuilder: FormBuilder) {
    this.fgActualizarDatos = formBuilder.group({
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const usuario: User = JSON.parse(this.sessionStorageService.retrieve('usuario'));

    this.primerNombre = usuario.primerNombre;
    this.segundoNombre = usuario.segundoNombre;
    this.primerApellido = usuario.primerApellido;
    this.segundoApellido = usuario.segundoApellido;
    this.tipoIdentificacion = usuario.tipoDocumento;
    this.numeroIdentidicacion = usuario.numeroDocumento;
  }
}
