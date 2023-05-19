export interface Profile {
	id?: string,
	publicId?: string,
	civility?: string,
	firstName: string,
	lastName: string,
	email: string,
	phone: string,
	phoneIndex: string,
	sendInvitation?: boolean
};
