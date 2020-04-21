export interface Transaction {
  id?:number,
  telEnv:string,
  montant:string,
  prenomEnv:string,
  nomBenef:string,
  prenomBenef:string,
  nomEnv:string,
  telBenef:string,
  comptesEnv?:string,
  status?:boolean,
  code?:number,
  cnibenef?: string,
  comptesRet?: string
  dateRetret?:string;
  
}
