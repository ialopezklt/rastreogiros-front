export interface IUser {
  tipoDocumento?: string;
  numeroDocumento?: string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  clave?: string;
  correo?: string;
  celular?: number;
}

export class User implements IUser {
  constructor(
    public tipoDocumento?: string,
    public numeroDocumento?: string,
    public primerNombre?: string,
    public segundoNombre?: string,
    public primerApellido?: string,
    public segundoApellido?: string,
    public clave?: string,
    public correo?: string,
    public celular?: number
  ) {}
}

export function getUserIdentifier(user: IUser): string | undefined {
  return user.correo;
}
