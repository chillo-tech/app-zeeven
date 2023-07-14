import Message from '@/components/Message';
import AreaChart from '@/components/shared/AreaChart';
import Debug from '@/components/shared/Debug';
import Map from '@/components/shared/Map';
import { handleError, search } from '@/services';
import { capitalize } from '@/utils';
import { useState } from 'react';
import { useQuery } from 'react-query';
function QRcodeStatistics({ id }: { id: number }) {
  const [isError, setIsError] = useState(false);
  const {
    isSuccess,
    isLoading,
    data: { data } = {},
  } = useQuery<any>({
    queryKey: ['user-qr-code', id, 'statistics'],
    queryFn: () => search(`/api/backend/qr-code/private/${id}/statistics`),
    enabled: !!id,
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      setIsError(true), handleError(error);
    },
  });

  const unique = (entry: any[]) => {
    const ips = entry.map(({ ip }) => ip);
    return [...new Set<String>(ips)];
  };
  return (
    <div>
      {isLoading ? (
        <Message
          type="loading"
          firstMessage="Un instant"
          secondMessage="Nous chargeons vos informations"
        />
      ) : null}

      {isError ? (
        <Message
          type="error"
          firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
          secondMessage="Veuillez prendre contact avec nous"
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {isSuccess && data ? (
        <>
          <article className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-md bg-white py-6 text-center text-6xl font-extrabold text-black">
              {('0' + data.length).slice(-2)}
              <span className="text-sm font-normal">scans</span>
            </div>
            <div className="rounded-md bg-white py-6 text-center text-6xl font-extrabold text-black">
              {('0' + unique(data).length).slice(-2)}
              <span className="text-sm font-normal">scans uniques</span>
            </div>
          </article>
          <div className="W-FULL mt-4 rounded-md bg-white p-6 text-center text-6xl font-extrabold text-black">
            <AreaChart />
          </div>
          <article className="mt-6 grid gap-4 md:grid-cols-2">
            <div className=" overflow-hidden rounded-md bg-white text-6xl font-extrabold text-black">
              <Map data={data} />
            </div>
            <div className="rounded-md bg-white p-6 font-light text-black text-lg">
              <h3 className='pb-2 mb-2 font-bold text-app-blue border-b border-app-blue text-xl'>Villes</h3>
              {
              Object.entries(data
                .map((entry: any) => entry.city)
                .reduce(function (acc: any, curr: string) {
                  return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
                }, {}))
                .map(([key, value]) => (
                  <p className="text-left flex mb-2" key={key}>
                    <span className='font-bold w-28'>{capitalize(key)} :</span> {`${value}`}
                  </p>
                ))}
            </div>
          </article>
        </>
      ) : null}
    </div>
  );
}
export default QRcodeStatistics;
