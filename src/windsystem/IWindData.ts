import { ReferenceType } from "@wayward/game/game/reference/IReferenceManager";

export const WINDANDPOWER_NAME = "Wind And Power"

export interface IWindData {
    windSpeed: number;
    windState: string;
    windStateTimer: number;
}

export interface IWindmillData {
    reference: ReferenceType
}
