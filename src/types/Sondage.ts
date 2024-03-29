interface ISondage {
  id: number;
  status: string;
  sort: any;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  intitule: string;
  Description: any;
  date_debut: string;
  date_fin: string;
  reponses_sondage: number[];
  question: {
    question_id: IQuestion;
  }[];
  entreprise: IEntreprise;
}

export interface IEntreprise {
  id: number;
  status: string;
  sort: any;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  description: string;
  type: string;
  mail: any;
  poste_du_contact: string;
  nom: string;
  telephone: string;
  sondages: number[];
  adresse: number[];
}

export interface IQuestion {
  id: number;
  status: string;
  sort: any;
  user_created: string;
  date_created: string;
  user_updated?: string;
  date_updated?: string;
  label: string;
  description: any;
  est_obligatoire: boolean;
  secteur?: string;
  type?: string;
  choix: {
    choix_id: IChoix;
  }[];
}

export interface IChoix {
  id: number;
  status: string;
  sort: any;
  user_created: string;
  date_created: string;
  valeur: string;
  user_updated: any;
  date_updated: any;
  intitule: string;
}

export type { ISondage };
