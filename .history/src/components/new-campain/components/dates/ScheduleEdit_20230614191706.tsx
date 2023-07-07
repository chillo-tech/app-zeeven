import React from 'react'

function ScheduleEdit() {
  return (
    const Edit = ({ update, index, value, control }) => {
      const { register, handleSubmit } = useForm({
        defaultValues: value
      });
    
      return (
        <div>
          <Display control={control} index={index} />
          
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
  )
}

export default ScheduleEdit
