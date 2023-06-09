import ImageDisplay from '@/components/image-display';
import Icon from '@/components/shared/Icon';
import { fetchData, handleError } from '@/services';
import { Channel } from '@/types/data';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

function Stocks() {
  const [stocks, setstocks] = useState<any>();
  useQuery<any>({
    queryKey: ['stocks'],
    queryFn: () =>
      axios.get(
        '/api/backend/stocks/statistics',
      ),
    onError: handleError,
    onSuccess: (data) => {
      setstocks(data.data);
    },
  });
  return (
    <>
      {stocks && Object.keys(stocks).length ? (
        <div className="mt-2 flex items-end justify-end bg-white px-4 shadow sm:overflow-hidden sm:rounded-md">
          <div className="gap-6 flex items-center text-sm">
            <span className='font-bold'>
              Vos crédits: 
              </span>
              <ul className="flex justify-center gap-4 py-4 md:flex-row text-lg">
                {Object.keys(stocks).map((key) => (
                  <li key={`${key}`} className="flex-1">
                    <p className="flex items-center justify-between rounded-md bg-white font-light text-black">
                      <Icon channel={((key as unknown)as Channel)}/>
                      <span className='ml-1'>{stocks[key]}</span>
                    </p>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Stocks;
