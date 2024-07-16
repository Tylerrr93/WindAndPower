import { Reference, ReferenceType } from "@wayward/game/game/reference/IReferenceManager";
import { IslandId } from "@wayward/game/game/island/IIsland";

export const WINDANDPOWER_NAME = "Wind And Power"

export interface IWindData {
    windSpeed: number;
    windState: string;
    windStateTimer: number;
    windmills: PartialRecord<IslandId, Reference<ReferenceType.Doodad>[]>;
    axles: PartialRecord<IslandId, Reference<ReferenceType.Doodad>[]>;
}
