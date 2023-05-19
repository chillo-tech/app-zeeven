import { UPDATE_DATA,INITIAL_STATE } from '@/utils';

const ApplicationReducer = (state: any = INITIAL_STATE, action: any) => {
  const { type, data } = action || {};
  switch (type) {
    case UPDATE_DATA:
      return { ...state, ...data}
    default:
      return state;
  }
};

export { ApplicationReducer };
