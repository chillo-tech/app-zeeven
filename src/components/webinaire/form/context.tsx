import React, { createContext } from 'react';

import { useWrapper } from '@/hooks/webinaire';

export const context = createContext<ReturnType<typeof useWrapper>>({} as any);

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const data = useWrapper();

  return <context.Provider value={data}>{children}</context.Provider>;
};

export { Wrapper };
