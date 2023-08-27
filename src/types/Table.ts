export interface Table {
	id?: string,
	publicId?: string,
	name: string,
	position?: string,
	type: string,
	description: string,
  number?: number;
	deletable?: boolean;
	active?: boolean
};
