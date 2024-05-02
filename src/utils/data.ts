const BACKEND_BASE_PATH = '/api/backend';
const TOKEN_PAYLOAD = 'TOKEN_PAYLOAD';
const USER_INFOS = 'USER_INFOS';
const MESSAGE_VARIABLE_PATTERN = /{{[a-zA-Z0-9_ ]+}}/g;
const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,5}$/;
//const EMAIL_PATTERN = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/;
const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
/*
const URL_PATTERN =
  /((https?):\/\/)(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
*/
const URL_PATTERN =
  /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

const STRING_WITH_NUMBERS_REGEXP = /^\D*(\d\D*){10,}$/;
const PHONE_ERROR_MESSAGE =
  "Votre numéro de téléphone est invalide. Le premier ZERO n'est pas necessaire";
const INVALID_ERROR_MESSAGE = 'Ce champ est invalide';
const EMAIL_ERROR_MESSAGE = 'Votre mail est invalide';
const REQUIRED_FIELD_ERROR_MESSAGE = 'Ce champ est requis';
const GLOBAL_ERROR = 'Une erreur est survenue, nous allons la résoudre sous peu';
const GLOBAL_SUCCESS_MESSAGE = 'Votre demande a bien été enregistrée';
const INITIAL_STATE = { stepIndex: 0, campain: {} };
const UPDATE_CAMPAIN = 'UPDATE_CAMPAIN';
const UPDATE_STEP_INDEX = 'UPDATE_STEP_INDEX';
const SET_STATE = 'SET_STATE';
const RESET_CAMPAIN = 'RESET_CAMPAIN';
const SET_NB_STEPS = 'SET_NB_STEPS';
const UPDATE_DATA = 'UPDATE_DATA';
const CIVILITY_MAPPING = {
  MR_MRS: 'Mr & Mme',
  MME: 'Mme',
  Mme: 'Mme',
  MR: 'M.',
  Mr: 'M.',
  MLLE: 'Mlle',
  Mlle: 'Mlle',
};
const TICKET_TYPE = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};
const PROFILE_CATEGORIES: any = [
  {
    label: 'Contacts',
    slug: 'contact',
    url: '',
  },
  {
    label: 'Invitations',
    slug: 'invitation',
    url: '',
  },
  {
    label: 'Tables',
    slug: 'table',
    url: '',
  },
];
const EVENT_PROFILE_CATEGORIES = {
  contact: true,
  guest: false,
  invitation: false,
  schedule: false,
  table: false,
};
const WIFI_ENCODAGE = [
  {
    label: 'Aucun',
    value: 'LINK',
  },
  {
    label: 'WEP',
    value: 'WEP',
  },
  {
    label: 'WPA',
    value: 'WPA',
  },
  {
    label: 'WPA2 / EAP',
    value: 'WPA2-EAP',
  },
];
const QR_CODES_TYPES = [
  {
    label: 'TELEPHONE',
    icon: 'PHONE',
    value: 'PHONE',
    description: 'Au scan le QR code appelera à ce numéro.',
  },
  {
    label: 'EMAIL',
    icon: 'EMAIL',
    value: 'EMAIL',
    description: 'Au scan le QR code envera un email à cette adresse.',
  },
  {
    label: 'LIEN',
    icon: 'link',
    value: 'LINK',
    placeholder: 'https://zeeven.fr',
    description: 'Votre QR code ouvrira cette URL.',
  },
  {
    label: 'SMS',
    icon: 'SMS',
    value: 'SMS',
    description: 'Au scan le QR code envera un message à ce numéro.',
  },
  {
    label: 'WHATSAPP',
    icon: 'WHATSAPP',
    value: 'WHATSAPP',
    description: 'Au scan le QR code envera un message whatsapp à ce numéro.',
  },
  {
    label: 'WIFI',
    icon: 'wifi',
    value: 'WIFI',
    description: 'Au scan le QR code permettra de se connecter au WIFI',
  },
  {
    label: 'VCARD',
    icon: 'VCARD',
    value: 'VCARD',
    description: "Au scan le QR code permettra d'enregistrer ce contact.",
  },
  {
    label: 'TEXTE',
    icon: 'TEXT',
    value: 'TEXT',
    description: 'Au scan le QR code permettra de lire ce texte.',
  },
];
const GUESTS_OPTIONS = [
  {
    id: 'CSV',
    label: 'CSV',
    icon: 'csv',
    sublabel: "A partir d'un",
  },
  {
    id: 'CONTACTS',
    label: 'Mes contacts',
    icon: 'form',
    sublabel: 'Sélectionner parmis',
  },
  {
    id: 'FORM',
    label: 'Formulaire',
    icon: 'form',
    sublabel: 'Remplir un',
  },
];
const ACCOUNT_LINKS = [
  {
    label: 'Mon compte',
    url: '/me',
  },
  {
    label: 'Facturation',
    url: '/dashboard',
  },
  {
    label: 'Déconnexion',
    url: '/logout',
  },
];
const ACCOUNT_CATEGORIESLINKS = [
  {
    label: 'Messages',
    url: '/me',
  },
  {
    label: 'QRCODE',
    url: '/me/qr-code',
  },
];
const ACCOUNT_PAGES_LINKS = [
  {
    label: 'Tarifs',
    url: '/2-tarifs',
  },
  {
    label: 'Contacts',
    url: '/me/contacts',
  },
  {
    label: 'Mon compte',
    url: '/me/mon-compte',
  },
];
const DESCRIPTION = [
  {
    title: 'Rédigez un message',
    image: 'message.jpeg',
  },
  {
    title: 'Envoyez le à vos contacts via plusieurs canaux',
    image: 'multi-chanels-messsage.png',
  },
  {
    title: 'Recevez des statiques',
    image: 'statitics.jpeg',
  },
];
const STATISTICS = [
  {
    title: '300 mille',
    description: 'messages',
    image: 'message.png',
  },
  {
    title: '3',
    description: 'Cannaux',
    image: 'channels.png',
  },
  {
    title: '300',
    description: 'Particuliers et entreprises',
    image: 'people.png',
  },
];

