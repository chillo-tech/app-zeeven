import { TICKET_TYPE } from '@/utils';
import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ImageDisplay from '../image-display';
import Horizontal from './Horizontal';
import Vertical from './Vertical';
function SelectTemplate({ data, onTemplateSelected, event }: any) {
  const { horirontal, vertical } = TICKET_TYPE;
  const [selectedTemplate, setSelectedTemplate] = useState(data?.template?.name);
  const [baseEnv, setBaseEnv] = useState(process.env.NEXT_PUBLIC_ASSETS_ENDPOINT);
  const handleTemplateSelection = (name: any) => {
    setSelectedTemplate(name);
    onTemplateSelected(name);
  };
  useEffect(() => {
    setBaseEnv(process.env.NEXT_PUBLIC_ASSETS_ENDPOINT);
  }, []);
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
              <div className="flex flex-col items-center justify-center">
                <Horizontal data={data} event={event} template={selectedTemplate} />
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
            <div className="flex flex-col items-center justify-center">
              <Vertical data={data} event={event} template={selectedTemplate} />
            </div>
          </div>
        );
      default:
        return (
          <div className="grid md:grid-cols-2">
            <button type="button" onClick={() => handleTemplateSelection(horirontal)}>
              <ImageDisplay
                wrapperClasses="relative h-64 items-center flex"
                local="true"
                imageClasses="object-contain"
                image={{
                  path: `${baseEnv}/templates/horizontal.png`,
                  title: "ZEEVEN ticket template"
                }}
              />
            </button>
            <button type="button" onClick={() => handleTemplateSelection(vertical)}>
              <ImageDisplay
                wrapperClasses="relative h-64 items-center flex"
                local="true"
                imageClasses="object-contain"
                image={{
                  path: `${baseEnv}/templates/vertical.png`,
                  title: "ZEEVEN ticket template"
                }}
              />
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
