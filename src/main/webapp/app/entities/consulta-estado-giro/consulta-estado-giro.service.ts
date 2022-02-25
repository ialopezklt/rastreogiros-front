import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { RespuestaSims } from 'app/entities/respuesta-sims/respuesta-sims.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaEstadoGiroService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  consumirServicio(pin: string, tipoDocumentoCliente: string, numeroDocumentoCliente: string): Observable<RespuestaSims> {
    let parametros: HttpParams = new HttpParams();
    parametros = parametros.set('tipoDocumentoCliente', tipoDocumentoCliente);
    parametros = parametros.set('numeroDocumentoCliente', numeroDocumentoCliente);
    parametros = parametros.set('pin', pin);

    return this.http.get<RespuestaSims>(this.applicationConfigService.getEndpointFor('/api/consultagiro'), { params: parametros });
  }
}
