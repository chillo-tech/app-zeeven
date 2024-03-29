export interface IWebinaireFields {
  collection: string;
  field: string;
  type: string;
  schema: Schema;
  meta: IMeta;
}

export interface IWebinaireView {
  duree: number;
  id: number;
  sort: any;
  public_cible: string;
  objectif_webinaire: string;
  description: string;
  plateforme: string;
  langue: string;
  status: string;
  titre: string;
  date_et_heure_prevue: string;
  date_created: string;
  date_updated: string;
  user_updated: string;
  user_created: string;
  format_de_la_session: any[];
  maitre_de_session: any[];
  image_webinaire: ImageWebinaire;
  formulaire: IWebinaireFormulaire;
}

export interface ImageWebinaire {
  id: number;
  textColor: string;
  backgroundColor: any;
  name: string;
  description: string;
  link: string;
  status: string;
  date_updated: string;
  date_created: string;
  user_updated: string;
  user_created: string;
  videos: any[];
}

export interface IWebinaireFormulaire {
  sort: any;
  inscription_webinaire: number;
  id: number;
  description: string;
  pied_de_page: string;
  formulaire_inscription: string;
  status: string;
  titre: string;
  date_updated: string;
  date_created: string;
  user_created: string;
  user_updated: string;
}

interface IMeta {
  readonly: boolean;
  hidden: boolean;
  required: boolean;
  sort?: any;
  id: number;
  note?: string;
  validation_message?: any;
  options?: Option;
  display_options?: Displayoption;
  translations?: any;
  conditions?: any;
  validation?: any;
  group?: any;
  width: string;
  display?: string;
  interface: string;
  special?: string[];
  field: string;
  collection: string;
}

interface Displayoption {
  showAsDot?: boolean;
  choices?: Choice2[];
  relative?: boolean;
}

interface Choice2 {
  text: string;
  value: string;
  foreground: string;
  background: string;
}

interface Option {
  choices?: Choice[];
  template?: string;
  placeholder?: string;
  colorOn?: string;
  colorOff?: string;
  includeSeconds?: boolean;
}

interface Choice {
  text: string;
  value: string;
}

interface Schema {
  name: string;
  table: string;
  schema: string;
  data_type: string;
  is_nullable: boolean;
  generation_expression?: any;
  default_value?: string;
  is_generated: boolean;
  max_length?: number;
  comment?: any;
  numeric_precision?: number;
  numeric_scale?: number;
  is_unique: boolean;
  is_primary_key: boolean;
  has_auto_increment: boolean;
  foreign_key_schema?: string;
  foreign_key_table?: string;
  foreign_key_column?: string;
}