const INFORMATIONS = [
  { value: 'civility', label: 'Civilité' },
  { value: 'firstName', label: 'Prénom' },
  { value: 'lastName', label: 'Nom' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Téléphone' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Heure' },
  { value: 'sender', label: 'Expéditeur' },
  { value: 'link', label: 'Lien' },
  { value: 'other', label: 'Autre' },
];

export const CATEGORIES = [
  {
    label: 'Annonce',
    image: 'announcement.png',
    value: 'ANNOUNCEMENT',
  },
  {
    label: 'Information',
    image: 'information.png',
    value: 'INFORMATION',
  },
  {
    label: 'Promotion',
    image: 'promotion.png',
    value: 'PROMOTION',
  },
  {
    label: 'Salon',
    image: 'salon.png',
    value: 'EVENT',
  } /*,
	{
		"label": "Anniversaire",
		"image": "birthdate.png",
		"value": "BIRTHDATE"
	},
	{
		"label": "Mariage",
		"image": "wedding.png",
		"value": "WEDDING"
	}*/,
];
const variableWithoutTemplate = (variable: string) => {
  return variable ? variable.replace('{{', '').replace('}}', '') : '';
};

const variableFieldType = (variable: string) => {
  const cleanedVariable = variableWithoutTemplate(variable);
  switch (cleanedVariable) {
    case 'date':
      return 'date';
    case 'time':
      return 'time';
    default:
      return 'text';
  }
};

