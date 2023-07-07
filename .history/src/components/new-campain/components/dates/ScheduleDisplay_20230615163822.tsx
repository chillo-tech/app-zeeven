import { getHumanDate } from '@/utils';
import React from 'react'
import { useWatch } from 'react-hook-form';

function ScheduleDisplay({ control, index }:any) {
  const {date} = useWatch({
    control,
    name: `schedule.${index}`
  });
  return (
    <button
    type="button"
    className="outline-blue-button"
  >
    {getHumanDate(date as any)}
  </button>
  )
}

export default ScheduleDisplay
