import { Bike } from "./Bike"

export interface Profile {
  id: number
  firstname: string
  lastname: string
  city: string
  country: null
  bikes: Bike[]
  created_at: string
  profile: string
}