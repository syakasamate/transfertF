export interface Compte {


    depots: [
      {
        montant:number
      }
    ],
    partenaires: {
      ninea: string,
      rc: string,
      users: [
        {
          username:string,
          password: string,
          isActive: boolean,
          Nom:string
        }
      ]
    }
    date;
  }


