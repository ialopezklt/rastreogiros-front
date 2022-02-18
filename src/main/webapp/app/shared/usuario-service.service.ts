import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { User } from 'app/entities/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  consultarUsuario(identificacion: string): Observable<User> {
    return this.http.get<User>(this.applicationConfigService.getEndpointFor('/api/publico/usuario') + '?usuario=' + identificacion);
  }
}
