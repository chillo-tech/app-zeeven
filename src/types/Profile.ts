export interface Profile {
	id?: string,
	publicId?: string,
	civility?: string,
	firstName: string,
	partner?: string,
	lastName: string,
	email: string,
	phone: string,
	phoneIndex: string,
	sendInvitation?: boolean
  others?: any
};
