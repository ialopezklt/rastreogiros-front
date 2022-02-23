export interface IRespuestaSims {
  pin?: number;
  estado?: string;
  mensaje?: string;
}

export class RespuestaSims implements IRespuestaSims {
  constructor(public pin?: number, public estado?: string, public mensaje?: string) {}
}
