import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RecuperarContrasenaComponent } from './recuperar-contrasena.component';
import { REGISTRO_ROUTE } from 'app/registro-usuario/registro-usuario.route';
import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';

@NgModule({
  declarations: [RecuperarContrasenaComponent, CambioContrasenaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([REGISTRO_ROUTE]),
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class RecuperarContrasenaModule {}
