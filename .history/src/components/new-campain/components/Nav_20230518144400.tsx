import Link from 'next/link';
import React, {useContext} from 'react'
import {NewCampainContext} from '@/context/NewCampainContext';

function Nav() {
	const {state: {nbSteps, stepIndex}} = useContext(NewCampainContext);
	return (
      <header className='bg-white'>
        <nav>
          <ul className={`grid grid-flow-col grid-cols-${nbSteps}`}>
            {
              Array.from(Array(nbSteps).keys())
                .map((key, index) =>
                  <li className={`h-2 ${stepIndex >= index ? 'bg-yellow-400' : 'bg-white'}`}
                    key={index}></li>
                )
            }
          </ul>
        </nav>
      </header>
	)
}

export default Nav
