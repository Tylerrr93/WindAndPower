import { EventHandler } from "@wayward/game/event/EventManager";
import { EventBus } from "@wayward/game/event/EventBuses";
import Island from "@wayward/game/game/island/Island";

export default class WindmillManager {
   
    @EventHandler(EventBus.Island, "tickEnd")
    public updateWindmillsPerTick (island: Island) {

        }

}