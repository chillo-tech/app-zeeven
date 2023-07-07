import React, {useState} from 'react';
import classNames from 'classnames';
import {RiDeleteBin6Line} from 'react-icons/ri';
import formStyles from '@/styles/Form.module.css';

type Props = {
	children: any,
	data?: any,
	odd?: 0,
	action?: (actionValue?: any) => any,
	actionValue?: any,
	classes?: string
};

function DeletetableItem({children, classes, action, actionValue}: Props) {
	const [deleteBlock, toggleDeleteBlock] = useState(false);
	const handleDelete = () => {
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
				<button type='button' className={classNames('flex-none px-6 py-4', {'bg-slate-200': deleteBlock})}
						onClick={() => toggleDeleteBlock(!deleteBlock)}>
					<RiDeleteBin6Line className='text-red-600 text-lg'/>
				</button>
			</div>
			{
				deleteBlock ? (
					<div className={classNames("flex w-full justify-end bg-slate-200 items-center py-3 px-2")}>
						<span className="mr-2">Confirmez vous cette action ? </span>
						<button type='button' className={formStyles.outline__button__black}
								onClick={() => toggleDeleteBlock(!deleteBlock)}>
							Annuler
						</button>
						<button type='button' className={formStyles.button__red} onClick={handleDelete}>
							Supprimer
						</button>
					</div>
				) : false
			}


		</>

	);
}

export default DeletetableItem;
