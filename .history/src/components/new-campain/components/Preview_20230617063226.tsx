import { useState, useEffect } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Guest } from '@/types/Guest';
import { isUserInformation } from '@/utils';

type Parameters = {
  text: string;
  contacts?: Guest[],
  variables?: {
    [key: string]: string
  }
};

function Preview({text = '', variables, contacts}: Parameters) {
  const [updatedText, setUpdatedText] = useState(text);
  useEffect(() => {
    let textWithVariables = text;
    const variablesInMessage = text.match(/{{\w+}}/g) || [];
    variablesInMessage.forEach((variable: string, index: number) => {
      if(variables && variables[index]) {
        let value = variables[index] as string;
        if(isUserInformation(value) && contacts && contacts.length){
          const valueIndex: string = value.replaceAll("{", '').replaceAll("}", '');
          const firstContact: Guest = contacts[0];
          type valueIndex;
          value = firstContact[typeof valueIndex]
        }
        textWithVariables = textWithVariables.replace(variable, value);
      }
    });
    setUpdatedText(textWithVariables);
  }, [text, variables, updatedText, contacts])
  
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