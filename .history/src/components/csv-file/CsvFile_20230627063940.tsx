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
				if(result) {
					const guests = result.split("\n")
						.slice(1)
						.filter((line: string) => line.split(",").length === 6)
						.map((line: string) =>  {
							const values = line.split(",");
							return {
								civility: values[0].replaceAll('"', ''),
								firstName: values[1].replaceAll('"', ''),
								lastName: values[2].replaceAll('"', ''),
								phoneIndex: values[3].replaceAll('"', ''),
								phone: values[4].replaceAll('"', ''),
								email: values[5].replaceAll('"', ''),
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
				<span className="text-xs">Votre fichier doit avoir les colonnes</span>
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
