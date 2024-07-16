import Mod from "@wayward/game/mod/Mod";
import { IWindData, WINDANDPOWER_NAME } from "./windsystem/IWindData";
import { EventHandler, eventManager } from "@wayward/game/event/EventManager";
import GameScreen from "@wayward/game/ui/screen/screens/GameScreen";
import { MessageType } from "@wayward/game/game/entity/player/IMessageManager";
import Message from "@wayward/game/language/dictionary/Message";
import Register from "@wayward/game/mod/ModRegistry";
import WindSystemManager from "./windsystem/WindSystemManager";
import WAPToolItemsRegistry from "./items/WAPToolItemsRegistry";
import AnemometerCheckWind from "./actions/AnemometerCheckWind";
import { ActionType } from "@wayward/game/game/entity/action/IAction";
import WAPMessagesRegistry from "./messages/WAPMessagesRegistry";
import WindmillManager from "./windsystem/WindmillManager";
import WAPWindmillItems from "./items/WAPWindmillItems";
import WAPWindmillDoodads from "./doodads/WAPWindmillDoodad";
import PlaceWoodenAxle from "./actions/PlaceWoodenAxle";
import AxleManager from "./windsystem/AxleManager";

export default class WindAndPowerMod extends Mod {

    @Mod.instance(WINDANDPOWER_NAME)
    public static readonly WINDANDPOWERMOD: WindAndPowerMod;

    //Save data for storing the worlds wind speed
    @Mod.saveData<WindAndPowerMod>()
    public data: IWindData

    //If the IWindData does not exist, initialize it on load
    public override initializeSaveData(data?: IWindData) {
        return data ?? {
            windSpeed: 0,
            windState: "calm",
            windStateTimer: 1,
            windmills: {},
            axles: {}
        };
    }

    //Load and unload the wind managers when the save is loaded and unloaded
    public readonly windManager = new WindSystemManager();
    public readonly windmillManager = new WindmillManager();
    public readonly axleManager = new AxleManager();
    public override onLoad(): void {
        eventManager.registerEventBusSubscriber(this.windManager);
        eventManager.registerEventBusSubscriber(this.windmillManager);
        eventManager.registerEventBusSubscriber(this.axleManager);
    }
    public override onUnload(): void {
        eventManager.deregisterEventBusSubscriber(this.windManager);
        eventManager.deregisterEventBusSubscriber(this.windmillManager);
        eventManager.deregisterEventBusSubscriber(this.axleManager);
    }

    //////////////
    //Registries
    //////////////

    //WAP Tool Items
    @Register.registry(WAPToolItemsRegistry)
    public readonly wapItemsTools: WAPToolItemsRegistry;

    //WAP Windmill doodads
    @Register.registry(WAPWindmillDoodads)
    public readonly wapDoodadsWindmill: WAPWindmillDoodads;

    //WAP Windmill items
    @Register.registry(WAPWindmillItems)
    public readonly wapItemsWindmill: WAPWindmillItems;

    //Messages
    @Register.registry(WAPMessagesRegistry)
    public readonly messages: WAPMessagesRegistry;

    ///////////
    //Actions
    ///////////
    
    @Register.action("AnemometerCheckWind", AnemometerCheckWind)
    public readonly actionAnemometerCheckWind: ActionType;

    @Register.action("PlaceWoodenAxle", PlaceWoodenAxle)
    public readonly actionPlaceWoodenAxle: ActionType;

    //////////////////
    //Debug Messages
    //////////////////
    @Register.message("MsgDebugOne")
	public readonly MsgDebugOne: Message;

	@EventHandler(GameScreen, "show")
	public onGameScreenVisible() {
        let windSpeed = this.data.windSpeed;
		localPlayer.messages.type(MessageType.Good).send(this.MsgDebugOne, windSpeed);
	}

}  

