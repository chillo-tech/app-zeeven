import { Guest } from '@/types/Guest';
import { isUserInformation } from '@/utils';
import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type Parameters = {
  text: string;
  guests?: Guest[];
  variables?: {
    [key: string]: string;
  };
};

function Preview({ text = '', variables, guests }: Parameters) {
  const [updatedText, setUpdatedText] = useState(text);
  useEffect(() => {
    let textWithVariables = text;
    const variablesInMessage = text.match(/{{\w+}}/g) || [];
    variablesInMessage.forEach((variable: string, index: number) => {
      if (variables && variables[index]) {
        let value = variables[index] as string;
        if (isUserInformation(value) && guests && guests.length) {
          const valueIndex = value.replaceAll('{', '').replaceAll('}', '') as keyof Guest;
          const firstContact: Guest = guests[0];
          value = firstContact[valueIndex] as string;
        }
        textWithVariables = textWithVariables.replace(variable, value);
      }
    });
    setUpdatedText(textWithVariables);
  }, [text, variables, updatedText, guests]);

  return (
    <>
      <h3 className="mb-3 font-semibold text-app-blue md:mt-5">Apperçu</h3>
      <article className="preview rounded-lg bg-slate-100 p-4 text-sm">
        <ReactMarkdown className="line-break">{updatedText}</ReactMarkdown>
      </article>
      {(variables && variables.length )? (
        <p className="mt-2 text-xs italic">La prévisualisation est faite avec le premier contact</p>
      ) : null}
    </>
  );
}

export default Preview;
