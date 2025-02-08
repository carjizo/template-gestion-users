import { Activity } from "./Activity"

export interface ResponseActivity{
    isSucces:boolean,
    response: Array<Activity>
    message:string
}