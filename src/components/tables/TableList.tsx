import React from 'react';
import {Table} from '@/types/Table';
import classNames from 'classnames';
import DeletetableItem from '../shared/DeletetableItem';

type Props = {
	tables: Table[]
	deleteTable?: any
};

function tableList({tables, deleteTable}: Props) {

	return (
		<>
			{tables
				.sort((a: Table, b: Table) => a.name.localeCompare(b.name))
				.map(
					(tables, index) => (
						<DeletetableItem classes="border-b border-slate-100" data={tables}
										 action={deleteTable} actionValue={tables.publicId} key={`${tables.id}-${index}`}>
							<article className={classNames("grid md:grid-cols-5 text-gray-800")}>
								<span className='py-1 capitalize px-1'>{tables.name}</span>
								<span className='capitalize py-1'>{tables.description}</span>
								<span className='uppercase font-bold py-1'>
									{tables.typeTable}
								</span>
								<span className='py-1'>
								{tables.position}
							</span>
								<span className='py-1'>
								({tables.places}) 
							</span>
							</article>
						</DeletetableItem>
					))
			}
		</>
	)
}

export default tableList
