import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import Message from '../Message';

const Map = ({ data = [] }: { data: any[] }) => {
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: 48.006111, lng: 0.199556 }), []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

  return (
    <>
      {loadError ? (
        <Message
          type="error"
          firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
          secondMessage="Veuillez prendre contact avec nous"
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {isLoaded ? (
          <GoogleMap
            zoom={5}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerClassName="w-full h-96"
            options={{mapTypeControl: false, clickableIcons: false, streetViewControl: false, zoomControl: false, scaleControl: false }}
          >
            {data.map((adresse: any, index: number) => (
              <MarkerF
                title={`adresse-${adresse.city}`}
                key={`adresse-${adresse.id}`}
                position={{
                  lat: parseFloat(adresse.latitude),
                  lng: parseFloat(adresse.longitude),
                }}
              />
            ))}
          </GoogleMap>
      ) : (
        <Message
          type="loading"
          firstMessage="Un instant"
          secondMessage="Nous chargeons vos informations"
        />
      )}
    </>
  );
};

export default Map;
