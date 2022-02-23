import { Route } from '@angular/router';
import { RecuperarContrasenaComponent } from './recuperar-contrasena.component';

export const RECUPERAR_CONTRASENA_ROUTE: Route = {
  path: '',
  component: RecuperarContrasenaComponent,
  data: {
    pageTitle: 'Sign in',
  },
};
