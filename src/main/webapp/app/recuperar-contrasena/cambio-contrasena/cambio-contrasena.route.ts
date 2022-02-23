import { Route } from '@angular/router';
import { CambioContrasenaComponent } from './cambio-contrasena.component';

export const CAMBIO_CONTRASENA_ROUTE: Route = {
  path: '',
  component: CambioContrasenaComponent,
  data: {
    pageTitle: 'Sign in',
  },
};
