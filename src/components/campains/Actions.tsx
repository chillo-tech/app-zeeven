import { handleError, patch } from '@/services';
import { BACKEND_BASE_PATH, GLOBAL_SUCCESS_MESSAGE, PROFILE_CATEGORIES } from '@/utils';
import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import Message from '../Message';
function Actions({  handleItemEdit, data, state: { user } = { user: {} } }: any) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate } = useMutation({
    mutationFn: ({event, params}: any) => patch(`${BACKEND_BASE_PATH}/event/${event}/params`, params),
    onError: (error: any) => {
      console.log({ error });
      setIsError(true), handleError(error);
    },
    onSuccess: ({ data }: any) => {
      setIsSuccess(true);
      handleItemEdit();
    },
  });
  const handleEnabled = (params: any) => {
    mutate( {event: data.publicId, params})
  };
  return (
    <>
      {isSuccess ? (
        <article className="pt-3 px-3 text-right text-green-600">
          {GLOBAL_SUCCESS_MESSAGE}
        </article>
      ) : null}
      {isError ? (
        <div className="container mx-auto mb-10 rounded-lg bg-white md:w-2/3">
          <Message
            type="error"
            firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
            secondMessage="N'hésitez pas à nous passer un coup de fil"
            action={handleError}
            actionLabel="Retourner à l'accueil"
          />
        </div>
      ) : null}
      {user &&
      Object.keys(user).length &&
      user['authorities'] &&
      user['authorities'][0]['authority'] === 'ROLE_ADMIN' ? (
        <article className="flex min-h-fit items-center justify-end gap-8 bg-white px-4">
          {PROFILE_CATEGORIES.map(({ label, slug }: any) => (
            <Switch.Group key={slug}>
              <div className="my-4 flex items-center">
                <Switch.Label className=" mr-5 text-xl">{label}</Switch.Label>
                <Switch
                  checked={data.params[slug]}
                  onChange={(status) => handleEnabled({ [slug]: status })}
                  className={`${
                    data.params[slug] ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      data.params[slug] ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </Switch.Group>
          ))}
        </article>
      ) : null}
    </>
  );
}

export default Actions;
