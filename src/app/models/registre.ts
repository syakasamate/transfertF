import { Partenaire } from './partenaire';
export interface Registre {
  id?:number,
  Nom:string,
  username:string,
  password:string,
  role?:string,
  isActive?:boolean,
  image?:Blob,

}
