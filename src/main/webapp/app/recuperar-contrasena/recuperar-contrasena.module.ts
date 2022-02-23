import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RecuperarContrasenaComponent } from './recuperar-contrasena.component';
import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';
import { RECUPERAR_CONTRASENA_ROUTE } from './recuperar-contrasena.route';

@NgModule({
  declarations: [RecuperarContrasenaComponent, CambioContrasenaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([RECUPERAR_CONTRASENA_ROUTE]),
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class RecuperarContrasenaModule {}
