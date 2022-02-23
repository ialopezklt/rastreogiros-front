import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { User } from 'app/entities/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticarService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  public login(usuario: string, clave: string): Observable<User> {
    const postPayload = { username: usuario, password: clave };
    return this.http.post<User>(this.applicationConfigService.getEndpointFor('/api/publico/login'), postPayload);
  }
}
