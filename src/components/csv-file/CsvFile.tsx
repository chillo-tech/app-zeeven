import { slugify } from '@/utils';
import React, {useRef, useState} from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai';
function CsvFile({display, setContacts}: any) {
	const fieldRef = useRef<HTMLInputElement>(null);

	const [fileList, setFileList] = useState([]);

	const onDragEnter = () => fieldRef.current ?fieldRef.current.classList.add('bg-blue-100'): null;
	const onDragLeave =  () => fieldRef.current ?fieldRef.current.classList.remove('bg-blue-100'): null;
	const onDrop =  () => fieldRef.current ?fieldRef.current.classList.remove('bg-blue-100'): null;

	const handleFileUpload = (event: any) => {
		const newFile = event.target.files[0];

		if (newFile) {
			const updatedList: any = [...fileList, newFile];
			setFileList(updatedList);
			const reader = new FileReader();
			reader.readAsText(event.target.files[0]);
			reader.onload = () => {
				const result = reader.result as string ;
        const resultsAsTable = result.split("\n");
        const columns = resultsAsTable[0];
        let separator = ",";
        if (columns.includes(";")) {
          separator = ";";
        }
        const columnsPositions = columns.split(separator);
        const [,,,,,, ...othersColumns] = columnsPositions;
				if(result) {
					const guests = resultsAsTable
						.slice(1)
						.filter((line: string) => line.split(separator).length === columnsPositions.length)
						.map((line: string) =>  {
              const [civility,firstName,lastName,phoneIndex,phone,email, ...othersData] = line.split(separator);
              const others = othersData.map((entry: any, index: number) => ({key: slugify(othersColumns[index]).split('-').join(''), label: othersColumns[index].trim(), value: entry}));
              return {
								civility,
                firstName,
                lastName,
                phoneIndex,
                phone,
                email, 
                others
							}
					})
					setContacts(guests);
				}
			}

			//props.onFileChange(updatedList);
		}

	}
	return (
		<form className="box" method="post" action="" encType="multipart/form-data">
			<p className="flex items-center justify-end py-3">
				<button
					onClick={() => display("OPTIONS")}
					className="relative text-app-blue text-md font-semibold flex hover:bg-gray-50 rounded-lg items-center">
					Changer
				</button>
			</p>
			<div ref={fieldRef}
					 onDragEnter={onDragEnter}
					 onDragLeave={onDragLeave}
					 onDrop={onDrop}
				   className="relative rounded-lg h-60 text-md border border-gray-10 rounded-lg p-4  items-center flex items-center justify-center border-dashed border-2 flex flex-col bg-gray-100" id="contacts-file">
				<AiOutlineCloudUpload className="text-4xl text-blue-500" />
				<span>Déposez votre fichier <span className="font-bold">csv</span> ici</span>
				<span className="py-2">OU</span>
				<span className="rounded-lg bg-blue-400 text-white px-3 py-2 shadow-md mb-2">Sélectionnez un fichier</span>
				<span className="text-xs">Votre fichier doit avoir à minima les colonnes</span>
				<span className="text-xs">(civilite,prenom,nom,indicatif,telephone,email)</span>
				<input className="absolute left-0 top-0 right-0 bottom-0 w-full h-full opacity-0"
					   id="contacts-file"
					   type="file"
					   value=""
					   accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
					   onChange={handleFileUpload}
				/>
			</div>
		</form>
	);
}

export default CsvFile;
