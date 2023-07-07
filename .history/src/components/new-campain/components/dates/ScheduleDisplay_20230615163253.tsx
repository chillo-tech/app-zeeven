import React from 'react'
import { useWatch } from 'react-hook-form';

function ScheduleDisplay({ control, index }:any) {
  const data = useWatch({
    control,
    name: `schedule.${index}`
  });
  return (
    <div>
      
    </div>
  )
}

export default ScheduleDisplay
