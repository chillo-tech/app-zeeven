import { Guest } from '@/types/Guest';
import { MESSAGE_VARIABLE_PATTERN, isUserInformation } from '@/utils';
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
    const variablesInMessage = text.match(MESSAGE_VARIABLE_PATTERN) || [];
    variablesInMessage.forEach((variable: string, index: number) => {
      if (variables && variables[index]) {
        let value = variables[index] as string;
        if (guests && guests.length && isUserInformation(value, guests[0])) {
          const valueIndex = value.replaceAll('{', '').replaceAll('}', '') as keyof Guest;
          const firstContact: Guest = guests[0];
          value = firstContact[valueIndex] as string;
          if (!value && firstContact && firstContact.others) {
            const other = firstContact.others.filter(({ key }: any) => {
              return valueIndex === key;
            })[0];
            if (other) {
              value = other['value'];
            }
          }
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
      {variables && variables.length ? (
        <p className="mt-2 text-xs italic">La prévisualisation est faite avec le premier contact</p>
      ) : null}
    </>
  );
}

export default Preview;