const isUserInformation = (variable: string, guest: any) => {
  const cleanedVariable = variableWithoutTemplate(variable);
  let usersParams = ['civility', 'firstName', 'lastName', 'email', 'phoneIndex', 'phone'];
  if (guest && guest.others) {
    const keys = guest.others.map(({ key }: any) => key);
    usersParams = [...usersParams, ...keys];
  }
  return usersParams.indexOf(cleanedVariable) > -1;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};
const CHANNELS = [
  {
    label: 'Email',
    image: 'email.png',
    value: 'EMAIL',
  },
  {
    label: 'SMS',
    image: 'sms.png',
    value: 'SMS',
  },
  {
    label: 'Whatsapp',
    image: 'whatsapp.png',
    value: 'WHATSAPP',
  },
];
const QRCODE_APPEARANCE = ['NONE', 'TEXT_BOTTOM', 'TEXT_TOP'];
const WHITE_COLOR = '#FFFFFF';
const BLACK_COLOR = '#211c1c';
const QRCODE_DEFAULT_TEXT = 'Scannez ici';
const NONE = 'NONE';
const CONNAISSANCE_WEBINAIRE_CHOIX = [
  {
    value: 'social_networks',
    label: 'Les réseaux sociaux',
  },
  {
    value: 'newsletter',
    label: 'Par newsletter',
  },
  {
    value: 'search_engine',
    label: 'Via un moteur de recherche',
  },
  {
    value: 'website-blog',
    label: 'Via un site web ou un blog',
  },
  {
    value: 'friends-collegues_pov',
    label: "Par recommandation d'un ami ou d'un collegure",
  },
  {
    value: 'web_ads',
    label: 'Dans publicité en ligne',
  },
  {
    value: 'event-webinar',
    label: 'Durant un évènement ou le précédent webinaire',
  },
  {
    value: 'other',
    label: 'Autre',
  },
] as const;

const ACCOUNT_PARAMETERS = [
  {
    key: 'credits',
    label: 'Recharger le crédit',
    url: '/2-tarifs',
  },
  {
    key: 'roles',
    label: 'Attribuer des droits',
    url: '/me/contacts',
  }
];

const ROLES = [
  { value: 'ADMIN', label: 'Administrateur'},
  { value: 'CUSTOMER', label: 'Client'},
];

export {
  ACCOUNT_PARAMETERS,
  ACCOUNT_CATEGORIESLINKS,
  ACCOUNT_PAGES_LINKS,
  BACKEND_BASE_PATH,
  BLACK_COLOR,
  CHANNELS,
  CIVILITY_MAPPING,
  CONNAISSANCE_WEBINAIRE_CHOIX,
  DESCRIPTION,
  EMAIL_ERROR_MESSAGE,
  EMAIL_PATTERN,
  EVENT_PROFILE_CATEGORIES,
  GLOBAL_ERROR,
  GLOBAL_SUCCESS_MESSAGE,
  GUESTS_OPTIONS,
  INFORMATIONS,
  INITIAL_STATE,
  INVALID_ERROR_MESSAGE,
  MESSAGE_VARIABLE_PATTERN,
  NONE,
  PHONE_ERROR_MESSAGE,
  PHONE_PATTERN,
  PROFILE_CATEGORIES,
  QRCODE_APPEARANCE,
  QRCODE_DEFAULT_TEXT,
  QR_CODES_TYPES,
  REQUIRED_FIELD_ERROR_MESSAGE,
  RESET_CAMPAIN,
  SET_NB_STEPS,
  SET_STATE,
  STATISTICS,
  STRING_WITH_NUMBERS_REGEXP,
  TICKET_TYPE,
  TOKEN_PAYLOAD,
  UPDATE_CAMPAIN,
  UPDATE_DATA,
  UPDATE_STEP_INDEX,
  URL_PATTERN,
  USER_INFOS,
  WHITE_COLOR,
  WIFI_ENCODAGE,
  ROLES,
  isUserInformation,
  isValidUrl,
  variableFieldType,
  variableWithoutTemplate,
};
