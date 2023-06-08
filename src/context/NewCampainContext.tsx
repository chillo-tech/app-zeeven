import Head from 'next/head';
import Image from 'next/image';
import {cloneElement, createContext, useCallback, useEffect, useMemo, useReducer} from 'react';
import Nav from '../components/new-campain/components/Nav';
import {INITIAL_STATE, RESET_CAMPAIN, SET_NB_STEPS, SET_STATE, UPDATE_CAMPAIN, UPDATE_STEP_INDEX} from '../utils/data'
import {NewCampainReducer} from './NewCampainReducer';

interface AppContextInterface {
	state: any;
	reset: () => void;
	previousStep: () => void;
	updateCampain: (data: any) => void;
	setNbSteps: (data: any) => void;
	updateStepIndex: (data: any) => void;
}

type Props = {
	children: JSX.Element[],
};
export const NewCampainContext = createContext<AppContextInterface>({} as AppContextInterface);


function NewCampainContextWrapper({children}: Props) {
	const [state, dispatch] = useReducer(NewCampainReducer, INITIAL_STATE);
	const previousStep = useCallback(
		() => {
			const newStepIndex = state.stepIndex >= 1 ? state.stepIndex - 1 : 0;
			const data = {stepIndex: newStepIndex};
			dispatch({type: UPDATE_STEP_INDEX, data});
		},
		[state.stepIndex]
	)
	const updateCampain = useCallback((data: {}) => {
		dispatch({type: UPDATE_CAMPAIN, data});
	}, []);
	const setNbSteps = useCallback((data: {}) => {
		dispatch({type: SET_NB_STEPS, data});
	}, []);
	const updateStepIndex = useCallback((data: {}) => {
		dispatch({type: UPDATE_STEP_INDEX, data});
	}, []);
	const reset = useCallback(() => {
		dispatch({type: RESET_CAMPAIN});
	}, []);
	const setState = useCallback((data: {}) => {
		dispatch({type: SET_STATE, data});
	}, []);
	const authContext = useMemo(() => ({
		reset,
		previousStep,
		updateCampain,
		setState,
		setNbSteps,
		updateStepIndex
	}), [reset, previousStep, updateCampain, setNbSteps, updateStepIndex, setState]);

	useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = () => {
			const nbSteps = children.length;
			authContext.setNbSteps({nbSteps});
		};
		bootstrapAsync();
		const currentState = sessionStorage.getItem("STATE");
		if (currentState) {
			setState(JSON.parse(currentState));
		}
	}, [children.length, authContext, setState]);
	return (
		<NewCampainContext.Provider value={{state, ...authContext}}>
			<Head>
				<title>ZEEVEN | Nouvelle campagne</title>
			</Head>
			<section className='pb-20 md:pb-20 font-light'>
				<Nav/>
				<main className='container mx-auto py-2'>
					<div className='md:w-3/4 mx-auto p-2'>
						<div className="operator flex items-center">
							<div className="picture pr-4">
								<Image alt="Nouvelle campagne" src={"/images/emmanuelle.png"} width="100" height="100"/>
							</div>
							<div className="speech">
								<h3 className="font-bold">Emmanuelle</h3>
								<p>Bonjour! Je suis Emmanuelle.</p>
								<p>En quelques questions je vais vous aider à rédiger votre message.</p>
							</div>
						</div>
            {
              (state && state.stepIndex && state.stepIndex > 0) ? (
                <p className="flex items-center justify-end">
                  <button type="button" onClick={reset} className='blue-link underline'>Recommencer</button>
                </p>
              ) : null
            }
           
						<section className='py-3'>
							{
								children.map((child, index) => index === state.stepIndex ? cloneElement(child, {
									key: `child-${index}`,
									stepIndex: state.stepIndex
								}) : null)
							}
						</section>
					</div>
				</main>
			</section>
		</NewCampainContext.Provider>
	);
}

export default NewCampainContextWrapper;
