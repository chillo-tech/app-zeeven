import { Profile } from "./Profile"

export interface Guest extends Profile{
  sendNotification: boolean
}