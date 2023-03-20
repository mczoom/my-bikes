import { Bike } from "./Bike";

export interface UserBike extends Bike {
    brand?: string
    model?: string
    weight?: number
    year?: number
}