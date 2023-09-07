import { UPDATE_DATA } from '@/utils';
import React, {createContext, useMemo, useCallback, useState } from 'react'
interface QRCodeContextInterface {
  qrCodeData: any;
  updateQrCodeData: (data: any) => void
}
type Props = {
  children: JSX.Element;
};
export const QRCodeContext = createContext<QRCodeContextInterface>(
  {} as QRCodeContextInterface
);
function QRCodeContextProvider({ children }: Props) {
  const [qrCodeData, setQrCodeData] = useState({});
  const updateQrCodeData = useCallback((data: {}) => setQrCodeData({type: UPDATE_DATA, data}),[]);
  const appContext = useMemo(
    () => ({
      qrCodeData,
      updateQrCodeData
    }),
    [qrCodeData, updateQrCodeData]
  );
    return (
      <QRCodeContext.Provider value={{ ...appContext }}>
        {children}
      </QRCodeContext.Provider>
    );
}

export default QRCodeContextProvider;
