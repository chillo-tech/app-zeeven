import React from 'react'
import ImageDisplay from '../image-display'
import OutlineLink from '../shared/OutlineLink'
import { downloadBase64File } from '@/utils'
import classNames from 'classnames'

function QRCodePrevisualisation({data, classes}: any) {
  return (
    <div className={classNames('flex flex-col', classes)}>
          <ImageDisplay
            base64={(data && data.path)  ? true: false}
            local={(data && data.path)  ? false : true}
            image={(data && data.path) ? data :{path: '/images/commons/qrcode-sample.png', title: 'zeeven qr code' }}
            wrapperClasses="relative w-full h-60"
            imageClasses="object-contain"
          />
          {
            (data && data.path) ? (
               <OutlineLink
                  button={true}
                  action={() => downloadBase64File(data, 'image/png', `qr-code.png`)}
                  label="Télécharger"
                  classes="w-full justify-center mt-4"
                />
            ) : null
          }
          
        </div>
  )
}

export default QRCodePrevisualisation
