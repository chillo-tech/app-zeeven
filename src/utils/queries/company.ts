export const COMPANY_QUERY = `
  query {
    company {
      id
      name
      abstract
      menus.id
      menus.label
    }[]
  }
`
export interface CompanyQuery {
  company: {
    id: string
  }
}