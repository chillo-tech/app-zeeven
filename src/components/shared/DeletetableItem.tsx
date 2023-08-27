import React, {useState} from 'react';
import classNames from 'classnames';
import {RiDeleteBin6Line, RiStopCircleFill} from 'react-icons/ri';
import formStyles from '@/styles/Form.module.css';

type Props = {
	children: any,
	data?: any,
	odd?: 0,
	action?: (actionValue?: any) => any,
	actionValue?: any,
	classes?: string,
	showButton?: boolean
  
};

function DeletetableItem({children, classes, action, actionValue, showButton = true}: Props) {
	const [deleteBlock, toggleDeleteBlock] = useState(false);
	const handleDelete = (event: any) => {
    event.stopPropagation();
		toggleDeleteBlock(false);
		if (action) {
			action(actionValue);
		}
	}
	return (
		<>
			<div className={classNames('flex w-full items-center', classes)}>
				<div className={classNames('grow')}>
					{children}
				</div>
        {
          showButton ? (
            <button type='button' className={classNames('flex-none px-6 py-4', {'bg-slate-300': deleteBlock})}
                onClick={() => toggleDeleteBlock(!deleteBlock)}>
              <RiDeleteBin6Line className='text-red-600 text-lg'/>
            </button>
          ): (
            <span className="px-6 py-4">
              <RiStopCircleFill className='text-gray-600 text-lg'/>
            </span>
          )
        }
			</div>
			{
				deleteBlock ? (
					<div className={classNames("flex flex-col md:flex-row w-full justify-end bg-slate-300 items-center py-3 px-2")}>
						<span className="mr-2">Confirmez vous cette action ? </span>
            <div>
						<button type='button' className={formStyles.outline__button__black}
								onClick={(event) => {event.stopPropagation(); toggleDeleteBlock(!deleteBlock)}}>
							Annuler
						</button>
						<button type='button' className={formStyles.button__red} onClick={handleDelete}>
							Supprimer
						</button>
            </div>
					</div>
				) : false
			}


		</>

	);
}

export default DeletetableItem;
