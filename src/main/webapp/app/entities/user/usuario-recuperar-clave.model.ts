export interface IUsuarioRecuperarClave {
  correo?: string;
  celular?: number;
  claveSMS?: string;
  claveEmail?: string;
  nuevaClave?: string;
  username?: string;
}

export class UsuarioRecuperarClave implements IUsuarioRecuperarClave {
  constructor(
    public correo?: string,
    public celular?: number,
    public claveSMS?: string,
    public claveEmail?: string,
    public nuevaClave?: string,
    public username?: string
  ) {}
}
