export interface IParametro {
  parametroId: number;
  valor: string;
  descripcion?: string;
}

export class Parametro implements IParametro {
  constructor(public parametroId: number, public valor: string, public descripcion?: string) {}
}
