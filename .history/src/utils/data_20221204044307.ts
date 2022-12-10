const TOKEN_PAYLOAD = 'TOKEN_PAYLOAD';
const USER_INFOS = 'USER_INFOS';
const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,5}$/;
//const EMAIL_PATTERN = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/;
const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const STRING_WITH_NUMBERS_REGEXP = /^\D*(\d\D*){10,}$/;
const PHONE_ERROR_MESSAGE = 'Votre numéro de téléphone est invalide';
const EMAIL_ERROR_MESSAGE = 'Votre mail est invalide';
const INITIAL_STATE = { stepIndex: 0, campain: {} };
const UPDATE_CAMPAIN = 'UPDATE_CAMPAIN';
const UPDATE_STEP_INDEX = 'UPDATE_STEP_INDEX';
const RESET_CAMPAIN = 'RESET_CAMPAIN';
const SET_NB_STEPS = 'SET_NB_STEPS';
const ACCOUNT_LINKS = [
  {
    label: 'Mon compte',
    url: '/me'
  },
  {
    label: 'Facturation',
    url: '/dashboard'
  },
  {
    label: 'Déconnexion',
    url: '/logout'
  }
];
const ACCOUNT_CATEGORIESLINKS = [
  {
    label: 'Campagnes',
    url: '/me'
  },
  {
    label: 'Mon compte',
    url: '/me/mon-compte'
  }
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

const categories = [
  {
     "label": "Annonce",
     "image": "announcement.png",
     "value": "ANNOUNCEMENT"
  },
  {
     "label": "Information",
     "image": "information.png",
     "value": "INFORMATION"
  },
  {
     "label": "Promotion",
     "image": "promotion.png",
     "value": "PROMOTION"
  },
  {
     "label": "Salon",
     "image": "salon.png",
     "value": "EVENT"
  },
  {
     "label": "Anniversaire",
     "image": "birthdate.png",
     "value": "BIRTHDATE"
  },
  {
     "label": "Mariage",
     "image": "wedding.png",
     "value": "WEDDING"
  }
]
const variableWithoutTemplate = (variable: string) => {
  return variable ? variable.replace('{{', '').replace('}}', '') : '';
};

const variableFieldType = (variable: string) => {
  const cleanedVariable = variableWithoutTemplate(variable);
  switch (cleanedVariable) {
    case "date":
      return "date";
    case "time":
      return "time";
    default:
      return "text";
  }
};

const isUserInformation = (variable: string) => {
  const cleanedVariable = variableWithoutTemplate(variable);

  return (
    ['civility', 'firstName', 'lastName', 'email', 'phoneIndex', 'phone'].indexOf(cleanedVariable) > -1
  );
};

export {
  variableFieldType,
  isUserInformation,
  variableWithoutTemplate,
  INFORMATIONS,
  INITIAL_STATE,
  UPDATE_CAMPAIN,
  UPDATE_STEP_INDEX,
  RESET_CAMPAIN,
  SET_NB_STEPS,
  TOKEN_PAYLOAD,
  USER_INFOS,
  PHONE_PATTERN,
  EMAIL_PATTERN,
  STRING_WITH_NUMBERS_REGEXP,
  PHONE_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  DESCRIPTION,
  STATISTICS,
  ACCOUNT_CATEGORIESLINKS
};
