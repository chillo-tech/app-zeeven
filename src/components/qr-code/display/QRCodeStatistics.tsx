import Message from '@/components/Message';
import AreaChart from '@/components/shared/AreaChart';
import Map from '@/components/shared/Map';
import PieClart from '@/components/shared/PieChart';
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
            <AreaChart data={data} />
          </div>
          <article className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-md bg-white p-6 text-lg font-light text-black">
              <h3 className="mb-2 border-b border-app-blue pb-2 text-xl font-bold text-app-blue">
                Villes
              </h3>
              {Object.entries(
                data
                  .map((entry: any) => entry.city)
                  .reduce(function (acc: any, curr: string) {
                    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
                  }, {})
              ).map(([key, value]) => (
                <p className="mb-2 flex justify-between" key={key}>
                  <span className="font-bold text-left">{capitalize(key)} :</span> 
                  <span className="font-bold text-right">{`${value}`}</span>
                </p>
              ))}
            </div>{' '}
            <div className=" overflow-hidden rounded-md bg-white p-4 font-extrabold text-black">
              <PieClart data={data} />
            </div>
          </article>
          <div className="W-FULL mt-4 overflow-hidden rounded-md bg-white text-center text-6xl font-extrabold text-black">
            <Map data={data} />
          </div>
        </>
      ) : null}
    </div>
  );
}
export default QRcodeStatistics;
