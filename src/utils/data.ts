const TOKEN_PAYLOAD = 'TOKEN_PAYLOAD';
const USER_INFOS = 'USER_INFOS';
const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,5}$/;
const EMAIL_PATTERN = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/;
const STRING_WITH_NUMBERS_REGEXP = /^\D*(\d\D*){10,}$/;
const PHONE_ERROR_MESSAGE = "Votre numéro de téléphone est invalide";
const EMAIL_ERROR_MESSAGE = "Votre mail est invalide";
const INITIAL_STATE = {stepIndex: 0, campain: {}};
const UPDATE_CAMPAIN = "UPDATE_CAMPAIN";
const UPDATE_STEP_INDEX = "UPDATE_STEP_INDEX";
const RESET_CAMPAIN = "RESET_CAMPAIN";
const SET_NB_STEPS = "SET_NB_STEPS";
const DESCRIPTION = [
  {
    title: "Rédigez un message",
    image: "message.jpeg"
  },
  {
    title: "Envoyez le à vos contacts via plusieurs canaux",
    image: "multi-chanels-messsage.png"
  },
  {
    title: "Recevez des statiques",
    image: "statitics.jpeg"
  }
]
const STATISTICS = [
  {
    title: "300 mille",
    description: "messages",
    image: "message.png"
  },
  {
    title: "3",
    description: "Cannaux",
    image: "channels.png"
  },
  {
    title: "300",
    description: "Particuliers et entreprises",
    image: "people.png"
  }
]

export {
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
  STATISTICS
}