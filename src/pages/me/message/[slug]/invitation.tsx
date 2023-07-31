import ScheduleEdit from '@/components/new-campain/components/dates/ScheduleEdit';
import Debug from '@/components/shared/Debug';
import SelectTemplate from '@/components/tickets/Index';
import ProtectedLayout from '@/containers/protected';
import {
  CHANNELS,
  INFORMATIONS,
  getHumanDate,
  getDateWithTime,
  getInputFormattedDate,
  getStringAsDate,
} from '@/utils';
import { Disclosure } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiChevronUp, BiPlusCircle } from 'react-icons/bi';
import { RxCrossCircled } from 'react-icons/rx';
import * as yup from 'yup';
type Schedule = {
  date: string;
  time: string;
};
type FormValues = {
  address: string;
  message: string;
  test: string;
  channels: string[];
  schedules: Schedule[];
  template: {
    id: string;
    reference: string;
    params: {
    }
  },
  active: {
    date: string;
    time: string;
  };
  send: {
    date: string;
    time: string;
  };
};
const schema = yup
  .object({
    address: yup.string().required('Merci de saisir une adresse'),
    message: yup.string(),
    channels: yup.array().of(yup.string()).min(1, 'Merci de sélectionner un canal'),
    schedules: yup
      .array()
      .of(
        yup.object({
          date: yup.string().required('Merci de saisir une adresse'),
          time: yup.string(),
        })
      )
      .required('Merci de saisir une date')
      .min(1, 'Merci de saisir une date'),
    active: yup.object({
      date: yup.string().required('Merci de sélectionner une date'),
      time: yup.string().required('Merci de définir une heure de active'),
    }),
    send: yup.object({
      date: yup.string().required('Merci de sélectionner une date'),
      time: yup.string().required('Merci de définir une heure de send'),
    }),
    template: yup.object({
      reference: yup.string().nullable().required('Merci de sélectionner un template'),
      id: yup.string(),
    }),
  })
  .required();

