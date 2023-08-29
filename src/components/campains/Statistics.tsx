import React, { useState } from 'react';
import Emoji from '@/components/shared/Emoji';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { search } from '@/services/crud';
function Statistics({id}:{id: number}) {
  const [data, setData] = useState<any>(null);
  const handleStatistics = (entry: any[]) => {
    const results = entry.reduce(
      (accumulator: any, currentValue: any) => {
        const status = currentValue["status"];
        if (accumulator[status]) {
          accumulator[status] = Number(accumulator[status]) + 1;
        } else {
          accumulator[status] = 1
        }
        return accumulator;
      },
      {SENT: 0, DELIVERED: 0}
    );
    setData(results);
  }
  const { query: { slug }} = useRouter();
  useQuery<any>({
    queryKey: ['user-campains', slug, 'statistic'],
    queryFn: () => search(`/api/backend/event/${id}/statistic`),
    refetchOnWindowFocus: false,
    onSuccess: (data) => handleStatistics(data?.data)
  });

  return (
    <>
      {data ? (
        <article className="min-h-fit bg-white flex justify-around items-center py-4">
          <div className="grid grid-rows-2 text-center items-center justify-center">
            <Emoji symbol="&#128521;" />
            <h3 className="text-orange-600 text-xl py-2 flex flex-col font-semibold">
              <span>{data["QUEUED"]}</span>
              <span>Programmés</span>
            </h3>
          </div>
          <div className="grid grid-rows-2 text-center items-center justify-center">
            <Emoji symbol="&#128522;" />
            <h3 className="text-purple-500 text-xl py-2 flex flex-col font-semibold">
              <span>{data["SENT"]|| 0}</span>
              <span>Envoyés</span>
            </h3>
          </div>
          <div className="grid grid-rows-2 text-center items-center justify-center">
            <Emoji symbol="&#128516;" />
            <h3 className="text-blue-500 text-xl py-2 flex flex-col font-semibold">
              <span>{(Number(data["DELIVERED"]) > Number(data["SENT"]) ? data["SENT"] : data["DELIVERED"]) || 0}</span>
              <span>Reçus</span>
            </h3>
          </div>
          
          {/** 
          <div className="grid grid-rows-2 text-center items-center justify-center">
            <Emoji symbol="&#129303;" />
            <h3 className="text-green-600 text-xl py-2 flex flex-col font-semibold">
              <span>{data?.replies}</span>
              <span>Réponses</span>
            </h3>
          </div>
          */}
        </article>
      ) : null}
    </>
  );
}

export default Statistics;
