import { createContext, useCallback, useMemo, useReducer } from 'react';
import { INITIAL_STATE, UPDATE_DATA } from '@/utils';
import { ApplicationReducer } from './ApplicationReducer';

interface AppContextInterface {
  state: any;
  updateData: (data: any) => void
}

type Props = {
  children: JSX.Element;
};
export const ApplicationContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);
function ApplicationContextWrapper({ children }: Props) {
  const [state, dispatch] = useReducer(ApplicationReducer, INITIAL_STATE);
  const updateData = useCallback((data: {}) => dispatch({type: UPDATE_DATA, data}),[]);
  const authenticatedUser = useCallback((data: {}) => dispatch({type: UPDATE_DATA, data}),[]);
  const appContext = useMemo(
    () => ({
      state,
      updateData
    }),
    [state, updateData]
  );

  return (
    <ApplicationContext.Provider value={{ ...appContext }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export default ApplicationContextWrapper;
