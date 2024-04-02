import { ReactNode, createContext } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
export const formContext = createContext<{
  register: UseFormRegister<{
    [key: `question_${number}`]: string | number;
    [key: `question_${string}`]: string | number;
  }>;
  watch: UseFormWatch<{
    [key: `question_${number}`]: string | number;
    [key: `question_${string}`]: string | number;
  }>;
}>({} as any);

const Wrapper = ({
  children,
  register,
  watch,
}: {
  children: ReactNode;
  register: UseFormRegister<{
    [key: `question_${number}`]: string | number;
    [key: `question_${string}`]: string | number;
  }>;
  watch: UseFormWatch<{
    [key: `question_${number}`]: string | number;
    [key: `question_${string}`]: string | number;
  }>;
}) => {
  return (
    <formContext.Provider
      value={{
        register,
        watch,
      }}
    >
      {children}
    </formContext.Provider>
  );
};

export default Wrapper;