function Invitation() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  const messageRef = useRef<HTMLTextAreaElement | null>();
  const [formVisible, setFormVisible] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      address: '',
      schedules: [],
      channels: [],
      active: {
        date: getInputFormattedDate(now),
        time: '00:00',
      },
      send: {
        date: getInputFormattedDate(now),
        time: '00:00',
      },
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const watchAllFields = watch();
  const { ref, ...rest } = register('message');
  const channelsValues = watch('channels', []);
  const removeSchedule = (scheduleToRemove: any) => {
    const uniqueSchedules = schedules.filter(
      (schedule: any) => schedule.date !== scheduleToRemove.date
    );
    setSchedules(uniqueSchedules);

    setValue('schedules', uniqueSchedules);
    trigger('schedules');

    if (!uniqueSchedules.length) {
      setFormVisible(true);
    }
  };

  const handleSchedule = (schedule: Schedule) => {
    const uniqueSchedules = [...schedules, schedule].reduce(
      (accumulator: Schedule[], item: Schedule) => {
        if (
          !accumulator.find(
            (entry: Schedule) =>
              getStringAsDate(entry.date).getTime() === getStringAsDate(item.date).getTime()
          )
        ) {
          console.log(item);
          accumulator.push(item);
        }
        return accumulator;
      },
      []
    );
    setSchedules(uniqueSchedules);
    setValue('schedules', uniqueSchedules);
    trigger('schedules');
    setFormVisible(false);
  };

  const handleTemplate = (template: any) => {
    console.log(template);
    
    setValue('template', template);
    trigger('template');
  };
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <ProtectedLayout>
      <Head>
        <title>Tickets pour évènements</title>
        <meta name="description" content="Tickets pour évènements" />
      </Head>
      <h1 className="text-4xl font-semibold text-app-blue">Invitations pour votre évènement</h1>

      <div className="bg-white p-4 shadow">
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-t-md bg-slate-100 px-4 py-2 text-left font-light text-app-blue focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                 <span className='font-semibold text-app-blue flex w-full flex-col justify-between text-lg font-light lg:text-xl'>
                  Template
                </span>
                <BiChevronUp
                  className={`text-xl ${open ? 'rotate-180 transform' : ''} h-5 w-5 text-app-blue`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="rounded-b-md bg-slate-100 px-4 pb-6 text-gray-500 ">
              <SelectTemplate data={watchAllFields} onTemplateSelected={handleTemplate}/>
              <p className="text-red-500">{errors?.template?.reference?.message}</p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2" defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-t-md bg-slate-100 px-4 py-2 text-left font-light text-app-blue focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className='font-semibold text-app-blue flex w-full flex-col justify-between text-lg font-light lg:text-xl'>
                  Informations complémentaires
                </span>
                <BiChevronUp
                  className={`text-xl ${open ? 'rotate-180 transform' : ''} h-5 w-5 text-app-blue`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="rounded-b-md bg-slate-100 px-4 pb-2 text-gray-500 ">
                <div className="rounded-md bg-white">
                  <div className="bg-white px-4 py-4">
                    <h2 className="flex w-full flex-col justify-between text-lg font-light lg:text-xl">
                      <span className="font-semibold text-app-blue">Dates de votre évènement</span>
                    </h2>
                    <div className="form-wrapper">
                      {formVisible || !schedules.length ? (
                        <ScheduleEdit update={handleSchedule} />
                      ) : null}
                      {schedules && schedules.length ? (
                        <>
                          <div className="mt-6">
                            <ul className="flex flex-wrap gap-2">
                              {schedules
                                .sort(({ date: datea }: Schedule, { date: dateb }: Schedule) => {
                                  return (
                                    getStringAsDate(datea).getTime() -
                                    getStringAsDate(dateb).getTime()
                                  );
                                })
                                .map((schedule: Schedule, index: number) => (
                                  <li key={`schedule-${index}`}>
                                    <span className="outline-blue-button">
                                      {getHumanDate(getDateWithTime(schedule.date, schedule.time))}
                                      <button
                                        type="button"
                                        onClick={() => removeSchedule(schedule)}
                                      >
                                        <RxCrossCircled className="ml-3 text-red-600" />
                                      </button>
                                    </span>
                                  </li>
                                ))}
                              {formVisible ? null : (
                                <li>
                                  <button
                                    type="button"
                                    className="add-date_button"
                                    onClick={() => setFormVisible(!formVisible)}
                                  >
                                    Ajouter une date <BiPlusCircle className="ml-3" />
                                  </button>
                                </li>
                              )}
                            </ul>
                          </div>
                        </>
                      ) : null}

                      <p className="text-red-500">{errors?.schedules?.message}</p>
                    </div>
                  </div>
                  <div className="bg-slate-100 px-4 py-4">
                    <h2 className="flex w-full flex-col justify-between text-lg font-light lg:text-xl">
                      <span className="font-semibold text-app-blue">
                        L&apos;invitation sera active &agrave; partir de
                      </span>
                    </h2>
                    <div className="form-wrapper">
                      <div className="grid items-end gap-4 md:grid-cols-2">
                        <div className="block">
                          <label
                            htmlFor="date"
                            className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
                          >
                            <span className="font-semibold text-app-blue">Date</span>
                          </label>
                          <input
                            id="date"
                            type="date"
                            min={getInputFormattedDate(new Date())}
                            className="focus:ring-indigo-5000 w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-500"
                            {...register('active.date')}
                          />
                          <p className="text-red-500">{errors?.active?.date?.message}</p>
                        </div>
                        <div className="block">
                          <label
                            htmlFor="time"
                            className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
                          >
                            <span className="font-semibold text-app-blue">Heure</span>
                          </label>
                          <input
                            type="time"
                            id="time"
                            className="focus:ring-indigo-5000 w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-500"
                            {...register('active.time')}
                          />
                          <p className="text-red-500">{errors?.active?.time?.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-4">
                    <div className="form-wrapper">
                      <div className="">
                        <label
                          htmlFor="address"
                          className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
                        >
                          <span className="font-semibold text-app-blue">
                            Adresse de l&apos;évènement
                          </span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          className="focus:ring-indigo-5000 w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-500"
                          {...register('address')}
                        />
                        <p className="text-red-500">{errors?.address?.message}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-100 px-4 py-4">
                    <div className="block">
                      <label
                        htmlFor="channels"
                        className="text-md mb-2 flex w-full flex-col justify-between lg:text-xl"
                      >
                        <span className="font-semibold text-app-blue">
                          Canaux pour l&apos;envoi des évènements
                        </span>
                        <span className="text-gray-500">Vous pouvez sélectionner plusieurs</span>
                      </label>
                      <div
                        className="grid gap-4 md:grid-cols-3 md:items-center md:justify-center"
                        aria-labelledby="channels"
                      >
                        {CHANNELS.map((option) => (
                          <label
                            key={option.label}
                            htmlFor={option.value}
                            className={classNames(
                              'flex cursor-pointer  flex-col items-center rounded-md border-2 p-2',
                              { 'border-slate-400': channelsValues.indexOf(option.value) === -1 },
                              {
                                'border-blue-600 bg-blue-100/40':
                                  channelsValues.indexOf(option.value) > -1,
                              }
                            )}
                          >
                            <span>
                              <Image
                                alt={option.label}
                                src={`/images/option/${option.image}`}
                                width="50"
                                height="50"
                              />
                            </span>
                            <input
                              type="checkbox"
                              value={option.value}
                              id={option.value}
                              className="hidden"
                              {...register('channels')}
                            />
                            <span className="mt-3">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      <p className="text-red-500">{errors?.channels?.message}</p>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-4">
                    <h2 className="flex w-full flex-col justify-between text-lg font-light lg:text-xl">
                      <span className="font-semibold text-app-blue">Envoyer l&apos;invitation</span>
                    </h2>
                    <div className="form-wrapper">
                      <div className="grid items-end gap-4 md:grid-cols-2">
                        <div className="block">
                          <label
                            htmlFor="date"
                            className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
                          >
                            <span className="font-semibold text-app-blue">Le</span>
                          </label>
                          <input
                            id="date"
                            type="date"
                            min={getInputFormattedDate(new Date())}
                            className="focus:ring-indigo-5000 w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-500"
                            {...register('send.date')}
                          />
                          <p className="text-red-500">{errors?.send?.date?.message}</p>
                        </div>
                        <div className="block">
                          <label
                            htmlFor="time"
                            className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
                          >
                            <span className="font-semibold text-app-blue">&agrave;</span>
                          </label>
                          <input
                            type="time"
                            id="time"
                            className="focus:ring-indigo-5000 w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-500"
                            {...register('send.time')}
                          />
                          <p className="text-red-500">{errors?.send?.time?.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-100 px-4 py-4">
                    <div className="form-wrapper">
                      <div className="">
                        <label
                          htmlFor="address"
                          className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
                        >
                          <span className="font-semibold text-app-blue">
                            Message pour vos invités
                          </span>
                        </label>
                        <textarea
                          rows={6}
                          id="message"
                          className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-3 shadow-sm focus:border-indigo-500"
                          {...rest}
                          name="message"
                          ref={(e) => {
                            ref(e);
                            messageRef.current = e; // you can still assign to ref
                          }}
                        />
                        <p className="text-red-500">{errors?.message?.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <form noValidate className="pb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 flex items-center justify-between font-extralight">
            <button
              type="submit"
              className="rounded-md border-app-yellow bg-app-yellow px-4 py-2 text-app-blue"
            >
              <span>Enregistrer</span>
            </button>
          </div>
        </form>
      </div>
    </ProtectedLayout>
  );
}

export default Invitation;
