import { Route } from '@angular/router';
import { RecuperarContrasenaComponent } from 'app/recuperar-contrasena/recuperar-contrasena.component';

export const REGISTRO_ROUTE: Route = {
  path: '',
  component: RecuperarContrasenaComponent,
  data: {
    pageTitle: 'Sign in',
  },
};
