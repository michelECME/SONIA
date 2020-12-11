import { Color } from 'app/shared/model/enumerations/color.model';

export interface IRopa {
  id?: number;
  marca?: string;
  talla?: string;
  tela?: string;
  color?: Color;
}

export class Ropa implements IRopa {
  constructor(public id?: number, public marca?: string, public talla?: string, public tela?: string, public color?: Color) {}
}
