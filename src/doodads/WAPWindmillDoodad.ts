import Register from "@wayward/game/mod/ModRegistry";
import { DoodadType } from "@wayward/game/game/doodad/IDoodad";
export default class WAPWindmillDoodad {

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
        isAnimated: true
    })

    @Register.doodad("WoodenAxleHorizontalPowered", {
        canBreak: true,
        isAnimated: true
    })
    public doodadWoodenAxleHorizontalPowered: DoodadType;

    @Register.doodad("WoodenAxleVerticalPowered", {
        canBreak: true,
        isAnimated: true
    })
    public doodadWoodenAxleVerticalPowered: DoodadType;

}