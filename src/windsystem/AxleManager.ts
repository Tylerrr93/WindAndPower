import { EventBus } from "@wayward/game/event/EventBuses";
import { EventHandler } from "@wayward/game/event/EventManager";
import Doodad from "@wayward/game/game/doodad/Doodad";
import WindAndPowerMod from "../Mod";
import Island from "@wayward/game/game/island/Island";
import { IIslandTickOptions } from "@wayward/game/game/island/IIsland";
import Player from "@wayward/game/game/entity/player/Player";

export default class AxleManager {
    /**
     * Updates the axle variables for each axle on the island at the start of the island tick.
     * @param island - The island object.
     * @param options - The island tick options.
     */
    @EventHandler(EventBus.Island, "tickStart")
    public onTickStartUpdateAxleVariables(island: Island, options: IIslandTickOptions) {
        const axlesData = WindAndPowerMod.WINDANDPOWERMOD.data.axles;
        if (!axlesData) {
            return;
        }
        const islandId = island.id;

        // Check if the island has axle references
        if (axlesData[islandId]) {
            const axleReferences = axlesData[islandId];

            // Iterate through each axle reference
            for (const axleReference of axleReferences) {
                const axleDoodad = game.references.resolve(axleReference, island) as Doodad;

                // Logic to be run on each axle doodad registered on the ticking island
                if (axleDoodad) {
                    //Logic for axleDoodads
                    console.log(`Axle doodad updated at position (${axleDoodad.x}, ${axleDoodad.y})`);
                }
            }
        }
    }

    /**
     * Adds an axle to the save data when an axle doodad is created.
     * @param doodad - The doodad object.
     */
    @EventHandler(EventBus.Doodads, "create")
    public addAxleToSaveData(doodad: Doodad) {

        // Filter out non-axle doodads
        const validDoodads = [
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleHorizontal,
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleHorizontalPowered,
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleVertical,
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleVerticalPowered,
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenGearbox,
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenGearboxPowered
        ];

        if (!validDoodads.includes(doodad.type)) {
            return;
        }

        const islandId = doodad.islandId;
        const doodadReference = game.references.get(doodad);

        // Skip if the doodad reference is undefined
        if (!doodadReference) {
            return;
        }

        // Checks if data.axles[islandId] exists, if not, create it then push the doodad's reference
        const axle = WindAndPowerMod.WINDANDPOWERMOD.data.axles[islandId] ??= [];
        axle.push(doodadReference);

        console.log("Axle doodad reference is:" + doodadReference);
        console.log("Added axle to island, island axles: " + WindAndPowerMod.WINDANDPOWERMOD.data.axles[islandId]);
    }

    //Removes axles from save data when the player picks them up
    @EventHandler(EventBus.Players, "pickUpDoodad")
    public removeAxleFromSaveData(host: Player,doodad: Doodad) {
        // Filter out non-axle doodads
        const validDoodads = [
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleHorizontal,
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleHorizontalPowered,
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleVertical,
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleVerticalPowered,
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenGearbox,
            WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenGearboxPowered
        ];

        if (!validDoodads.includes(doodad.type)) {
            return;
        }

        const islandId = doodad.islandId;
        const axlesSaveData = WindAndPowerMod.WINDANDPOWERMOD.data.axles[islandId];

        // Return if there are no axles on the island
        if (!axlesSaveData) {
            return;
        }

        const doodadReference = game.references.get(doodad);
        const referenceToRemove = axlesSaveData.find(ref => ref[0] === doodadReference?.[0]); // [0] is the static id of the reference

        if (referenceToRemove) {
            const index = axlesSaveData.indexOf(referenceToRemove);
            axlesSaveData.splice(index, 1);
            console.log("Removing following axle reference:" + referenceToRemove);
            console.log("Removed axle from island, island axles: " + WindAndPowerMod.WINDANDPOWERMOD.data.axles[islandId]);
        }
    }

}
