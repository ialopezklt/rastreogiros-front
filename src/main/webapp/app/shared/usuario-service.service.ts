import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { UsuarioRecuperarClave } from 'app/entities/user/usuario-recuperar-clave.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  consultarUsuarioRecuperacionClave(identificacion: string): Observable<UsuarioRecuperarClave> {
    return this.http.get<UsuarioRecuperarClave>(
      this.applicationConfigService.getEndpointFor('/api/publico/usuariorecuperarclave') + '?usuario=' + identificacion
    );
  }

  actualizarContrasena(datosActualizacion: UsuarioRecuperarClave): Observable<string> {
    return this.http.put<string>(this.applicationConfigService.getEndpointFor('/api/publico/usuariocambiarclave'), datosActualizacion);
  }
}
