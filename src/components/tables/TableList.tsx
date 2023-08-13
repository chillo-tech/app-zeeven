import React from 'react';
import {Table} from '@/types/Table';
import classNames from 'classnames';
import DeletetableItem from '../shared/DeletetableItem';
import { capitalize } from '@/utils';

type Props = {
	items: Table[]
	deleteItem?: any
};

function TableList({items, deleteItem}: Props) {

	return (
		<>
			{items
				.sort((a: Table, b: Table) => a.name.localeCompare(b.name))
				.map(
					(item, index) => (
						<DeletetableItem classes="border-b border-slate-100" data={item} showButton={item.deletable}
										 action={deleteItem} actionValue={item.publicId} key={`${item.publicId}-${index}`}>
							<article className={classNames("grid md:grid-cols-3 text-center text-gray-800")}>
								<span className='py-1 px-1'>{capitalize(item.type)}</span>
								<span className='py-1 px-1'>{item.name}</span>
								<span className='capitalize py-1'>{item.position}</span>
							</article>
						</DeletetableItem>
					))
			}
		</>
	)
}

export default TableList
