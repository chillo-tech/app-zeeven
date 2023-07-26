import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Table } from "@/types/Table";
export type myTable = {
  table: {
    id: string,
    name: string,
    description: string,
    typeTable: string,
    position: string,
    places: string
  }
};

const schema = yup.object({
  table: yup.object({
    id: yup.string(),
    name: yup.string()
          .required("Ce champ est requis"),
    description: yup.string()
          .required("Ce champ est requis"),
    typeTable: yup.string()
          .required("Ce champ est requis"),
    position: yup.string()
          .required("Ce champ est requis"),
    places: yup.string()
          .required("Ce champ est requis")
  }),
}).required();

function TableEdit({handleSubmit}: {handleSubmit: Function}) {
  const { register, handleSubmit: handleFormSubmit, reset, formState: { errors } } = useForm<myTable>({
    resolver: yupResolver(schema),
    defaultValues: {table:{ id: '', name: '', description: '', typeTable: '',  position: '', places: ''}}
  });
  const onSubmit = (data: myTable) => {
    reset();
    handleSubmit(data);
  }

	return (
		 <form onSubmit={handleFormSubmit(onSubmit)} className="md:grid md:grid-cols-2 gap-4">
          
       <div className="mb-0 text-md flex flex-col">
          <label htmlFor="name" className="form-label">Nom de la Table</label>
          <div className="mt-1">
            <input {...register("table.name")} type="text" className="" id="name" />
          </div>
          <p className='text-red-600'>{errors?.table?.name?.message}</p>
        </div>
        <div className="mb-0 text-md">
          <label htmlFor="description" className="form-label mb-1">Description de votre table</label>
          <div className="mt-1">
            <textarea {...register("table.description")}  className="" id="description" />
          </div>
          <p className='text-red-600'>{errors?.table?.description?.message}</p>
        </div>
        <div className="mb-0 text-md">
          <label htmlFor="typeTable" className="form-label">Est-ce une table VIP?</label>
          <div className="mt-1">
            <select {...register("table.typeTable")}  id="typeTable"  />
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </div>
          <p className='text-red-600'>{errors?.table?.typeTable?.message}</p>
        </div>
        
        <div className="mb-0 text-md">
          <label htmlFor="position" className="form-label">Quelle sera sa position?</label>
          <div className="mt-1">
            <input {...register("table.position")} type="text" id="position" />
          </div>
          <p className='text-red-600'>{errors?.table?.position?.message}</p>
        </div>
        <div className="mb-0 text-md">
          <label htmlFor="place" className="form-label">Quel est le nombre de place pour cette table?</label>
          <div className="mt-1">
            <input {...register("table.places")} type="number" id="place"  />
          </div>
          <p className='text-red-600'>{errors?.table?.places?.message}</p>
        </div>
        <button type="submit" className="col-span-2 mt-2 w-full bg-blue-800 hover:bg-blue-800 text-white font-light py-2 px-4 rounded-lg shadow-sm">
          Enregistrer
        </button>
      </form>
	);
}

export default TableEdit;
