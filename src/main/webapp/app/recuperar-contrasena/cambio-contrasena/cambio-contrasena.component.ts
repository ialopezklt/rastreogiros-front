import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { UsuarioServiceService } from 'app/shared/usuario-service.service';

@Component({
  selector: 'jhi-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.scss'],
})
export class CambioContrasenaComponent implements OnInit {
  nuevaContrasena1: string | undefined;
  nuevaContrasena2: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private applicationConfigService: ApplicationConfigService,
    private modalService: NgbModal,
    private router: Router,
    private usuarioService: UsuarioServiceService
  ) {}

  ngOnInit(): void {
    this.nuevaContrasena1 = '';
    this.nuevaContrasena2 = '';
  }
}
