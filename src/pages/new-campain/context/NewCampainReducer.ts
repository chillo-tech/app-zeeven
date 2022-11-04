import { INITIAL_STATE, SET_NB_STEPS, UPDATE_CAMPAIN, UPDATE_STEP_INDEX } from './../utils/data';
export const NewCampainReducer = (state: any = INITIAL_STATE, action: any) => {
	const {type, data} = action || {};
  switch (type) {
		case SET_NB_STEPS:
		case UPDATE_STEP_INDEX:
			return {
        ...state,
        ...data
      };
    case UPDATE_CAMPAIN:
      return {
        ...state,
        stepIndex: state.stepIndex + 1,
        campain: {
          ...state.campain,
          ...data
        }
      };
  }
	return state;
}