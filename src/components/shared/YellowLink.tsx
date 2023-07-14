import classNames from 'classnames';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { RxTriangleRight } from 'react-icons/rx';
interface Params {
  link?: string;
  label: string;
  download?: string;
  classes?: string;
  button?: boolean;
  action?: any;
}
function YellowLink({ link, label, button, action, classes, download }: Params) {

  return (
    <>
      {button ? (
        <button
          onClick={action}
          className={classNames(
            'yellow-button',
            classes
          )}
        >
          {label}{' '}
          <span className="mr-2 rounded-full bg-app-yellow p-0">
            <RxTriangleRight className="text-md ml-2 text-app-blue" />
          </span>
        </button>
      ) : (
        <Link
          href={link || ''}
          className={classNames(
            'yellow-button',
            classes
          )}
        >
          {label}{' '}
          <span className="mr-2 rounded-full bg-app-yellow p-0">
            <AiOutlineArrowRight className="text-md ml-2 text-app-blue" />
          </span>
        </Link>
      )}
    </>
  );
}

export default YellowLink;
