import { useState, useEffect } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { isNumeric } from '../../../utils/isNumeric';

type Parameters = {
  text: string;
  contacts?: string,
  variables?: {
    [key: string]: string
  }
};

function Preview({text = '', variables, contacts =''}: Parameters) {
  const [updatedText, setUpdatedText] = useState(text);
  useEffect(() => {
    let textWithVariables = text;
    const variablesInMessage = text.match(/{{\d+}}/g) || [];
    const firstContact = contacts.split('\n')[0];
    const firstContactParts = firstContact.split(',');
    variablesInMessage.forEach((variable: string) => {
      const variableWithoutPattern = variable.replace('{{', '').replace('}}', '');
      if(variables && variables[variableWithoutPattern]) {
        const position = variables[variableWithoutPattern];
        const isPositionAnumber = isNumeric(position);
        if (isPositionAnumber) {
          const data =firstContactParts[Number(position) - 1 ] ? firstContactParts[Number(position) - 1] : position;
          textWithVariables = textWithVariables.replace(variable, data);
        } else {
          textWithVariables = textWithVariables.replace(variable, variables[variableWithoutPattern]);
        }
      }
    })
    setUpdatedText(textWithVariables);
  }, [text, variables, updatedText, JSON.stringify(variables)])
  
  return (
    <>
      <h3 className='font-semibold text-blue-800 mt-5 mb-3 text-center text-xl'>Apperçu</h3>
      <article className="preview p-4 bg-slate-100 rounded-lg text-sm">
        <ReactMarkdown className='line-break'>{updatedText}</ReactMarkdown>
      </article>
    </>
  )
}

export default Preview