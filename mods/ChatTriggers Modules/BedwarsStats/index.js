import { getPlayer } from "../slothpixel/endpoints";
import { SettingsCache } from './settings'
import LocationTracker from "../RawLocationTracker/locationTracker";

const PREFIX = "&f[&c&lBedwars&5&lStats&f]";
let allowUsage = true;

LocationTracker.addLocationCallback((jsonLoc) => {
    allowUsage = !jsonLoc.hasOwnProperty("map") || jsonLoc.gametype == "HOUSING";
    ChatLib.chat(allowUsage ? `${PREFIX} &r&aYou have entered a location in which using BedwarsStats is allowed!` : `${PREFIX} &r&cYou have entered a location in which using BedwarsStats is not allowed! &r&7Blocking all usage.`)
});

register('command', (name) => {
    if (!allowUsage) {
        ChatLib.chat(`${PREFIX} &r&7You are currently in a Game Lobby/Game and cannot use BedwarsStats!`)
        return;
    }
    getPlayer(name).then(data => {
        const a = new ProcessPlayer(name, data);
        // if (a.hasError()) {
        //     ChatLib.chat(`${PREFIX} &r&7An error has occurred fetching ${this.name}'s data. &cERROR: ${a.getErrorMessage()}`)
        // }
        ChatLib.chat(a.getBedWarsStatsString())
    })
}).setCommandName("bws")

/**
 * 
 */
class ProcessPlayer {
    /**
     * 
     * @param {string} player the player's name
     */
    constructor(player, data) {
        SettingsCache.recache();
        this.name = player;
        this.data = data;
        this.bedwarsData = data.stats.BedWars;
    }

    recachePlayerStats() {
        getPlayer(this.name).then(data => this.data = data).catch(this.onFetchFail());
    }

    hasError() {
        return this.data.hasOwnProperty("error");
    }

    getErrorMessage() {
        if (!this.hasError()) return "UNKNOWN.";
        return this.data.error;
    }

    getBedWarsStatsString() {
        return `${SettingsCache.title.replace(/{name}/g, this.data.username)}${SettingsCache.showStars ? SettingsCache.stars.replace(/{stars}/g, withCommas(this.bedwarsData.level)) : ""}${SettingsCache.showFkdr ? SettingsCache.fkdr.replace(/{fkdr}/g, withCommas(this.bedwarsData.final_k_d)) : ""}${SettingsCache.showWlr ? SettingsCache.wlr.replace(/{wlr}/g, withCommas(this.bedwarsData.w_l)) : ""}${SettingsCache.showBedsBroken ? SettingsCache.bedsBroken.replace(/{beds broken}/g, withCommas(this.bedwarsData.beds_broken)) : ""}${SettingsCache.showFinalKills ? SettingsCache.finalKills.replace(/{final kills}/g, withCommas(this.bedwarsData.final_kills)) : ""}`.replace(/\\n/g, "\n");
    }

    onFetchFail = () => ChatLib.chat(`${PREFIX} &4An error has occured during the process of fetching ${this.name}'s player data. You might not have an internet connection.`);
}

function withCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
