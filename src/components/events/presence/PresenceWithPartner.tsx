import Message from '@/components/Message';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import ImageDisplay from '@/components/image-display';
import { pattchData } from '@/services';
import { PHONE_ERROR_MESSAGE } from '@/utils';
import { RadioGroup } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
const presences = [
  {
    id: '1',
    value: 'PRESENT',
    label: 'Oui',
    sublabel: 'Avec plaisir',
  },
  {
    id: '0',
    value: 'ABSENT',
    label: 'Non',
    sublabel: 'Avec beaucoup de regrets',
  },
];
const civilites = [
  {
    id: 1,
    value: 'MR',
    label: 'Monsieur',
  },
  {
    id: 2,
    value: 'MS',
    label: 'Madame',
  }
];
export type Message = {
  civility: string;
  name: string;
  partner: string;
  phone: string;
  phoneIndex: string;
  presence: boolean;
  adults: string;
  children: string;
};
const schema = yup
  .object({
    presence: yup.string().trim().required('Serez vous présents'),
    civility: yup.string().trim().required('Votre civilité'),
    name: yup.string().trim().required('Votre nom et votre prénom'),
    partner: yup
              .string()
              .when("presence", {
                is: (val: String) => val === "PRESENT",
                then: yup.string().required("Nom et votre prénom de votre partenaire")
              }),
    adults: yup.string().trim().required("Combien d'adultes"),
    children: yup.string().trim().required("Combien d'enfants"),
    phoneIndex: yup.string().trim().required('Sélectionner un indicatif'),
    phone: yup
      .string()
      .required(PHONE_ERROR_MESSAGE)
      .min(9, PHONE_ERROR_MESSAGE)
      .max(9, PHONE_ERROR_MESSAGE),
  })
  .required();
