import Mod from "@wayward/game/mod/Mod";
import { IWindData, WINDANDPOWER_NAME } from "./IWindData";
import { EventHandler, eventManager } from "@wayward/game/event/EventManager";
import GameScreen from "@wayward/game/ui/screen/screens/GameScreen";
import { MessageType } from "@wayward/game/game/entity/player/IMessageManager";
import Message from "@wayward/game/language/dictionary/Message";
import Register from "@wayward/game/mod/ModRegistry";
import WindSystemManager from "./WindSystemManager";

export default class WindAndPowerMod extends Mod {

    //Save data for storing the worlds wind speed
    @Mod.saveData<WindAndPowerMod>()
    public data: IWindData

    //If the IWindData does not exist, initialize it on load
    public override initializeSaveData(data?: IWindData) {
        return data ?? {
            windSpeed: 0,
            windState: "calm",
            windStateTimer: 10
        };
    }

    @Mod.instance(WINDANDPOWER_NAME)
    public static readonly WINDANDPOWERMOD: WindAndPowerMod;

    //Declare the WindSystemManager and make sure to register and unregister it on game start and close
    public readonly windManager = new WindSystemManager();
    public override onLoad(): void {
        eventManager.registerEventBusSubscriber(this.windManager);
    }
    public override onUnload(): void {
        eventManager.deregisterEventBusSubscriber(this.windManager);
    }

    /////////// 
    //Messages

    @Register.message("MsgDebugOne")
	public readonly MsgDebugOne: Message;

    @Register.message("MsgDebugTwo") 
    public readonly MsgDebugTwo: Message;

    //Debug messages
	@EventHandler(GameScreen, "show")
	public onGameScreenVisible() {
        let windSpeed = this.data.windSpeed;
		localPlayer.messages.type(MessageType.Good).send(this.MsgDebugOne);
        localPlayer.messages.type(MessageType.Good).send(this.MsgDebugTwo, windSpeed);
	}

} 

