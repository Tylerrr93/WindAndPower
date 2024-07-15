import Register, { Registry } from "@wayward/game/mod/ModRegistry";
import { ItemType } from "@wayward/game/game/item/IItem";
import WindAndPowerMod from "../Mod";
import { WINDANDPOWER_NAME } from "../windsystem/IWindData";

export default class WAPWindmillItems {

    @Register.item("WoodenAxle", {
        use: [
            Registry<WindAndPowerMod>(WINDANDPOWER_NAME).get("actionPlaceWoodenAxle")
        ],
        durability: 50,
        weight: 1
    })
    public itemWoodenAxle: ItemType;

}