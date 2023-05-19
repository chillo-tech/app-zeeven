import Metadata from '@/components/Metadata'
import OpenedLayout from '@/containers/opened'
import React from 'react'
import Head from 'next/head'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { EMAIL_ERROR_MESSAGE, EMAIL_PATTERN, PHONE_ERROR_MESSAGE, QR_CODES_TYPES, slugify } from '@/utils';
import { useMutation } from 'react-query';
import { add } from '@/services/crud';
import Message from '@/components/Message';
import { useRouter } from 'next/router';
import ImageDisplay from '@/components/image-display';
import classNames from 'classnames';

export type Message = {
  type: string, 
  applicationMessage: string,
  email: string, 
  phone: string,
  phoneIndex: string,
}
const schema = yup.object({
  type: yup.string().trim()
          .required("Ce champ est requis"),
    phoneIndex: yup.string().trim()
          .required("Sélectionner un indicatif"),
    phone: yup.string()
                .required(PHONE_ERROR_MESSAGE)
                .min(9, PHONE_ERROR_MESSAGE)
                .max(9, PHONE_ERROR_MESSAGE),
    email: yup.string()
              .email(EMAIL_ERROR_MESSAGE)
              .required(EMAIL_ERROR_MESSAGE)
              .matches(EMAIL_PATTERN, {applicationMessage: EMAIL_ERROR_MESSAGE}),
    applicationMessage: yup.string()
          .trim()
          .required("Ce champ est requis")
          .min(30, "Dites nous en un peu plus s'il vous plait(min. 30)")
}).required();
function QRCode() {
  const mutation = useMutation({mutationFn: ((applicationMessage:Message) => add("/applicationMessage", applicationMessage))});
  const router = useRouter();
	const {watch, register, handleSubmit, formState: {errors}} = useForm<Message>({
		mode: "onChange",
    defaultValues: {type: 'LINK'},
		resolver: yupResolver(schema)
	});
	const onSubmit = (data: Message) => {
    mutation.mutate(data);
	};
  const type = watch('type');
  const handleError = (error:any) => {
    error.preventDefault()
    router.push('/')
  }
  return (
    <>
    <Metadata  entry={{title: 'QR codes dynamiques pour votre marque', description: 'Créez, suivez et gérez des codes QR dynamiques pour votre marque'}}/>
    <OpenedLayout>
      <div className="text-center py-10 font-sans container">
      <h1 className='text-4xl text-slate-900 font-bold mb-6 md:text-5xl'>QR codes dynamiques pour votre marque</h1>
      <h3 className='sm:text-xl text-slate-900'> Créez, suivez et gérez des codes <br/>QR dynamiques pour votre marque</h3>
      </div>
      <section className='bg-white rounded-lg mb-10 border-2 border-blue-300 container'>
        <div className="options p-5">
          <ul className='flex text-xl border-b border-gray-300'> 
              {QR_CODES_TYPES.map((item: any) => (
                <li  key={slugify(item.label)}>
                  <label htmlFor={slugify(item.label)}
                        className={classNames(
                          "flex items-center justify-between px-6 text-black font-light text-md py-1",
                          "cursor-pointer",
                          {'border-blue-700 border-b-2': type === item.value}
                        )}>
                        <input type="radio"
                              className='hidden'
                              value={item.value}
                              id={slugify(item.label)}
                              {...register("type")}
                        />
                    {item.label} 
                  </label>
                </li>
              ))}
            </ul>
            <div className="block">
              <label htmlFor="email" className="w-full flex flex-col justify-between mb-2 text-md font-light">
                <span className='text-blue-800'>
                  Votre email
                </span>
              </label>
              <input type="email" id="email" placeholder="Votre email"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-2"
                  {...register("email")}/>
              <p className="text-red-500">{errors.email?.applicationMessage}</p>
            </div>
        </div>
			</section>
    </OpenedLayout>
    </>
  )
}

export default QRCode