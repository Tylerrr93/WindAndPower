import { EventHandler } from "@wayward/game/event/EventManager";
import { EventBus } from "@wayward/game/event/EventBuses";

export default class WindmillManager {
   
    @EventHandler(EventBus.Players, "tickEnd")
    public updateWindmillsPerTick () {
        
    }
    

}