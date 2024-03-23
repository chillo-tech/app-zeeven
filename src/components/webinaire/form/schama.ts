import { EMAIL_ERROR_MESSAGE, EMAIL_PATTERN } from '@/utils';
import * as yup from 'yup';

const schema = yup.object({
  nom: yup.string(),
  prenom: yup.string(),
  email: yup
    .string()
    .email(EMAIL_ERROR_MESSAGE)
    .required(EMAIL_ERROR_MESSAGE)
    .matches(EMAIL_PATTERN, { message: EMAIL_ERROR_MESSAGE }),
  numero_telephone: yup.string(),
  consentement_marketing: yup.boolean(),
  connaissance_webinaire: yup.string(),
});

export { schema };
