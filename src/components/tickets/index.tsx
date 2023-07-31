import { TICKET_TYPE } from '@/utils';
import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Vertical from './Vertical';
import Horizontal from './Horizontal';
function SelectTemplate({ template, data, onTemplateSelected }: any) {
  const { horirontal, vertical } = TICKET_TYPE;
  const [selectedTemplate, setSelectedTemplate] = useState(template);
  const handleTemplateSelection = (reference: any) => {
    setSelectedTemplate(reference);
    onTemplateSelected({reference})
  }
  const fieldWrapper = (() => {
    switch (selectedTemplate) {
      case horirontal:
        return (
          <>
            <div className="flex flex-col text-sm">
              <button
                type="button"
                className="flex items-center text-app-blue underline"
                onClick={() => handleTemplateSelection(null)}
              >
                <AiOutlineArrowLeft className="mr-1" /> Modifier
              </button>
              <div className="flex items-center justify-center">
                <Horizontal data={data}/>
              </div>
            </div>
          </>
        );
      case vertical:
        return (
          <div className="flex flex-col text-sm">
            <button
              type="button"
              className="flex items-center text-app-blue underline"
              onClick={() => handleTemplateSelection(null)}
            >
              <AiOutlineArrowLeft className="mr-1" />
              Modifier
            </button>
            <div className="flex items-center justify-center">
              <Vertical />
            </div>
          </div>
        );
      default:
        return (
          <div className="grid md:grid-cols-2">
            <button
              type="button"
              className="border border-blue-900 bg-blue-900 p-4"
              onClick={() => handleTemplateSelection(vertical)}
            >
              Vertical
            </button>
            <button
              type="button"
              className="border border-blue-900 bg-blue-900 p-4"
              onClick={() => handleTemplateSelection(horirontal)}
            >
              Horizontal
            </button>
          </div>
        );
    }
  })();
  return (
    <>
      <div className="row">
        <div>{fieldWrapper}</div>
      </div>
    </>
  );
}

export default SelectTemplate;
