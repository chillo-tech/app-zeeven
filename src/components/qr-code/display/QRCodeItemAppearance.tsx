import classNames from 'classnames';
import { BsQrCode } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';

function QRCodeItemAppearance({ appearance, register, data }: any) {
  return (
    <label
      htmlFor={appearance}
      className={`cursor-pointer border-4 ${
        data?.params?.shape?.selected === appearance ? 'border-app-blue' : 'border-slate-700'
      } flex flex-col items-center overflow-hidden rounded-md`}
    >
      <span
        className={classNames('out flex h-full w-full items-center justify-center', {
          'flex-col': appearance === 'TEXT_BOTTOM',
          'flex-col-reverse': appearance === 'TEXT_TOP',
        })}
      >
        {appearance === 'NONE' ? (
          <RxCrossCircled className="my-auto  h-12 w-12" />
        ) : (
          <>
            <BsQrCode className="my-4  h-12 w-12" />
            <span
              className={`'text-center flex w-full p-3 ${
                data?.params?.shape?.selected === appearance ? 'bg-app-blue' : 'bg-slate-700'
              }`}
            />
          </>
        )}
      </span>
      <input
        type="radio"
        value={appearance}
        id={appearance}
        className="hidden"
        {...register('params.shape.selected')}
      />
    </label>
  );
}

export default QRCodeItemAppearance;
