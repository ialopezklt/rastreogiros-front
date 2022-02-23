import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaSims } from 'app/entities/respuesta-sims/respuesta-sims.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultargiroServiceService {
  constructor(private http: HttpClient) {}

  consumirServicio(pin: number, tipoDocumentoCliente: number, numeroDocumentoCliente: string): Observable<RespuestaSims | null> {
    const consultaPin = {
      tipoDocumentoCliente: tipoDocumentoCliente,
      numeroDocumentoCliente: numeroDocumentoCliente,
      pin: pin,
    };
    return this.http.post<RespuestaSims>('http://10.18.1.201:9957/api/consultaestadopin', consultaPin);
  }
}
