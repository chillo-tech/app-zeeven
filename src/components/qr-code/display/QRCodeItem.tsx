import ImageDisplay from '@/components/image-display';
import OutlineLink from '@/components/shared/OutlineLink';
import YellowLink from '@/components/shared/YellowLink';
import { QR_CODES_TYPES, getDisplayedDate } from '@/utils';
import classNames from 'classnames';

function QRCodeItem({ entry, index, withDetail = true }: any) {
  const downloadBase64File= (base64Data: string, contentType: string, fileName: string) =>{
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  return (
    <>
      <article
        className={classNames('md:grid text-center md:text-left items-center px-2 py-2 grid-cols-1  md:grid-cols-6 items-center', {
          'bg-app-light-blue': index % 2 === 0,
        })}
      >
        <ImageDisplay
          base64={true}
          image={{ path: entry.file, title: entry.publicId }}
          wrapperClasses="relative md:w-32 w-full h-32 !flex items-center justifly-center"
          imageClasses="object-contain"
        />
        <div className="description col-span-3 py-2 md:py-0">
          <h3 className="text-2xl font-extrabold">
            {
              QR_CODES_TYPES.filter(({ value }: { value: string }) => value === entry.type)[0][
                'label'
              ]
            }
          </h3>
          <p className="mt-2 flex text-sm">
            <span className="w-20 text-gray-500">Lien:</span>
            <span className="col-span-2">{entry.finalContent}</span>
          </p>
          <p className="mt-2 flex text-sm">
            <span className="w-20 text-gray-500">Creation:</span>
            <span className="col-span-2">{getDisplayedDate(entry.creation)}</span>
          </p>
        </div>
        <h2 className="text-center text-6xl font-extrabold text-black py-2 md:py-0">
          {('0' + entry.scans).slice(-2)}
          <span className="text-sm font-normal">scans</span>
        </h2>
        <p>
          <OutlineLink button={true} action={()=> downloadBase64File(entry.file, 'image/png', `${entry.publicId}.png`)} label="Télécharger" classes="w-full justify-center"/> 
          {withDetail ? (<YellowLink label="Afficher" link={`/me/qr-code/${entry.id}`} classes="w-full justify-center mt-2"/>) : null }
        </p>
      </article>
    </>
  );
}

export default QRCodeItem;
