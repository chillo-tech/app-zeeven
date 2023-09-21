import classNames from 'classnames';
import Link from 'next/link';
import { RxTriangleRight } from 'react-icons/rx';
interface Params {
  link?: string;
  label: string;
  icon?: boolean;
  download?: string;
  classes?: string;
  button?: boolean;
  action?: any;
}
function OutlineLink({ link, label, button, action, classes, download, icon = true }: Params) {

  return (
    <>
      {button ? (
        <button
          onClick={action}
          className={classNames(
            'inline-block flex items-center rounded-lg border border-app-blue px-3 py-2 text-app-blue',
            classes
          )}
        >
          {icon ? (
             <span className="mr-2 rounded-full bg-app-yellow p-0">
             <RxTriangleRight className="!m-0 text-3xl text-app-blue" />
           </span>
          ) : null}
         {' '}
          {label}
        </button>
      ) : (
        <Link
          href={link || ''}
          className={classNames(
            'inline-block flex items-center rounded-lg border border-app-blue px-3 py-2 text-app-blue',
            classes
          )}
        >
          <span className="mr-2 rounded-full bg-app-yellow p-0">
            <RxTriangleRight className="!m-0 text-3xl text-app-blue" />
          </span>{' '}
          {label}
        </Link>
      )}
    </>
  );
}

export default OutlineLink;
