import React from 'react'

function ScheduleDisplay({ control, index }:any) {
  const data = useWatch({
    control,
    name: `array.${index}`
  });
  return (
    <div>
      
    </div>
  )
}

export default ScheduleDisplay
