import { Disclosure } from '@headlessui/react';
import { useCallback, useRef, useState } from 'react';
import { HexColorPicker,HexColorInput } from 'react-colorful';
import { BiChevronUp } from 'react-icons/bi';
import useClickOutside from './useClickOutside';
import { BLACK_COLOR, QRCODE_APPEARANCE, WHITE_COLOR } from '@/utils';
import QRCodeItemAppearance from '../display/QRCodeItemAppearance';

function QRCodeAppearance({ register, errors, setValue, data }: any) {
  const bgpopover = useRef<HTMLInputElement>(null);
  const textpopover = useRef<HTMLInputElement>(null);
  const [bgColor, setBgColor] = useState(data?.params?.shape?.bgColor || BLACK_COLOR);
  const [textColor, setTextColor] = useState(data?.params?.shape?.textColor || WHITE_COLOR);
  const [isBgColorOpen, toggleBgColor] = useState<Boolean>(false);
  const [isTextColorOpen, toggleTextColor] = useState<Boolean>(false);
  
  const handleBgColor = (selected: string) => {
    setBgColor(selected);
    setValue("params.shape.bgColor", `${selected}`);
  };
  
  const handleTextColor = (selected: string) => {
    setTextColor(selected);
    setValue("params.shape.textColor", `${selected}`);
  };
  
  const closeBgColor = useCallback(() => toggleBgColor(false), []);
  useClickOutside(bgpopover, closeBgColor);
  
  const closeTextColor = useCallback(() => toggleTextColor(false), []);
  useClickOutside(textpopover, closeTextColor);

  return (
    <div className="overflow-hidden rounded-md bg-white">
      <Disclosure defaultOpen={false}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className="
                  bg-withe flex w-full items-center 
                  justify-between rounded-t-md px-4 py-2 text-left"
            >
              <span className="font-semi flex w-full flex-col justify-between py-3 text-app-blue">
                Apparence
              </span>
              <BiChevronUp
                className={`text-xl ${open ? 'rotate-180 transform' : ''} h-5 w-5 text-app-blue`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="gap-y-4 rounded-b-md bg-slate-100 bg-white px-4 pb-6 text-gray-500 ">
              <div className="grid py-4 md:grid-cols-8 grid-cols-2 gap-4">
                {QRCODE_APPEARANCE.map((entry) => <QRCodeItemAppearance data={data} register={register} appearance={entry} key={entry}/>)}
              </div>
           
              <div className="mb-4">
                <label htmlFor="phone" className="input-label">
                  Texte
                </label>
                <div className="mt-1 flex flex-col">
                  <input
                    placeholder="SCANNEZ ICI"
                    type="text"
                    autoComplete="false"
                    className="focus:ring-indigo-5000 rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                    {...register('params.shape.text')}
                    id="phone"
                  />
                </div>
                <p className="text-red-600">{errors?.data?.phoneIndex?.message}</p>
                <p className="text-red-600">{errors?.data?.phone?.message}</p>
              </div>
              <div>
                <label htmlFor="bgColor" className="input-label">
                  Sélectionnez une couleur
                </label>
                <div className="mt-1 flex flex-col md:flex-row">
                  <div className="selection relative block md:w-1/3 md:rounded-bl-lg md:rounded-tr-none">
                    <div
                      className="z-10 h-full w-full rounded-l-lg border"
                      style={{ backgroundColor: bgColor, color: textColor }}
                      onClick={() => toggleBgColor(true)}
                    />

                    {isBgColorOpen ? (
                      <div className="let-0 !absolute bottom-0 z-30 !w-full" ref={bgpopover}>
                        <HexColorPicker color={textColor} onChange={handleBgColor} className="!w-full !rounded-b-none" />
                        <HexColorInput color={textColor} onChange={handleBgColor} className='w-full p-2 text-center bg-gray-700 text-white'/>
                      </div>
                    ) : null}
                    
                  </div>

                  <input
                    placeholder="FFFFFF"
                    type="text"
                    autoComplete="false"
                    className="focus:ring-indigo-5000 rounded-bl-lg rounded-br-lg  border-gray-300 py-2 shadow-sm focus:border-indigo-500 md:w-2/3 md:rounded-bl-none md:rounded-br-lg md:rounded-tr-lg"
                    {...register('params.shape.bgColor')}
                    id="bgColor"
                  />
                </div>
                <p className="text-red-600">{errors?.data?.phoneIndex?.message}</p>
                <p className="text-red-600">{errors?.data?.phone?.message}</p>
              </div>
              <div>
                <label htmlFor="bgColor" className="input-label mt-4">
                  Sélectionnez la couleur du texte
                </label>
                <div className="mt-1 flex flex-col md:flex-row">
                  <div className="selection relative block md:w-1/3 md:rounded-bl-lg md:rounded-tr-none">
                    <div
                      className="z-10 h-full w-full rounded-l-lg border"
                      style={{ backgroundColor: textColor, color: textColor }}
                      onClick={() => toggleTextColor(true)}
                    />

                    {isTextColorOpen ? (
                      <div className="let-0 !absolute bottom-0 z-30 !w-full" ref={textpopover}>
                        <HexColorPicker color={textColor} onChange={handleTextColor} className="!w-full !rounded-b-none" />
                        <HexColorInput color={textColor} onChange={handleTextColor} className='w-full p-2 text-center bg-gray-700 text-white'/>
                      </div>
                    ) : null}
                    
                  </div>

                  <input
                    placeholder="FFFFFF"
                    type="text"
                    autoComplete="false"
                    className="focus:ring-indigo-5000 rounded-bl-lg rounded-br-lg  border-gray-300 py-2 shadow-sm focus:border-indigo-500 md:w-2/3 md:rounded-bl-none md:rounded-br-lg md:rounded-tr-lg"
                    {...register('params.shape.textColor')}
                    id="bgColor"
                  />
                </div>
                <p className="text-red-600">{errors?.data?.phoneIndex?.message}</p>
                <p className="text-red-600">{errors?.data?.phone?.message}</p>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default QRCodeAppearance;
