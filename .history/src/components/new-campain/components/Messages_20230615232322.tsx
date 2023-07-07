import React, {useContext, useRef, useState} from 'react'
import {useFieldArray, useForm} from 'react-hook-form';
import {FaIdCard} from 'react-icons/fa';
import {BiBold, BiItalic} from 'react-icons/bi';
import {NewCampainContext} from '@/context/NewCampainContext';
import {getInputFormattedDate, INFORMATIONS} from '@/utils';
import BottomBar from './BottomBar';
import Preview from './Preview'

type FormValues = {
	messages: {
		text: string,
		date?: string,
		informations?: { [key: string]: any },
		ordre: number,
		isSent?: boolean
	}[];
};
type StyleParams = {
	type: string,
	value?: string
}

function Messages() {
	const messageRef = useRef<HTMLTextAreaElement | null>();
	const [showInformation, setShowInformation] = useState(false);
	const [lastVariable, setLastVariable] = useState("");
	const context = useContext(NewCampainContext);
	const {
		state: {stepIndex, campain: {messages = [{text: '', date: '', time: '', ordre: 1}]}},
		updateCampain,
		previousStep
	} = context;
	const {setValue, watch, register, formState: {errors}, control, handleSubmit} = useForm<FormValues>(
		{
			defaultValues: {
				messages
			}
		}
	);
	const {ref, ...rest} = register("messages.0.text", {required: "Merci de sasir un message"});
	const currentMessage = watch("messages.0.text");
	const {fields} = useFieldArray({
		rules: {
			minLength: 1,
			required: "Merci de saisir votre message"
		},

		control,
		name: "messages"
	});

	const updateStyle = ({type, value}: StyleParams) => {
		const start = messageRef.current?.selectionStart || 0;
		const end = messageRef.current?.selectionEnd || 0;
		const currentFieldValue = messageRef.current?.value || '';
		let fieldValue = currentFieldValue;

		const valueBeforeSelection = currentFieldValue.substring(0, start);
		const valueAfterSelection = currentFieldValue.substring(end, currentFieldValue.length + 1);
		const selection = currentFieldValue.substring(start, end);

		if (lastVariable !== 'BOLD' && (type === 'BOLD' && selection.length)) {
			fieldValue = lastVariable === 'ITALIC' ? `${valueBeforeSelection}**${selection}**${valueAfterSelection}` : `${valueBeforeSelection} **${selection}** ${valueAfterSelection}`;
		}

		if (lastVariable !== 'ITALIC' && (type === 'ITALIC' && selection.length)) {
			fieldValue = lastVariable === 'BOLD' ? `${valueBeforeSelection}*${selection}*${valueAfterSelection}` : `${valueBeforeSelection} *${selection}* ${valueAfterSelection}`;
		}

		if (type === 'VARIABLE') {
			fieldValue = `${valueBeforeSelection} {{${value}}}${selection.length ? selection + valueAfterSelection : valueAfterSelection}`;
			setShowInformation(false);
		}
		setLastVariable(type);
		setValue("messages.0.text", fieldValue);
	}

	const onSubmit = (data: FormValues) => {
		let messages = data.messages;
		data['messages'] = messages;
		updateCampain(data);
	};

	return (

		<section
			className='grid grid-cols-1 md:grid-cols-3 md:gap-0 gap-2 rounded-lg bg-white border border-slate-200 shadow-sm'>
			<div className="md:p-5 p-4 md:col-span-2 border-r-2 border-slate-300">
				<form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{fields.map((field, index) => (

						<div key={`message-${field.id}`}>
							<label htmlFor="message"
								   className="w-full flex flex-col justify-between mb-2 font-light">
								<span className='text-blue-800 font-semibold'>Votre message</span>
								<span className="text-gray-500 text-sm">Vous pourrez définir la valeur des informations dans la suite</span>
							</label>
							<textarea rows={6} id="message"
									  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
									  {...rest}
									  name={`messages.${index}.text`}
									  ref={(e) => {
										  ref(e)
										  messageRef.current = e // you can still assign to ref
									  }}
							/>
							<p className="text-red-500">{errors?.messages ? errors?.messages[index]?.text?.message : null}</p>
							<div className="flex justify-between items-center flex-col md:flex-row">
								<p>Charactères: {currentMessage ? currentMessage.length : 0}</p>
								<div className="flex buttons items-center">
									<button type='button' className='text-lg'
											onClick={() => updateStyle({type: 'BOLD'})}>
										<BiBold className='p-0' size={25}/>
									</button>
									<button type='button' className='text-lg px-3'
											onClick={() => updateStyle({type: 'ITALIC'})}>
										<BiItalic className='p-0 font-extralight' size={25}/>
									</button>
									<div className='information relative'>
										<button
											type='button'
											className='relative z-20 border border-gray-400 rounded-full px-2 flex items-center'
											onClick={() => setShowInformation(!showInformation)}>
											<FaIdCard className='mr-1'/> Ajouter une information
										</button>
										{
											showInformation ? (
												<ul className='informations absolute bottom-0 left-0 right-0 pb-10 bg-white z-10 transition duration-1000'>
													{
														INFORMATIONS.map(({label, value}, index) => (
															<li className='information' key={`information-${index}`}>
																<button type="button"
																		className='w-full text-left px-3 py-1 border-b border-slate-200'
																		onClick={() => updateStyle({
																			type: 'VARIABLE',
																			value
																		})}>
																	{label}
																</button>
															</li>
														))
													}
												</ul>
											) : null
										}
									</div>
								</div>
							</div>
              {/**
							<h2 className="w-full flex flex-col justify-between my-2 font-light">
								<span
									className='text-blue-800 font-semibold'>Quand voulez vous envoyer les messages</span>
							</h2>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="block">
									<label htmlFor="date"
										   className="w-full flex flex-col justify-between mb-2 font-light">
										<span className='text-blue-800 font-semibold'>Date</span>
									</label>
									<input id="date" type="date" min={getInputFormattedDate(new Date())}
										   className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
										   {...register(
											   `messages.${index}.date` as const,
											   {required: "Merci de sasir une date"}
										   )}
									/>
									<p className="text-red-500">{errors?.messages ? errors?.messages[index]?.date?.message : null}</p>
								</div>
								<div className="block">
									<label htmlFor="time"
										   className="w-full flex flex-col justify-between mb-2 font-light">
										<span className='text-blue-800 font-semibold'>Heure</span>
									</label>
									<input type="time" id="time"
										   className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
										   {...register(
											   `messages.${index}.time` as const,
											   {required: "Merci de sasir une heure"}
										   )}
									/>
									<p className="text-red-500">{errors?.messages ? errors?.messages[index]?.time?.message : null}</p>
								</div>
							</div>
               */}
						</div>
					))}
					<p className="text-red-500">{errors?.messages?.root?.message}</p>

					<BottomBar
						stepIndex={stepIndex}
						nextDisabled={false}
						previousStep={previousStep}
					/>
				</form>
			</div>
			<div className='md:p-5 p-4'>
				<Preview text={currentMessage}/>
			</div>
		</section>
	)
}

export default Messages
