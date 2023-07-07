import React from 'react'
import { useForm } from 'react-hook-form';

function ScheduleEdit ({ update, index, value, control })  {
  const { register, handleSubmit } = useForm({
    defaultValues: value
  });

  return (
    <div>
      
      
      <input
        placeholder="first name"
        {...register(`firstName`, { required: true })}
      />

      <button
        type="button"
        onClick={handleSubmit((data) => update(index, data))}
      >
        Submit
      </button>
    </div>
  );
}

export default ScheduleEdit
