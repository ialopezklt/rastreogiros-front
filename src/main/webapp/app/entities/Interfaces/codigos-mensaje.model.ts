export interface ICodigosMensaje {
  codigoEmail?: string;
  codigoSMS?: string;
}

export class CodigosMensaje implements ICodigosMensaje {
  constructor(public codigoEmail?: string, public codigoSMS?: string) {}
}
