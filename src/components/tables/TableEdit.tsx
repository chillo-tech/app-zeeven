import { Table } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    id: yup.string(),
    name: yup.string().required('Ce champ est requis'),
    type: yup.string().required('Ce champ est requis'),
    position: yup.string(),
    number: yup.number(),
    active: yup.bool(),
  })
  .required();

function TableEdit({ handleSubmit }: { handleSubmit: Function }) {
  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm<Table>({
    resolver: yupResolver(schema),
    defaultValues: { id: '', name: '', position: '', type: '', active: true, description: '', number: 0 },
  });
  const onSubmit = (data: Table) => {
    reset();
    handleSubmit(data);
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)} className="gap-4 md:grid md:grid-cols-2">
      <div className="text-md mb-0">
        <label htmlFor="field-1" className="text-md mb-2 flex w-full flex-col justify-between">
          Type
        </label>
        <div className="mt-1">
          <select
            {...register('type')}
            id="field-1"
            className="w-full rounded-lg border-gray-300 shadow-sm"
          >
            <option value="">Sélectionner</option>
            <option value="CLASSIQUE">Classique</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
        <p className="text-red-600">{errors?.type?.message}</p>
      </div>
      <div className="text-md mb-0">
        <label htmlFor="field-2" className="text-md mb-2 flex w-full flex-col justify-between">
          Nom
        </label>
        <div className="mt-1">
          <input
            autoComplete="false"
            className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
            {...register('name')}
            type="text"
            id="field-2"
          />
        </div>
        <p className="text-red-600">{errors?.name?.message}</p>
      </div>
      <div className="text-md mb-0">
        <label htmlFor="field-3" className="text-md mb-2 flex w-full flex-col justify-between">
          Position
        </label>
        <div className="mt-1">
          <input
            autoComplete="false"
            className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
            {...register('position')}
            type="text"
            id="field-3"
          />
        </div>
        <p className="text-red-600">{errors?.description?.message}</p>
      </div>
      <div className="text-md mb-0 flex items-end pb-3">
        <div className="h-100 mt-1">
          <input
            className="focus:ring-indigo-5000 border-gray-300 py-2 shadow-sm focus:border-indigo-500"
            type="checkbox"
            {...register('active')}
            id="sendFile"
          />
          <label className="form-check-label ml-2" htmlFor="sendFile">
            Disponible ?
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="col-span-2 mt-2 w-full rounded-lg bg-blue-800 px-4 py-2 font-light text-white shadow-sm hover:bg-blue-800"
      >
        Enregistrer
      </button>
    </form>
  );
}

export default TableEdit;
