import { Route } from '@angular/router';
import { RegistroUsuarioComponent } from './registro-usuario.component';

export const REGISTRO_ROUTE: Route = {
  path: '',
  component: RegistroUsuarioComponent,
  data: {
    pageTitle: 'Sign in',
  },
};
