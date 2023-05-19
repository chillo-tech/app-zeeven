import {INITIAL_STATE, RESET_CAMPAIN, SET_NB_STEPS, SET_STATE, UPDATE_CAMPAIN, UPDATE_STEP_INDEX} from '../utils/data';

export const NewCampainReducer = (state: any = INITIAL_STATE, action: any) => {
	const {type, data} = action || {};
	const currentState = sessionStorage.getItem("STATE");
	let newState = currentState ? JSON.parse(currentState) : state;

	switch (type) {
		case SET_NB_STEPS:
		case UPDATE_STEP_INDEX:
			newState = {
				...state,
				...data
			};
			break;
		case RESET_CAMPAIN:
			newState = INITIAL_STATE;
			break;
		case SET_STATE:
			newState = data;
			break;
		case UPDATE_CAMPAIN:
			newState = {
				...state,
				stepIndex: state.stepIndex + 1,
				campain: {
					...state.campain,
					...data
				}
			};
			break;
		default:
			newState = INITIAL_STATE;
			break;
	}
	sessionStorage.setItem("STATE", JSON.stringify(newState));
	return newState;
}
