import { ActionArgument } from "@wayward/game/game/entity/action/IAction";
import { Action } from "@wayward/game/game/entity/action/Action";
import { EntityType } from "@wayward/game/game/entity/IEntity";
import WindAndPowerMod from "../Mod";
import { RenderSource } from "@wayward/game/renderer/IRenderer";
import { Direction } from "@wayward/game/utilities/math/Direction";
import Tile from "@wayward/game/game/tile/Tile";



export default new Action(ActionArgument.ItemInventory)
    .setUsableBy(EntityType.Human)
    .setCanUse((action, item) => {
        
        if (item.type !== WindAndPowerMod.WINDANDPOWERMOD.wapItemsWindmill.itemWoodenAxle) {
            return {
                usable: false
            };
        }
        let playerFacingTile = action.executor.facingTile;
        if (playerFacingTile.doodad !== undefined) {
            return {
                usable: false
            };
        }
        return {
            usable: true
        };

    })
    .setHandler((action, item) => {
            let player = action.executor;
            let playerFacingTile = action.executor.facingTile;

            const validDoodads = [
                WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenWindmill,
                WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleVertical,
                WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleVerticalPowered,
                WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleHorizontal,
                WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleHorizontalPowered,
                WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenGearbox,
                WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenGearboxPowered
            ];

            function checkTileForValidDoodad(tile: Tile | undefined): boolean {
                if (tile && tile.doodad) {
                    return validDoodads.includes(tile.doodad.type)
                }
                return false
            }
            
            function updateDoodad(tile: Tile | undefined) {
                if (!tile || !tile.doodad) return;

                let northTile = tile.getTileInDirection(Direction.North);
                let southTile = tile.getTileInDirection(Direction.South);
                let eastTile = tile.getTileInDirection(Direction.East);
                let westTile = tile.getTileInDirection(Direction.West);

                let hasNorthSouthDoodad = checkTileForValidDoodad(northTile) || checkTileForValidDoodad(southTile);
                let hasEastWestDoodad = checkTileForValidDoodad(eastTile) || checkTileForValidDoodad(westTile);

                let newDoodadType;
                if (hasNorthSouthDoodad && hasEastWestDoodad) {
                    newDoodadType = WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenGearbox;
                } else if (hasNorthSouthDoodad) {
                    newDoodadType = WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleVertical;
                } else if (hasEastWestDoodad) {
                    newDoodadType = WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleHorizontal;
                } else {
                    return; // No change needed
                }

                if (tile.doodad.type !== newDoodadType) {
                    player.island.doodads.remove(tile.doodad);
                    player.island.doodads.create(newDoodadType, tile, {}, player);
                }
            }
            
            let northTile = playerFacingTile.getTileInDirection(Direction.North);
            let southTile = playerFacingTile.getTileInDirection(Direction.South);
            let eastTile = playerFacingTile.getTileInDirection(Direction.East);
            let westTile = playerFacingTile.getTileInDirection(Direction.West);

            let hasNorthSouthDoodad = checkTileForValidDoodad(northTile) || checkTileForValidDoodad(southTile);
            let hasEastWestDoodad = checkTileForValidDoodad(eastTile) || checkTileForValidDoodad(westTile);

            let doodadToPlace;
            if (hasNorthSouthDoodad && hasEastWestDoodad) {
                doodadToPlace = WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenGearbox;
            } else if (hasNorthSouthDoodad) {
                doodadToPlace = WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleVertical;
            } else if (hasEastWestDoodad) {
                doodadToPlace = WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleHorizontal;
            } else {
                doodadToPlace = WindAndPowerMod.WINDANDPOWERMOD.wapDoodadsWindmill.doodadWoodenAxleHorizontal;
            }

            player.island.doodads.create(doodadToPlace, playerFacingTile, {}, player);

            // Update surrounding doodads
            updateDoodad(northTile);
            updateDoodad(southTile);
            updateDoodad(eastTile);
            updateDoodad(westTile);

            player.island.items.remove(item); 

            renderers.updateView(undefined, RenderSource.Mod, true);

            player.passTurn();
    })