function PresenceWithPartner({ data }: any) {
  const [presence, setPresence] = useState();
  const [civility, setCivility] = useState();
  const handleSuccess = (error: any) => {
    error.preventDefault();
    mutation.reset();
    router.push('/');
  };
  const mutation = useMutation({
    mutationFn: (message: any) => pattchData(`/api/backoffice/Event/${data.id}`, message),
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Message>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  console.log(errors);
  
  const onSubmit = (data: Message) => {
    const guestQuery: any = { guests: { create: [{ guest_id: data }] } };
    mutation.mutate(guestQuery);
  };
  const handleRadioButton = (name: 'presence' | 'civility', value: any) => {
    setValue(name, value);
    trigger(name);

    if (name === 'presence' && value === 'ABSENT') {
      setValue('children', '0');
      trigger('children');
      setValue('adults', '0');
      trigger('adults');
    }

    if (name === 'presence' && value === 'PRESENT') {
      setValue('children', '0');
      setValue('adults', '2');
    }
  };
  const [selectedRadioButn, setSelectedRadioBtn] = React.useState('M');
  const isRadioSelected = (value: string): boolean => true;

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);

  return (
    <section
      className={classNames(
        'mx-auto mt-10 grid w-11/12 rounded-md border border-slate-200 shadow-sm md:w-3/4 md:grid-cols-7 mb-8'
      )}
      style={{ backgroundColor: data['backgroundcolor'] ? data['backgroundcolor'] : '#ffffff' }}
    >
      <div className={classNames('md:col-span-5')}>
        <article className="md:p-5">
          {mutation.isLoading ? (
            <Message
              type="loading"
              firstMessage="Un instant"
              secondMessage="Nous enregistrons vos informations"
            />
          ) : null}
          {mutation.isError ? (
            <Message
              type="error"
              firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
              secondMessage="Nous résolvons le problème"
              action={handleSuccess}
              actionLabel="Aller à l'accueil"
            />
          ) : null}
          {mutation.isSuccess ? (
            <Message
              type="success"
              firstMessage="Nous avons reçu vos informations."
              secondMessage="Votre billet vous sera envoyé sous peu avec les informations relatives à votre installation pour la soirée."
              action={handleSuccess}
              actionLabel="Aller à l'accueil"
            />
          ) : null}
          {mutation.isIdle ? (
            <form noValidate className="flex flex-col space-y-4 p-2 md:p-0" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <RadioGroup
                  value={presence}
                  onChange={(value) => handleRadioButton('presence', value)}
                  name="presence"
                  className=""
                >
                  <RadioGroup.Label className="text-md">Votre pr&eacute;sence</RadioGroup.Label>
                  <div className="grid items-center gap-4 md:grid-cols-2">
                    {presences.map((presence) => (
                      <RadioGroup.Option
                        key={presence.value}
                        value={presence.value}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                              : ''
                          }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'}
                    relative cursor-pointer rounded-md border border-gray-300 px-5 py-4 text-center shadow-sm focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`text-3xl font-medium ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {presence.label}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`text-md inline ${
                                  checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                              >
                                <span>{presence.sublabel}</span>
                              </RadioGroup.Description>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <p className="text-red-500">{errors.presence?.message}</p>
              </div>
              <div>
                <RadioGroup
                  value={civility}
                  onChange={(value) => {
                    handleRadioButton('civility', value);
                  }}
                  name="civility"
                >
                  <RadioGroup.Label>Votre civilité</RadioGroup.Label>
                  <div className="grid items-center gap-4 md:grid-cols-2">
                    {civilites.map((civilite) => (
                      <RadioGroup.Option
                        key={civilite.value}
                        value={civilite.value}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                              : ''
                          }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'}
                    relative cursor-pointer rounded-md border border-gray-300  py-4 text-center shadow-sm focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`text-md ${checked ? 'text-white' : 'text-gray-900'}`}
                              >
                                {civilite.label}
                              </RadioGroup.Label>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <p className="text-red-500">{errors.civility?.message}</p>
              </div>
              <div className="block">
                <label htmlFor="name" className="flex w-full flex-col justify-between">
                  Votre nom
                </label>
                <input
                  type="text"
                  id="name"
                  title="Veuillez préciser votre nom de famille(couple) si vous serez à deux ou en famille !"
                  placeholder="Votre nom et votre prénom"
                  className="focus:ring-indigo-5000 w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                  {...register('name')}
                />
                <p className="text-red-500">{errors.name?.message}</p>
              </div>
              <div className="text-md mb-0">
                <label htmlFor="phone" className="flex w-full flex-col justify-between">
                  <span>Votre téléphone</span>
                  <span className="text-xs text-gray-500">
                    Nous vous enverrons votre invitation sur votre téléphone
                  </span>
                </label>
                <div className="mt-1 flex flex-col md:flex-row">
                  <select
                    {...register('phoneIndex')}
                    className="rounded-tl-md rounded-tr-md border-gray-300 border-gray-300 shadow-sm shadow-sm md:w-1/3 md:rounded-bl-md md:rounded-tr-none"
                    title="Votre numéro Whatsapp de préférence!"
                  >
                    <option data-countrycode="FR" value="">
                      Votre pays
                    </option>
                    <option data-countrycode="FR" value="33">
                      France (+33)
                    </option>
                    <option data-countrycode="CM" value="237">
                      Cameroon (+237)
                    </option>
                    <option data-countrycode="GB" value="44">
                      UK (+44)
                    </option>
                    <option data-countrycode="US" value="1">
                      USA (+1)
                    </option>
                    <optgroup label="Autres pays">
                      <option data-countrycode="DZ" value="213">
                        Algeria (+213)
                      </option>
                      <option data-countrycode="AD" value="376">
                        Andorra (+376)
                      </option>
                      <option data-countrycode="AO" value="244">
                        Angola (+244)
                      </option>
                      <option data-countrycode="AI" value="1264">
                        Anguilla (+1264)
                      </option>
                      <option data-countrycode="AG" value="1268">
                        Antigua &amp; Barbuda (+1268)
                      </option>
                      <option data-countrycode="AR" value="54">
                        Argentina (+54)
                      </option>
                      <option data-countrycode="AM" value="374">
                        Armenia (+374)
                      </option>
                      <option data-countrycode="AW" value="297">
                        Aruba (+297)
                      </option>
                      <option data-countrycode="AU" value="61">
                        Australia (+61)
                      </option>
                      <option data-countrycode="AT" value="43">
                        Austria (+43)
                      </option>
                      <option data-countrycode="AZ" value="994">
                        Azerbaijan (+994)
                      </option>
                      <option data-countrycode="BS" value="1242">
                        Bahamas (+1242)
                      </option>
                      <option data-countrycode="BH" value="973">
                        Bahrain (+973)
                      </option>
                      <option data-countrycode="BD" value="880">
                        Bangladesh (+880)
                      </option>
                      <option data-countrycode="BB" value="1246">
                        Barbados (+1246)
                      </option>
                      <option data-countrycode="BY" value="375">
                        Belarus (+375)
                      </option>
                      <option data-countrycode="BE" value="32">
                        Belgium (+32)
                      </option>
                      <option data-countrycode="BZ" value="501">
                        Belize (+501)
                      </option>
                      <option data-countrycode="BJ" value="229">
                        Benin (+229)
                      </option>
                      <option data-countrycode="BM" value="1441">
                        Bermuda (+1441)
                      </option>
                      <option data-countrycode="BT" value="975">
                        Bhutan (+975)
                      </option>
                      <option data-countrycode="BO" value="591">
                        Bolivia (+591)
                      </option>
                      <option data-countrycode="BA" value="387">
                        Bosnia Herzegovina (+387)
                      </option>
                      <option data-countrycode="BW" value="267">
                        Botswana (+267)
                      </option>
                      <option data-countrycode="BR" value="55">
                        Brazil (+55)
                      </option>
                      <option data-countrycode="BN" value="673">
                        Brunei (+673)
                      </option>
                      <option data-countrycode="BG" value="359">
                        Bulgaria (+359)
                      </option>
                      <option data-countrycode="BF" value="226">
                        Burkina Faso (+226)
                      </option>
                      <option data-countrycode="BI" value="257">
                        Burundi (+257)
                      </option>
                      <option data-countrycode="KH" value="855">
                        Cambodia (+855)
                      </option>
                      <option data-countrycode="CM" value="237">
                        Cameroon (+237)
                      </option>
                      <option data-countrycode="CA" value="1">
                        Canada (+1)
                      </option>
                      <option data-countrycode="CV" value="238">
                        Cape Verde Islands (+238)
                      </option>
                      <option data-countrycode="KY" value="1345">
                        Cayman Islands (+1345)
                      </option>
                      <option data-countrycode="CF" value="236">
                        Central African Republic (+236)
                      </option>
                      <option data-countrycode="CL" value="56">
                        Chile (+56)
                      </option>
                      <option data-countrycode="CN" value="86">
                        China (+86)
                      </option>
                      <option data-countrycode="CO" value="57">
                        Colombia (+57)
                      </option>
                      <option data-countrycode="KM" value="269">
                        Comoros (+269)
                      </option>
                      <option data-countrycode="CG" value="242">
                        Congo (+242)
                      </option>
                      <option data-countrycode="CK" value="682">
                        Cook Islands (+682)
                      </option>
                      <option data-countrycode="CR" value="506">
                        Costa Rica (+506)
                      </option>
                      <option data-countrycode="HR" value="385">
                        Croatia (+385)
                      </option>
                      <option data-countrycode="CU" value="53">
                        Cuba (+53)
                      </option>
                      <option data-countrycode="CY" value="90392">
                        Cyprus North (+90392)
                      </option>
                      <option data-countrycode="CY" value="357">
                        Cyprus South (+357)
                      </option>
                      <option data-countrycode="CZ" value="42">
                        Czech Republic (+42)
                      </option>
                      <option data-countrycode="DK" value="45">
                        Denmark (+45)
                      </option>
                      <option data-countrycode="DJ" value="253">
                        Djibouti (+253)
                      </option>
                      <option data-countrycode="DM" value="1809">
                        Dominica (+1809)
                      </option>
                      <option data-countrycode="DO" value="1809">
                        Dominican Republic (+1809)
                      </option>
                      <option data-countrycode="EC" value="593">
                        Ecuador (+593)
                      </option>
                      <option data-countrycode="EG" value="20">
                        Egypt (+20)
                      </option>
                      <option data-countrycode="SV" value="503">
                        El Salvador (+503)
                      </option>
                      <option data-countrycode="GQ" value="240">
                        Equatorial Guinea (+240)
                      </option>
                      <option data-countrycode="ER" value="291">
                        Eritrea (+291)
                      </option>
                      <option data-countrycode="EE" value="372">
                        Estonia (+372)
                      </option>
                      <option data-countrycode="ET" value="251">
                        Ethiopia (+251)
                      </option>
                      <option data-countrycode="FK" value="500">
                        Falkland Islands (+500)
                      </option>
                      <option data-countrycode="FO" value="298">
                        Faroe Islands (+298)
                      </option>
                      <option data-countrycode="FJ" value="679">
                        Fiji (+679)
                      </option>
                      <option data-countrycode="FI" value="358">
                        Finland (+358)
                      </option>
                      <option data-countrycode="FR" value="33">
                        France (+33)
                      </option>
                      <option data-countrycode="GF" value="594">
                        French Guiana (+594)
                      </option>
                      <option data-countrycode="PF" value="689">
                        French Polynesia (+689)
                      </option>
                      <option data-countrycode="GA" value="241">
                        Gabon (+241)
                      </option>
                      <option data-countrycode="GM" value="220">
                        Gambia (+220)
                      </option>
                      <option data-countrycode="GE" value="7880">
                        Georgia (+7880)
                      </option>
                      <option data-countrycode="DE" value="49">
                        Germany (+49)
                      </option>
                      <option data-countrycode="GH" value="233">
                        Ghana (+233)
                      </option>
                      <option data-countrycode="GI" value="350">
                        Gibraltar (+350)
                      </option>
                      <option data-countrycode="GR" value="30">
                        Greece (+30)
                      </option>
                      <option data-countrycode="GL" value="299">
                        Greenland (+299)
                      </option>
                      <option data-countrycode="GD" value="1473">
                        Grenada (+1473)
                      </option>
                      <option data-countrycode="GP" value="590">
                        Guadeloupe (+590)
                      </option>
                      <option data-countrycode="GU" value="671">
                        Guam (+671)
                      </option>
                      <option data-countrycode="GT" value="502">
                        Guatemala (+502)
                      </option>
                      <option data-countrycode="GN" value="224">
                        Guinea (+224)
                      </option>
                      <option data-countrycode="GW" value="245">
                        Guinea - Bissau (+245)
                      </option>
                      <option data-countrycode="GY" value="592">
                        Guyana (+592)
                      </option>
                      <option data-countrycode="HT" value="509">
                        Haiti (+509)
                      </option>
                      <option data-countrycode="HN" value="504">
                        Honduras (+504)
                      </option>
                      <option data-countrycode="HK" value="852">
                        Hong Kong (+852)
                      </option>
                      <option data-countrycode="HU" value="36">
                        Hungary (+36)
                      </option>
                      <option data-countrycode="IS" value="354">
                        Iceland (+354)
                      </option>
                      <option data-countrycode="IN" value="91">
                        India (+91)
                      </option>
                      <option data-countrycode="ID" value="62">
                        Indonesia (+62)
                      </option>
                      <option data-countrycode="IR" value="98">
                        Iran (+98)
                      </option>
                      <option data-countrycode="IQ" value="964">
                        Iraq (+964)
                      </option>
                      <option data-countrycode="IE" value="353">
                        Ireland (+353)
                      </option>
                      <option data-countrycode="IL" value="972">
                        Israel (+972)
                      </option>
                      <option data-countrycode="IT" value="39">
                        Italy (+39)
                      </option>
                      <option data-countrycode="JM" value="1876">
                        Jamaica (+1876)
                      </option>
                      <option data-countrycode="JP" value="81">
                        Japan (+81)
                      </option>
                      <option data-countrycode="JO" value="962">
                        Jordan (+962)
                      </option>
                      <option data-countrycode="KZ" value="7">
                        Kazakhstan (+7)
                      </option>
                      <option data-countrycode="KE" value="254">
                        Kenya (+254)
                      </option>
                      <option data-countrycode="KI" value="686">
                        Kiribati (+686)
                      </option>
                      <option data-countrycode="KP" value="850">
                        Korea North (+850)
                      </option>
                      <option data-countrycode="KR" value="82">
                        Korea South (+82)
                      </option>
                      <option data-countrycode="KW" value="965">
                        Kuwait (+965)
                      </option>
                      <option data-countrycode="KG" value="996">
                        Kyrgyzstan (+996)
                      </option>
                      <option data-countrycode="LA" value="856">
                        Laos (+856)
                      </option>
                      <option data-countrycode="LV" value="371">
                        Latvia (+371)
                      </option>
                      <option data-countrycode="LB" value="961">
                        Lebanon (+961)
                      </option>
                      <option data-countrycode="LS" value="266">
                        Lesotho (+266)
                      </option>
                      <option data-countrycode="LR" value="231">
                        Liberia (+231)
                      </option>
                      <option data-countrycode="LY" value="218">
                        Libya (+218)
                      </option>
                      <option data-countrycode="LI" value="417">
                        Liechtenstein (+417)
                      </option>
                      <option data-countrycode="LT" value="370">
                        Lithuania (+370)
                      </option>
                      <option data-countrycode="LU" value="352">
                        Luxembourg (+352)
                      </option>
                      <option data-countrycode="MO" value="853">
                        Macao (+853)
                      </option>
                      <option data-countrycode="MK" value="389">
                        Macedonia (+389)
                      </option>
                      <option data-countrycode="MG" value="261">
                        Madagascar (+261)
                      </option>
                      <option data-countrycode="MW" value="265">
                        Malawi (+265)
                      </option>
                      <option data-countrycode="MY" value="60">
                        Malaysia (+60)
                      </option>
                      <option data-countrycode="MV" value="960">
                        Maldives (+960)
                      </option>
                      <option data-countrycode="ML" value="223">
                        Mali (+223)
                      </option>
                      <option data-countrycode="MT" value="356">
                        Malta (+356)
                      </option>
                      <option data-countrycode="MH" value="692">
                        Marshall Islands (+692)
                      </option>
                      <option data-countrycode="MQ" value="596">
                        Martinique (+596)
                      </option>
                      <option data-countrycode="MR" value="222">
                        Mauritania (+222)
                      </option>
                      <option data-countrycode="YT" value="269">
                        Mayotte (+269)
                      </option>
                      <option data-countrycode="MX" value="52">
                        Mexico (+52)
                      </option>
                      <option data-countrycode="FM" value="691">
                        Micronesia (+691)
                      </option>
                      <option data-countrycode="MD" value="373">
                        Moldova (+373)
                      </option>
                      <option data-countrycode="MC" value="377">
                        Monaco (+377)
                      </option>
                      <option data-countrycode="MN" value="976">
                        Mongolia (+976)
                      </option>
                      <option data-countrycode="MS" value="1664">
                        Montserrat (+1664)
                      </option>
                      <option data-countrycode="MA" value="212">
                        Morocco (+212)
                      </option>
                      <option data-countrycode="MZ" value="258">
                        Mozambique (+258)
                      </option>
                      <option data-countrycode="MN" value="95">
                        Myanmar (+95)
                      </option>
                      <option data-countrycode="NA" value="264">
                        Namibia (+264)
                      </option>
                      <option data-countrycode="NR" value="674">
                        Nauru (+674)
                      </option>
                      <option data-countrycode="NP" value="977">
                        Nepal (+977)
                      </option>
                      <option data-countrycode="NL" value="31">
                        Netherlands (+31)
                      </option>
                      <option data-countrycode="NC" value="687">
                        New Caledonia (+687)
                      </option>
                      <option data-countrycode="NZ" value="64">
                        New Zealand (+64)
                      </option>
                      <option data-countrycode="NI" value="505">
                        Nicaragua (+505)
                      </option>
                      <option data-countrycode="NE" value="227">
                        Niger (+227)
                      </option>
                      <option data-countrycode="NG" value="234">
                        Nigeria (+234)
                      </option>
                      <option data-countrycode="NU" value="683">
                        Niue (+683)
                      </option>
                      <option data-countrycode="NF" value="672">
                        Norfolk Islands (+672)
                      </option>
                      <option data-countrycode="NP" value="670">
                        Northern Marianas (+670)
                      </option>
                      <option data-countrycode="NO" value="47">
                        Norway (+47)
                      </option>
                      <option data-countrycode="OM" value="968">
                        Oman (+968)
                      </option>
                      <option data-countrycode="PW" value="680">
                        Palau (+680)
                      </option>
                      <option data-countrycode="PA" value="507">
                        Panama (+507)
                      </option>
                      <option data-countrycode="PG" value="675">
                        Papua New Guinea (+675)
                      </option>
                      <option data-countrycode="PY" value="595">
                        Paraguay (+595)
                      </option>
                      <option data-countrycode="PE" value="51">
                        Peru (+51)
                      </option>
                      <option data-countrycode="PH" value="63">
                        Philippines (+63)
                      </option>
                      <option data-countrycode="PL" value="48">
                        Poland (+48)
                      </option>
                      <option data-countrycode="PT" value="351">
                        Portugal (+351)
                      </option>
                      <option data-countrycode="PR" value="1787">
                        Puerto Rico (+1787)
                      </option>
                      <option data-countrycode="QA" value="974">
                        Qatar (+974)
                      </option>
                      <option data-countrycode="RE" value="262">
                        Reunion (+262)
                      </option>
                      <option data-countrycode="RO" value="40">
                        Romania (+40)
                      </option>
                      <option data-countrycode="RU" value="7">
                        Russia (+7)
                      </option>
                      <option data-countrycode="RW" value="250">
                        Rwanda (+250)
                      </option>
                      <option data-countrycode="SM" value="378">
                        San Marino (+378)
                      </option>
                      <option data-countrycode="ST" value="239">
                        Sao Tome &amp; Principe (+239)
                      </option>
                      <option data-countrycode="SA" value="966">
                        Saudi Arabia (+966)
                      </option>
                      <option data-countrycode="SN" value="221">
                        Senegal (+221)
                      </option>
                      <option data-countrycode="CS" value="381">
                        Serbia (+381)
                      </option>
                      <option data-countrycode="SC" value="248">
                        Seychelles (+248)
                      </option>
                      <option data-countrycode="SL" value="232">
                        Sierra Leone (+232)
                      </option>
                      <option data-countrycode="SG" value="65">
                        Singapore (+65)
                      </option>
                      <option data-countrycode="SK" value="421">
                        Slovak Republic (+421)
                      </option>
                      <option data-countrycode="SI" value="386">
                        Slovenia (+386)
                      </option>
                      <option data-countrycode="SB" value="677">
                        Solomon Islands (+677)
                      </option>
                      <option data-countrycode="SO" value="252">
                        Somalia (+252)
                      </option>
                      <option data-countrycode="ZA" value="27">
                        South Africa (+27)
                      </option>
                      <option data-countrycode="ES" value="34">
                        Spain (+34)
                      </option>
                      <option data-countrycode="LK" value="94">
                        Sri Lanka (+94)
                      </option>
                      <option data-countrycode="SH" value="290">
                        St. Helena (+290)
                      </option>
                      <option data-countrycode="KN" value="1869">
                        St. Kitts (+1869)
                      </option>
                      <option data-countrycode="SC" value="1758">
                        St. Lucia (+1758)
                      </option>
                      <option data-countrycode="SD" value="249">
                        Sudan (+249)
                      </option>
                      <option data-countrycode="SR" value="597">
                        Suriname (+597)
                      </option>
                      <option data-countrycode="SZ" value="268">
                        Swaziland (+268)
                      </option>
                      <option data-countrycode="SE" value="46">
                        Sweden (+46)
                      </option>
                      <option data-countrycode="CH" value="41">
                        Switzerland (+41)
                      </option>
                      <option data-countrycode="SI" value="963">
                        Syria (+963)
                      </option>
                      <option data-countrycode="TW" value="886">
                        Taiwan (+886)
                      </option>
                      <option data-countrycode="TJ" value="7">
                        Tajikstan (+7)
                      </option>
                      <option data-countrycode="TH" value="66">
                        Thailand (+66)
                      </option>
                      <option data-countrycode="TG" value="228">
                        Togo (+228)
                      </option>
                      <option data-countrycode="TO" value="676">
                        Tonga (+676)
                      </option>
                      <option data-countrycode="TT" value="1868">
                        Trinidad &amp; Tobago (+1868)
                      </option>
                      <option data-countrycode="TN" value="216">
                        Tunisia (+216)
                      </option>
                      <option data-countrycode="TR" value="90">
                        Turkey (+90)
                      </option>
                      <option data-countrycode="TM" value="7">
                        Turkmenistan (+7)
                      </option>
                      <option data-countrycode="TM" value="993">
                        Turkmenistan (+993)
                      </option>
                      <option data-countrycode="TC" value="1649">
                        Turks &amp; Caicos Islands (+1649)
                      </option>
                      <option data-countrycode="TV" value="688">
                        Tuvalu (+688)
                      </option>
                      <option data-countrycode="UG" value="256">
                        Uganda (+256)
                      </option>
                      <option data-countrycode="GB" value="44">
                        UK (+44)
                      </option>
                      <option data-countrycode="UA" value="380">
                        Ukraine (+380)
                      </option>
                      <option data-countrycode="AE" value="971">
                        United Arab Emirates (+971)
                      </option>
                      <option data-countrycode="UY" value="598">
                        Uruguay (+598)
                      </option>
                      <option data-countrycode="US" value="1">
                        USA (+1)
                      </option>
                      <option data-countrycode="UZ" value="7">
                        Uzbekistan (+7)
                      </option>
                      <option data-countrycode="VU" value="678">
                        Vanuatu (+678)
                      </option>
                      <option data-countrycode="VA" value="379">
                        Vatican City (+379)
                      </option>
                      <option data-countrycode="VE" value="58">
                        Venezuela (+58)
                      </option>
                      <option data-countrycode="VN" value="84">
                        Vietnam (+84)
                      </option>
                      <option data-countrycode="VG" value="84">
                        Virgin Islands - British (+1284)
                      </option>
                      <option data-countrycode="VI" value="84">
                        Virgin Islands - US (+1340)
                      </option>
                      <option data-countrycode="WF" value="681">
                        Wallis &amp; Futuna (+681)
                      </option>
                      <option data-countrycode="YE" value="969">
                        Yemen (North)(+969)
                      </option>
                      <option data-countrycode="YE" value="967">
                        Yemen (South)(+967)
                      </option>
                      <option data-countrycode="ZM" value="260">
                        Zambia (+260)
                      </option>
                      <option data-countrycode="ZW" value="263">
                        Zimbabwe (+263)
                      </option>
                    </optgroup>
                  </select>
                  <input
                    placeholder="Votre numéro de téléphone"
                    type="number"
                    title="Votre numéro Whatsapp de préférence!"
                    autoComplete="false"
                    className="focus:ring-indigo-5000 rounded-bl-md rounded-br-md  border-gray-300 py-2 shadow-sm focus:border-indigo-500 md:w-2/3 md:rounded-bl-none md:rounded-br-md md:rounded-tr-md"
                    {...register('phone')}
                    id="phone"
                  />
                </div>
                <p className="text-red-600">{errors?.phoneIndex?.message}</p>
                <p className="text-red-600">{errors?.phone?.message}</p>
              </div>
              <div className="block">
                <label htmlFor="partner" className="flex w-full flex-col justify-between">
                  Votre partenaire
                </label>
                <input
                  type="text"
                  id="partner"
                  placeholder="Nom et prénom de votre partenaire"
                  className="focus:ring-indigo-5000 w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                  {...register('partner')}
                />
                <p className="text-red-500">{errors.partner?.message}</p>
              </div>
              <button
                type="submit"
                className="w-full rounded-md border-app-yellow bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-800  px-4 py-2 shadow-md"
                >
                Enregistrer
              </button>

              <RenderHtmlContent
                content={data.message}
                classes="text-center text-2xl font-extralight"
              />
            </form>
          ) : null}
        </article>
      </div>
      <div
        className={classNames(
          'flex flex-col justify-between md:col-span-2 md:border-l md:border-gray-200',
          'order-first md:order-last'
        )}
      >
        <div className="pt-2">
          <div className="px-2">
            <p className="flex items-center justify-center md:items-end md:justify-end">
              <ImageDisplay
                wrapperClasses="h-20 w-32 relative overflow-hidden"
                imageClasses="object-contain "
                image={data.icon}
              />
            </p>
            <h3 className={classNames('text-center text-2xl font-extrabold md:text-right')}>
              {data.name}
            </h3>
            <RenderHtmlContent content={data.address} classes="text-center md:text-right" />
          </div>
        </div>
        <ImageDisplay
          wrapperClasses="w-full h-96 relative overflow-hidden"
          imageClasses="object-cover"
          image={data.image}
        />
      </div>
    </section>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const id = params['slug'].substring(params['slug'].lastIndexOf('-') + 1);
  return { props: { ...params, id, slug: params['slug'] } };
}

export default PresenceWithPartner;
