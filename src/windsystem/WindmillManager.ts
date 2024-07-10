/**
 * WindmillManager class handles the management of windmills in the game.
 * It updates the windmill variables, adds and removes windmills from the save data.
 */
import { EventHandler } from "@wayward/game/event/EventManager";
import { EventBus } from "@wayward/game/event/EventBuses";
import Doodad from "@wayward/game/game/doodad/Doodad";
import WindAndPowerMod from "../Mod";
import Island from "@wayward/game/game/island/Island";
import { IIslandTickOptions } from "@wayward/game/game/island/IIsland";

export default class WindmillManager {
    /**
     * Updates the windmill variables for each windmill on the island at the start of the island tick.
     * @param island - The island object.
     * @param options - The island tick options.
     */
    @EventHandler(EventBus.Island, "tickStart")
    public onTickEndUpdateWindmillVariables(island: Island, options: IIslandTickOptions) {
        const windSpeed = WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed;
        const windmillsData = WindAndPowerMod.WINDANDPOWERMOD.data.windmills;
        const islandId = island.id;

        // Check if the island has windmill references
        if (windmillsData[islandId]) {
            const windmillReferences = windmillsData[islandId];

            // Iterate through each windmill reference
            for (const windmillReference of windmillReferences) {
                const windmillDoodad = game.references.resolve(windmillReference, island) as Doodad;

                // Logic to be run on each windmill doodad registered on the ticking island
                if (windmillDoodad) {
                    const windmillPower = windSpeed * 10;
                    windmillDoodad.setData("windmillPower", windmillPower);
                    console.log(`Windmill doodad updated at position (${windmillDoodad.x}, ${windmillDoodad.y})`);
                }
            }
        }
    }

    /**
     * Adds a windmill to the save data when a windmill doodad is created.
     * @param doodad - The doodad object.
     */
    @EventHandler(EventBus.Doodads, "create")
    public addWindmillToSaveData(doodad: Doodad) {
        // Filter out non-windmill doodads
        if (doodad.type !== WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenWindmill) {
            return;
        }

        const islandId = doodad.islandId;
        const doodadReference = game.references.get(doodad);

        // Skip if the doodad reference is undefined
        if (!doodadReference) {
            return;
        }

        // Checks if data.windmills[islandId] exists, if not, create it then push the doodad's reference
        const windmill = WindAndPowerMod.WINDANDPOWERMOD.data.windmills[islandId] ??= [];
        windmill.push(doodadReference);

        console.log("Windmill doodad reference is:" + doodadReference);
        console.log("Added windmill to island, island windmills: " + WindAndPowerMod.WINDANDPOWERMOD.data.windmills[islandId]);
    }

    /**
     * Removes a windmill from the save data when a windmill doodad is removed.
     * @param doodad - The doodad object.
     */
    @EventHandler(EventBus.Doodads, "removed")
    public removeWindmillFromSaveData(doodad: Doodad) {
        // Filter out non-windmill doodads
        if (doodad.type !== WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenWindmill) {
            return;
        }

        const islandId = doodad.islandId;
        const windmillsSaveData = WindAndPowerMod.WINDANDPOWERMOD.data.windmills[islandId];

        // Return if there are no windmills on the island
        if (!windmillsSaveData) {
            return;
        }

        const doodadReference = game.references.get(doodad);
        const referenceToRemove = windmillsSaveData.find(ref => ref[0] === doodadReference?.[0]); // [0] is the static id of the reference

        if (referenceToRemove) {
            const index = windmillsSaveData.indexOf(referenceToRemove);
            windmillsSaveData.splice(index, 1);
            console.log("Removing following windmill reference:" + referenceToRemove);
            console.log("Removed windmill from island, island windmills: " + WindAndPowerMod.WINDANDPOWERMOD.data.windmills[islandId]);
        }
    }
}