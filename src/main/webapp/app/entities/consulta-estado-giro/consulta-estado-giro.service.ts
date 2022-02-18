import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class ConsultaEstadoGiroService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  public consultarSIMS(pin: string): void {
    // Obtener la URL del servicio
    let url = 'http://10.18.1.201:9957?pin=' + pin;
  }
}
