export type Message =  {
  text: string,
  date?: string,
  time?: string,
  timezone?: string,
  informations?: { [key: string]: any },
  order: number,
  isSent?: boolean
 }

export type FormValues = {
  messages: Message[];
}

export type StyleParams = {
	name: string,
	value: string
}