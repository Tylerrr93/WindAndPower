import { EventHandler } from "@wayward/game/event/EventManager";
import { EventBus } from "@wayward/game/event/EventBuses";
import Doodad from "@wayward/game/game/doodad/Doodad";
import WindAndPowerMod from "../Mod";

export default class WindmillManager {
   
    @EventHandler(EventBus.Doodads, "create")
    public addWindMillToSaveData(doodad: Doodad) {
        
        let islandId = doodad.islandId;
        let doodadReference = game.references.get(doodad);
        
        if (!WindAndPowerMod.WINDANDPOWERMOD.data.windmills[islandId]) {
            //If a key with the islandId doesnt exist, create it
            WindAndPowerMod.WINDANDPOWERMOD.data.windmills[islandId] = []
        }
        //Add the doodad reference to the island array that matches islandId
        WindAndPowerMod.WINDANDPOWERMOD.data.windmills[islandId].push(doodadReference);
    }



}