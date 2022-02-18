import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'app/entities/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroUsuarioService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  registrar(datosRegistro: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.applicationConfigService.getEndpointFor('/api/publico/registrousuario'), datosRegistro);
  }

  enviarMensajesRegistro(celular: number, email: string): Observable<any> {
    return this.http.get<string>(
      this.applicationConfigService.getEndpointFor('/api/publico/enviarmensajesvalidacion') +
        '?email=' +
        email +
        '&celular=' +
        celular.toString()
    );
  }
}
