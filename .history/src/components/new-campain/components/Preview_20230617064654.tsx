import { useState, useEffect } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Guest } from '@/types/Guest';
import { isUserInformation } from '@/utils';

type Parameters = {
  text: string;
  guests?: Guest[],
  variables?: {
    [key: string]: string
  }
};

function Preview({text = '', variables, guests}: Parameters) {
  console.log('====================================');
  console.log(guests);
  console.log('====================================');
  const [updatedText, setUpdatedText] = useState(text);
  useEffect(() => {
    let textWithVariables = text;
    const variablesInMessage = text.match(/{{\w+}}/g) || [];
    variablesInMessage.forEach((variable: string, index: number) => {
      if(variables && variables[index]) {
        let value = variables[index] as string;
        if(isUserInformation(value) && guests && guests.length){
          const valueIndex = value.replaceAll("{", '').replaceAll("}", '') as keyof Guest;
          const firstContact: Guest = guests[0];
          value = firstContact[valueIndex] as string;
        }
        textWithVariables = textWithVariables.replace(variable, value);
      }
    });
    setUpdatedText(textWithVariables);
  }, [text, variables, updatedText, guests])
  
  return (
    <>
      <h3 className='font-semibold text-blue-800 md:mt-5 mb-3'>Apperçu</h3>
      <article className="preview p-4 bg-slate-100 rounded-lg text-sm">
        <ReactMarkdown className='line-break'>{updatedText}</ReactMarkdown>
      </article>
    </>
  )
}

export default Preview