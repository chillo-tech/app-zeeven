export interface ISondage {
  id: number
  status: string
  sort: any
  user_created: string
  date_created: string
  user_updated: string
  date_updated: string
  label: string
  type: string
  abstract: string
  company: ICompany
  startDate: any
  endDate: any
  slug: string
  answer_sheets: any[]
  questions: IQuestion[]
}

export interface IQuestion {
  id: number
  status: string
  sort: any
  user_created: string
  date_created: string
  user_updated: string
  date_updated: string
  label: string
  description: any
  isRequired?: boolean
  sector: string
  type?: string
  survey: number
  choices: {
    choice_id: IChoice
  }[]
}

export interface IChoice {
  id: number
  status: string
  sort: any
  user_created: string
  date_created: string
  user_updated?: string
  date_updated?: string
  titled: string
  value: string
}


export interface ICompany {
  id: number
  status: string
  sort: any
  user_created: string
  date_created: string
  user_updated: any
  date_updated: any
  name: string
  abstract: any
  sector: string
  label: any
  desccription: any
  type: any
  email: any
  phone: any
  contactPosition: any
  menus: any[]
  survey: number[]
  addresses: any[]
}


