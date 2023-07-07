import { getHumanDate } from '@/utils';
import React from 'react'
import { useWatch } from 'react-hook-form';

function ScheduleDisplay({ control, index }:any) {
  const data = useWatch({
    control,
    name: `array.${index}`
  });
  return <p>{data?.firstName}</p>;
}

export default ScheduleDisplay
