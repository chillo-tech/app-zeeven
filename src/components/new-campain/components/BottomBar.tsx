import React from 'react'
type BottomBarParams = {
  stepIndex: number,
  nextDisabled: boolean,
  previousStep: () => void,
  handleOnClick?: any,
  previousDisabled?: boolean,
  previousLabel?: string,
  nextLabel?: string,
  nextButtonType?: string,
};
function BottomBar({
  stepIndex,
  previousStep,
  nextDisabled,
  previousDisabled = false,
  previousLabel = "Retour",
  nextLabel = "Etape suivante",
  nextButtonType = 'submit',
  handleOnClick
  
}:BottomBarParams) {
  return (
    <div className='flex items-center justify-between mt-6 font-extralight'>
      {
        stepIndex != 0 ? (
          <button type='button' className='pr-4 py-3 text-black' onClick={previousStep} disabled={previousDisabled}>
            <span className='border-b block border-b-black w-full'>{previousLabel}</span>
          </button>
        ): <span />
      }
      {
        nextButtonType  === 'submit'? (
          <button type='submit' className='rounded-md bg-app-yellow text-app-blue border-app-yellow px-4 py-2' disabled={nextDisabled}>
            <span>{nextLabel}</span>
          </button>
        ): (
          <button type='button'
            onClick={handleOnClick}
            className='rounded-md bg-app-yellow text-app-blue border-app-yellow px-4 py-2' disabled={nextDisabled}>
            <span>{nextLabel}</span>
          </button>
        )
      }
    </div>
  )
}

export default BottomBar