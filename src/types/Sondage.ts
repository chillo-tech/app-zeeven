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
  entreprise: number;
  reponses_sondage: number[];
  question: {
    question_id: IQuestion;
  }[];
}

interface IQuestion {
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

interface IChoix {
  id: number;
  status: string;
  sort: any;
  user_created: string;
  date_created: string;
  user_updated: any;
  date_updated: any;
  intitule: string;
}

export type { ISondage };
