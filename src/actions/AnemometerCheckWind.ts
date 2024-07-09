import { ActionArgument, ActionType } from "@wayward/game/game/entity/action/IAction";
import { Action } from "@wayward/game/game/entity/action/Action";
import { EntityType } from "@wayward/game/game/entity/IEntity";
import WindAndPowerMod from "../Mod";
import { SkillType } from "@wayward/game/game/entity/IHuman";
import { MessageType } from "@wayward/game/game/entity/player/IMessageManager";

export default new Action(ActionArgument.ItemInventory)
    .setUsableBy(EntityType.Human)
    .setCanUse((action, item) => {
        let player = action.executor;
        if (player.z === 0) {
            player.messages.type(MessageType.Skill).send(WindAndPowerMod.WINDANDPOWERMOD.messages.MsgCantCheckInCave);
            return {
                usable: false
            };
        } else {
            return {
                usable: true
            };
        }
    })
    .setHandler((action, item) => {
        let player = action.executor;
        let skillLevel = localPlayer.skill.get(SkillType.Tinkering);

        let windState = WindAndPowerMod.WINDANDPOWERMOD.data.windState;
        let windSpeed = WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed;
        let windStateTimer = WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer;
        let timerDescription = "Null";

        if (windStateTimer <= 5) {
            timerDescription = "You predict that the air pressure and wind may change very soon.";
        } else if (windStateTimer <= 15) {
            timerDescription = "You predict that the wind will remain about the same for a bit.";
        } else {
            timerDescription = "You don't think the wind will be changing much for a good while.";
        }

        //Guarantee adv msg at tinkering 100, master msg at tinkering 200
        let advancedMessageChance = Math.min(1, skillLevel / 100);
        let expertMessageChance = Math.min(1, (skillLevel - 100) / 100);

        if (Math.random() < expertMessageChance) {
            console.log("Expert message filler");
            player.messages.type(MessageType.Skill).send(WindAndPowerMod.WINDANDPOWERMOD.messages.MsgAnemometerCheckWindMaster, windState, windSpeed, timerDescription);
        } else if (Math.random() < advancedMessageChance) {
            console.log("Advanced message filler");
            player.messages.type(MessageType.Skill).send(WindAndPowerMod.WINDANDPOWERMOD.messages.MsgAnemometerCheckWindAdvanced, windState, windSpeed);
        } else {
            console.log("Basic message filler");
            player.messages.type(MessageType.Skill).send(WindAndPowerMod.WINDANDPOWERMOD.messages.MsgAnemometerCheckWind, windState);
        }

        item.damage(ActionType[action.type]);

    })