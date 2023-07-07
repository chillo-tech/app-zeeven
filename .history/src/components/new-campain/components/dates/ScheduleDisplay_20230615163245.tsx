import React from 'react'
import { useWatch } from 'react-hook-form';

function ScheduleDisplay({ control, index }:any) {
  const data = useWatch({
    control,
    name: `scjefule.${index}`
  });
  return (
    <div>
      
    </div>
  )
}

export default ScheduleDisplay
