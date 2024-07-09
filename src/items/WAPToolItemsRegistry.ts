import Register, { Registry } from "@wayward/game/mod/ModRegistry";
import { EquipType, SkillType } from "@wayward/game/game/entity/IHuman";
import { ItemType, ItemTypeGroup, RecipeLevel } from "@wayward/game/game/item/IItem";
import { DamageType } from "@wayward/game/game/entity/IEntity";
import { RecipeComponent } from "@wayward/game/game/item/ItemDescriptions";
import { Deity } from "@wayward/game/game/deity/Deity";
import { BiomeType } from "@wayward/game/game/biome/IBiome";
import WindAndPowerMod from "../Mod";
import { WINDANDPOWER_NAME } from "../windsystem/IWindData";

export default class WAPToolItemsRegistry {

    @Register.item("Anemometer", {
        durability: 50,
        equip: EquipType.Held,
        attack: 1,
        damageType: DamageType.Blunt,
        use: [Registry<WindAndPowerMod>(WINDANDPOWER_NAME).get("actionAnemometerCheckWind")],
        recipe: {
            components: [
                RecipeComponent(ItemType.WoodenPole, 1, 1, 1),
                RecipeComponent(ItemType.String, 2, 2, 1),
                RecipeComponent(ItemType.Feather, 9, 9, 5),
                RecipeComponent(ItemTypeGroup.Rock, 1, 1, 1),
                RecipeComponent(ItemTypeGroup.Hammer, 1, 0, 0)
            ],
            skill: SkillType.Tinkering,
            level: RecipeLevel.Intermediate,
            runeChance: [Deity.All, 0.075]
        },
        storeDisassemblyItems: true,
        flammable: true,
        worth: 20,
        spawnOnMerchant: [BiomeType.Random],
        group: [ItemTypeGroup.Tool]
    })
    public itemAnemometer: ItemType; 

}