import Metadata from '@/components/Metadata';
import CreditsUtilisateur from '@/components/administration/CreditsUtilisateur';
import DroitsUtilisateurs from '@/components/administration/DroitsUtilisateurs';
import ProtectedLayout from '@/containers/protected';
import { ACCOUNT_PARAMETERS } from '@/utils';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
function index() {
  return (
    <ProtectedLayout>
      <Metadata entry={{ title: 'Paramètres des comptes', description: 'Paramètres comptes' }} />
      <h1 className="text-3xl font-semibold text-app-blue">Configurez des comptes utilisateur</h1>
      <div>
        {
          ACCOUNT_PARAMETERS.map((param) =>

            <Disclosure as="div" className="mb-3" key={`admin-${param.key}`}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={({ open }) =>
                    classNames(
                      'flex w-full justify-between rounded-t-md px-3 py-4 leading-5 text-app-blue',
                      'bg-white font-medium shadow',
                      open ? 'rounded-b-none' : 'rounded-b-md'
                    )
                  }
                >
                  <span>{param.label}</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-blue-700`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel
                  className={({ open }) =>
                    classNames(
                      'px-4 pb-4 pt-2 bg-white shadow',
                      open ? 'rounded-b-md' : 'rounded-b-none'
                    )
                  }
                  >
                  {
                    {
                      'roles': <DroitsUtilisateurs />,
                      'credits': <CreditsUtilisateur />
                    }[param.key]
                  }
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
          )
        }
      </div>
    </ProtectedLayout>
  );
}

export default index;
