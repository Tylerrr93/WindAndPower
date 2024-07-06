import Mod from "@wayward/game/mod/Mod";
import { EventHandler } from "@wayward/game/event/EventManager";
import { EventBus } from "@wayward/game/event/EventBuses";
import { WINDANDPOWER_NAME } from "./IWindData";
import WindAndPowerMod from "./Mod";


export default class WindSystemManager {

    @Mod.instance(WINDANDPOWER_NAME)
    public static readonly WINDANDPOWERMOD: WindAndPowerMod;

    //Updater for wind speeds and states
    @EventHandler(EventBus.Players, "tickStart")
    public checkForWindUpdates() {
        // How often in ticks the wind speed will update
        const tickInterval = 10;
        const currentTick = game.time.ticks;

        if (currentTick % tickInterval === 0) {
            // Wind state ranges
            const calmRange = { min: 0, max: 1 };
            const averageRange = { min: 2, max: 5 };
            const windyRange = { min: 6, max: 8 };
            const extremeRange = { min: 9, max: 10 };

            // Wind state timer ranges (How many times wind will change)
            const minCalmTimer = 5; 
            const maxCalmTimer = 15; 
            const minAverageTimer = 5; 
            const maxAverageTimer = 15;
            const minWindyTimer = 5;
            const maxWindyTimer = 15;
            const minExtremeTimer = 5; 
            const maxExtremeTimer = 15; 

            // Check and update wind state
            if (WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer === 0) {

                const calmProbability = 0.05; //Probability of calm wind state
                const averageProbability = 0.8; //Probability of average wind state
                const windyProbability = 0.04; //Probability of windy wind state
                //Remaining value out of 1 is the chance of an extreme event

                const randomValue = Math.random();
                if (randomValue < calmProbability) {
                    WindAndPowerMod.WINDANDPOWERMOD.data.windState = "calm";
                } else if (randomValue < calmProbability + averageProbability) {
                    WindAndPowerMod.WINDANDPOWERMOD.data.windState = "average";
                } else if (randomValue < calmProbability + averageProbability + windyProbability) {
                    WindAndPowerMod.WINDANDPOWERMOD.data.windState = "windy";
                } else {
                    WindAndPowerMod.WINDANDPOWERMOD.data.windState = "extreme";
                }

                let newWindState = WindAndPowerMod.WINDANDPOWERMOD.data.windState

                // Set new wind state timer based on the new wind state
                switch (newWindState) {
                    case "calm":
                        WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer = Math.floor(Math.random() * (maxCalmTimer - minCalmTimer + 1)) + minCalmTimer;
                        break;
                    case "average":
                        WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer = Math.floor(Math.random() * (maxAverageTimer - minAverageTimer + 1)) + minAverageTimer;
                        break;
                    case "windy":
                        WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer = Math.floor(Math.random() * (maxWindyTimer - minWindyTimer + 1)) + minWindyTimer;
                        break;
                    case "extreme":
                        WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer = Math.floor(Math.random() * (maxExtremeTimer - minExtremeTimer + 1)) + minExtremeTimer;
                        break;
                }
            }

            // Update wind speed based on wind state
            switch (WindAndPowerMod.WINDANDPOWERMOD.data.windState) {
                case "calm":
                    WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed = Math.floor(Math.random() * (calmRange.max - calmRange.min + 1)) + calmRange.min;
                    break;
                case "average":
                    WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed = Math.floor(Math.random() * (averageRange.max - averageRange.min + 1)) + averageRange.min;
                    break;
                case "windy":
                    WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed = Math.floor(Math.random() * (windyRange.max - windyRange.min + 1)) + windyRange.min;
                    break;
                case "extreme":
                    WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed = Math.floor(Math.random() * (extremeRange.max - extremeRange.min + 1)) + extremeRange.min;
                    break;
            }
            
            // Update wind state timer
            WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer--;
            console.log(`Wind state: ${WindAndPowerMod.WINDANDPOWERMOD.data.windState}, Wind speed: ${WindAndPowerMod.WINDANDPOWERMOD.data.windSpeed}, Wind state timer: ${WindAndPowerMod.WINDANDPOWERMOD.data.windStateTimer}`);
        }
    }

}