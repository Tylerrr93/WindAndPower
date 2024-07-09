import Mod from "@wayward/game/mod/Mod";
import { EventHandler } from "@wayward/game/event/EventManager";
import { EventBus } from "@wayward/game/event/EventBuses";
import { WINDANDPOWER_NAME } from "./IWindData";
import WindAndPowerMod from "../Mod";

export default class WindSystemManager {

    @Mod.instance(WINDANDPOWER_NAME)
    public static readonly WINDANDPOWERMOD: WindAndPowerMod;

    //How often in ticks the wind speed will update
    private static readonly TICK_INTERVAL = 5;

    //Wind speed ranges by state
    private static readonly CALM_RANGE = { min: 0, max: 1 };
    private static readonly AVERAGE_RANGE = { min: 2, max: 5 };
    private static readonly HIGH_RANGE = { min: 6, max: 8 };
    private static readonly EXTREME_RANGE = { min: 9, max: 10 };

    //Amount of wind updates each type of wind speed can last
    private static readonly MIN_CALM_TIMER = 5;
    private static readonly MAX_CALM_TIMER = 15;
    private static readonly MIN_AVERAGE_TIMER = 5;
    private static readonly MAX_AVERAGE_TIMER = 15;
    private static readonly MIN_HIGH_TIMER = 5;
    private static readonly MAX_HIGH_TIMER = 15;
    private static readonly MIN_EXTREME_TIMER = 5;
    private static readonly MAX_EXTREME_TIMER = 15;

    //Chances should add up to 1, remainder is chance for extreme weather
    private static readonly CALM_PROBABILITY = 0.12;
    private static readonly AVERAGE_PROBABILITY = 0.8;
    private static readonly HIGH_PROBABILITY = 0.07;

    //Updater for wind speeds and states
    @EventHandler(EventBus.Players, "tickStart")
    public checkForWindUpdates() {
        const currentTick = game.time.ticks;

        if (currentTick % WindSystemManager.TICK_INTERVAL === 0) {
            this.updateWindState();
            this.updateWindSpeed();
        }
    }

    /**
     * Updates the wind state based on the wind state timer and probabilities.
     * When the wind state timer reaches 0, a new wind state is randomly determined based on the probabilities.
     * The wind state timer is then reset based on the new wind state.
     * The wind speed is also updated based on the new wind state.
     */
    private updateWindState() {
        if (WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer === 0) {
            const randomValue = Math.random();
            if (randomValue < WindSystemManager.CALM_PROBABILITY) {
                WindAndPowerMod.WINDANDPOWERMOD.data.windState = "calm";
            } else if (randomValue < WindSystemManager.CALM_PROBABILITY + WindSystemManager.AVERAGE_PROBABILITY) {
                WindAndPowerMod.WINDANDPOWERMOD.data.windState = "average";
            } else if (randomValue < WindSystemManager.CALM_PROBABILITY + WindSystemManager.AVERAGE_PROBABILITY + WindSystemManager.HIGH_PROBABILITY) {
                WindAndPowerMod.WINDANDPOWERMOD.data.windState = "high";
            } else {
                WindAndPowerMod.WINDANDPOWERMOD.data.windState = "extreme";
            }

            this.setWindStateTimer(WindAndPowerMod.WINDANDPOWERMOD.data.windState);
            this.updateWindSpeed();
        }

        WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer--;
    }

    /**
     * Sets the wind state timer based on the current wind state.
     * The timer is a random value within a predefined range for each wind state.
     * @param {string} windState - The current wind state ("calm", "average", "high", or "extreme").
     */
    private setWindStateTimer(windState: string) {
        switch (windState) {
            case "calm":
                WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer = Math.floor(Math.random() * (WindSystemManager.MAX_CALM_TIMER - WindSystemManager.MIN_CALM_TIMER + 1)) + WindSystemManager.MIN_CALM_TIMER;
                break;
            case "average":
                WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer = Math.floor(Math.random() * (WindSystemManager.MAX_AVERAGE_TIMER - WindSystemManager.MIN_AVERAGE_TIMER + 1)) + WindSystemManager.MIN_AVERAGE_TIMER;
                break;
            case "high":
                WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer = Math.floor(Math.random() * (WindSystemManager.MAX_HIGH_TIMER - WindSystemManager.MIN_HIGH_TIMER + 1)) + WindSystemManager.MIN_HIGH_TIMER;
                break;
            case "extreme":
                WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer = Math.floor(Math.random() * (WindSystemManager.MAX_EXTREME_TIMER - WindSystemManager.MIN_EXTREME_TIMER + 1)) + WindSystemManager.MIN_EXTREME_TIMER;
                break;
        }
    }

    /**
     * Updates the wind speed based on the current wind state.
     * The wind speed is a random value within a predefined range for each wind state.
     */
    private updateWindSpeed() {
        switch (WindAndPowerMod.WINDANDPOWERMOD.data.windState) {
            case "calm":
                WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed = Math.floor(Math.random() * (WindSystemManager.CALM_RANGE.max - WindSystemManager.CALM_RANGE.min + 1)) + WindSystemManager.CALM_RANGE.min;
                break;
            case "average":
                WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed = Math.floor(Math.random() * (WindSystemManager.AVERAGE_RANGE.max - WindSystemManager.AVERAGE_RANGE.min + 1)) + WindSystemManager.AVERAGE_RANGE.min;
                break;
            case "high":
                WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed = Math.floor(Math.random() * (WindSystemManager.HIGH_RANGE.max - WindSystemManager.HIGH_RANGE.min + 1)) + WindSystemManager.HIGH_RANGE.min;
                break;
            case "extreme":
                WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed = Math.floor(Math.random() * (WindSystemManager.EXTREME_RANGE.max - WindSystemManager.EXTREME_RANGE.min + 1)) + WindSystemManager.EXTREME_RANGE.min;
                break;
        }

        console.log(`Wind speed has been updated!`)
        console.log(`Wind state: ${WindAndPowerMod.WINDANDPOWERMOD.data.windState}, Wind speed: ${WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed}, Wind state timer: ${WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer}`);

    }



}