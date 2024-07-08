import { ActionArgument, ActionType } from "@wayward/game/game/entity/action/IAction";
import { Action } from "@wayward/game/game/entity/action/Action";
import { EntityType } from "@wayward/game/game/entity/IEntity";
//import WindAndPowerMod from "../Mod";
import { SkillType } from "@wayward/game/game/entity/IHuman";
//import { MessageType } from "@wayward/game/game/entity/player/IMessageManager";

export default new Action(ActionArgument.ItemInventory)
    .setUsableBy(EntityType.Human)
    .setCanUse((action, item) => {
        if (!item.description?.use?.includes(ActionType.Equip)) { //Needs updated to check wind logic
            return {
                usable: false,
            };
        }
        //If is anemometer
        return {
            usable: true,
        };
    })
    .setHandler((action, item) => {
        //let player = action.executor;
        //let windState = "calm" //WindAndPowerMod.WINDANDPOWERMOD.data.windState;
        //let windSpeed = 1 //WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed;
        let skillLevel = localPlayer.skill.get(SkillType.Tinkering);

        let advancedMessageChance = Math.min(1, skillLevel / 50);
        if (Math.random() < advancedMessageChance) {
            //Passes tinkering skillcheck to show direct wind value
            console.log("Advanced message filler");
            //player.messages.type(MessageType.Skill).send(WindAndPowerMod.WINDANDPOWERMOD.messages.MsgAnemometerCheckWindAdvanced, windState, windSpeed);
        } else {
            //Fails skillcheck
            console.log("Basic message filler");
            //player.messages.type(MessageType.Skill).send(WindAndPowerMod.WINDANDPOWERMOD.messages.MsgAnemometerCheckWind, windState);
        }
    })