import { Route } from '@angular/router';
import { ActualizarDatosComponent } from './actualizar-datos.component';

export const ActualizarDatosRoute: Route = {
  path: 'actualizar-datos',
  component: ActualizarDatosComponent,
  data: {
    pageTitle: 'Actualizar datos',
  },
};
