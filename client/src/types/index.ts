export type TSource = {
  created_at: string, // dateTime?
  deleted_at: string | null,
  encoding: string,
  environment: string,
  id: string,
  name: string,
  updated_at: string
}

export type TStatus = {
  [key: string] : number
}