import { add, handleError } from '@/services';
import { downloadBase64File } from '@/utils';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import ImageDisplay from '../image-display';
import OutlineLink from '../shared/OutlineLink';
import { AxiosError } from 'axios';

function QRCodePrevisualisation({ classes, formData, isValid, qrCodeData: initialQrCodeData }: any) {
  const [qrCodeData, setQrCodeData] = useState(initialQrCodeData);
  useDeepCompareEffect(() => {
    if (isValid) {
      const fetchData = async () => {
        try {
          //const result = await add(`/api/backend/qr-code?simulate=true`, { ...formData, data: { text: formData.text } });
          const result = await add(`/api/backend/qr-code?simulate=true`, formData);
          setQrCodeData({ path: result.data, title: 'QR CODE ZEEVEN' });
        } catch (error: any) {
          handleError(error);
        }
      };
      fetchData();
    }
  }, [formData, isValid]);

  return (
    <div className={classNames('', classes)}>
      {qrCodeData && qrCodeData.path ? (
        <>
          <div className={classNames({})}>
            <ImageDisplay
              base64={true}
              local={false}
              image={qrCodeData}
              wrapperClasses="relative w-full h-60"
              imageClasses="object-contain"
            />
          </div>
          <OutlineLink
            button={true}
            action={() => downloadBase64File(qrCodeData.path, 'image/png', `qr-code.png`)}
            label="Télécharger"
            classes="w-full justify-center mt-4"
          />
        </>
      ) : (
        <div className={classNames({})}>
          <ImageDisplay
            base64={false}
            local={true}
            image={{ path: '/images/commons/qrcode-sample.png', title: 'zeeven qr code' }}
            wrapperClasses="relative w-full h-96"
            imageClasses="object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default QRCodePrevisualisation;
