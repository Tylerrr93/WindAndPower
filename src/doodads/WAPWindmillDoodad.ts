import Register, { Registry } from "@wayward/game/mod/ModRegistry";
import { DoodadType } from "@wayward/game/game/doodad/IDoodad";
import WindAndPowerMod from "../Mod";
import { WINDANDPOWER_NAME } from "../windsystem/IWindData";



export default class WAPWindmillDoodads {

    @Register.doodad("WoodenWindmill", {
        canBreak: true,
        isTall: true, //Needed for 32 pixel height
        isAnimated: {
            frameOffsetX: {
                0: 0,
                //Frame 1, 16 pixels x-offset
                1:16,
                2:32
            }
        },
        
    })
    public doodadWoodenWindmill: DoodadType;



    @Register.doodad("WoodenGearbox", {
        canBreak: true,
        isAnimated: false,
        pickUp: [Registry<WindAndPowerMod>(WINDANDPOWER_NAME).registry("wapItemsWindmill").get("itemWoodenAxle")]
    })
    public doodadWoodenGearbox: DoodadType;

    @Register.doodad("WoodenGearboxPowered", {
        canBreak: true,
        isAnimated: true,
        pickUp: [Registry<WindAndPowerMod>(WINDANDPOWER_NAME).registry("wapItemsWindmill").get("itemWoodenAxle")]
    })
    public doodadWoodenGearboxPowered: DoodadType;



    @Register.doodad("WoodenAxleHorizontal", {
        canBreak: true,
        isAnimated: false,
        pickUp: [Registry<WindAndPowerMod>(WINDANDPOWER_NAME).registry("wapItemsWindmill").get("itemWoodenAxle")]
    })
    public doodadWoodenAxleHorizontal: DoodadType;

    @Register.doodad("WoodenAxleHorizontalPowered", {
        canBreak: true,
        isAnimated: true,
        pickUp: [Registry<WindAndPowerMod>(WINDANDPOWER_NAME).registry("wapItemsWindmill").get("itemWoodenAxle")]
    })
    public doodadWoodenAxleHorizontalPowered: DoodadType;



    @Register.doodad("WoodenAxleVertical", {
        canBreak: true,
        isAnimated: false,
        pickUp: [Registry<WindAndPowerMod>(WINDANDPOWER_NAME).registry("wapItemsWindmill").get("itemWoodenAxle")]
    })
    public doodadWoodenAxleVertical: DoodadType;

    @Register.doodad("WoodenAxleVerticalPowered", {
        canBreak: true,
        isAnimated: true,
        pickUp: [Registry<WindAndPowerMod>(WINDANDPOWER_NAME).registry("wapItemsWindmill").get("itemWoodenAxle")]
    })
    public doodadWoodenAxleVerticalPowered: DoodadType;

}