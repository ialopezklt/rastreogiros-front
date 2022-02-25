import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { IndexAutenticadoComponent } from './autenticado/index-autenticado.component';
import { IndexNoAutenticadoComponent } from './no-autenticado/index-no-autenticado.component';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarDatosComponent } from 'app/actualizar-datos/actualizar-datos.component';
import { ActualizarDatosRoute } from 'app/actualizar-datos/actualizar-datos.route';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([HOME_ROUTE, ActualizarDatosRoute]),
    NgbModule,
    RecaptchaModule,
    FormsModule,
    RecaptchaFormsModule,
  ],
  declarations: [HomeComponent, IndexAutenticadoComponent, IndexNoAutenticadoComponent, ActualizarDatosComponent],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
})
export class HomeModule {}
