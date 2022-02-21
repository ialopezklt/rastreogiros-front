import { Injectable } from '@angular/core';
import { Parametro } from '../parametro/parametro.model';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParametroService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  public traeParametro(): Observable<Parametro[]> {
    return this.http.get<Parametro[]>(this.applicationConfigService.getEndpointFor('/api/publico/parametros'));
  }
}
