import React from 'react'
type BottomBarParams = {
  stepIndex: number,
  nextDisabled: boolean,
  previousStep: () => void,
  previousDisabled?: boolean,
  previousLabel?: string,
  nextLabel?: string,
};
function BottomBar({
  stepIndex,
  previousStep,
  nextDisabled,
  previousDisabled = false,
  previousLabel = "Retour",
  nextLabel = "Etape suivante"
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
      <button type='submit' className='rounded-md bg-yellow-500 text-blue-900 border-yellow-500 px-4 py-2' disabled={nextDisabled}>
        <span>{nextLabel}</span>
      </button>
    </div>
  )
}

export default BottomBar