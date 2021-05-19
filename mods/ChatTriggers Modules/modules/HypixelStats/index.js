import request from "../requestV2/index";
import LocationTracker from "../RawLocationTracker/locationTracker";

let allowUsage = true

LocationTracker.addLocationCallback((location) => {
    Thread.sleep(2)
    allowUsage = !location.hasOwnProperty("map") || location.gametype == "HOUSING";
});

function getBWData(player) {
    if (!player) return ChatLib.chat("&cYou must specify a player!");
    request({
        url: `https://api.mojang.com/users/profiles/minecraft/${player}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (ChatTriggers)'
        },
        json: true
    })
        .then(() => {
            request({
                url: `https://api.slothpixel.me/api/players/${player}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (ChatTriggers)'

                },
                json: true
            }).then(data => {
                let playerName = data.username
                let bedwarsWins = data.stats.BedWars.wins
                let bedwarsLosses = data.stats.BedWars.losses
                let bedwarsKills = data.stats.BedWars.kills
                let bedwarsDeaths = data.stats.BedWars.deaths
                let bedwarsLevel = data.stats.BedWars.level
                let bedwarsWL = data.stats.BedWars.w_l
                let bedwarsKD = data.stats.BedWars.k_d
                let bedwarsBedsBroken = data.stats.BedWars.beds_broken
                let bedwarsBedsLost = data.stats.BedWars.beds_lost
                let bedwarsBedsRatio = data.stats.BedWars.bed_ratio
                let bedwarsFinalKills = data.stats.BedWars.final_kills
                let bedwarsFinalDeaths = data.stats.BedWars.final_deaths
                let bedwarsFinalKD = data.stats.BedWars.final_k_d
                let bedwarsVoidKills = data.stats.BedWars.void_kills
                let bedwarsVoidDeaths = data.stats.BedWars.void_deaths
                let bedwarsWinstreak = data.stats.BedWars.winstreak
                let bedwarsIronCollected = data.stats.BedWars.resources_collected.iron
                let bedwarsGoldCollected = data.stats.BedWars.resources_collected.gold
                let bedwarsDiamondsCollected = data.stats.BedWars.resources_collected.diamond
                let bedwarsEmeraldsCollected = data.stats.BedWars.resources_collected.emerald
                let bedwarsGamesPlayed = data.stats.BedWars.games_played
                let rankFormatted;
                if (data.rank_formatted === "&7") rankFormatted = "&7";
                else if (data.rank_formatted !== "&7") rankFormatted = `${data.rank_formatted} `;
                if (!playerName) return ChatLib("That player has not played on Hypixel!")
                let otherStats = new Message(
                    new TextComponent("&eOther Stats...").setClick("suggest_command", "/extrabwstats " + player).setHoverValue("&eType &a/extrabwstats " + player + "&e or click on this text to see extra BedWars stats for this player")
                );
                if (bedwarsLevel >= 1000) bedwarsPrestigeColor = "&k";
                else if (bedwarsLevel >= 900) bedwarsPrestigeColor = "&5";
                else if (bedwarsLevel >= 800) bedwarsPrestigeColor = "&9";
                else if (bedwarsLevel >= 700) bedwarsPrestigeColor = "&d";
                else if (bedwarsLevel >= 600) bedwarsPrestigeColor = "&4";
                else if (bedwarsLevel >= 500) bedwarsPrestigeColor = "&3";
                else if (bedwarsLevel >= 400) bedwarsPrestigeColor = "&2";
                else if (bedwarsLevel >= 300) bedwarsPrestigeColor = "&b";
                else if (bedwarsLevel >= 200) bedwarsPrestigeColor = "&6";
                else if (bedwarsLevel >= 100) bedwarsPrestigeColor = "&f";
                else if (bedwarsLevel < 100) bedwarsPrestigeColor = "&7";
                ChatLib.chat("&9&m---------------------------------")
                if (bedwarsLevel >= 1000) {
                    let bedwarsLevelStr = `${bedwarsLevel}`
                    let bedwarsHighLevel = bedwarsLevelStr.split("");
                    ChatLib.chat("&c[&6" + bedwarsHighLevel[0] + "&e" + bedwarsHighLevel[1] + "&a" + bedwarsHighLevel[2] + "&b" + bedwarsHighLevel[3] + "&d✫&5] " + rankFormatted + playerName + "'s &cBed&bWars &9Stats");
                } else {
                    ChatLib.chat(bedwarsPrestigeColor + "[" + bedwarsLevel + "✫] " + rankFormatted + playerName + "'s &cBed&bWars &9Stats");
                }
                ChatLib.chat("")
                ChatLib.chat("&aWins: &f" + bedwarsWins);
                ChatLib.chat("&aLosses: &f" + bedwarsLosses);
                ChatLib.chat("&aWin/Loss Ratio: &f" + bedwarsWL);
                ChatLib.chat("")
                ChatLib.chat("&aKills: &f" + bedwarsKills);
                ChatLib.chat("&aDeaths: &f" + bedwarsDeaths);
                ChatLib.chat("&aKill/Death Ratio: &f" + bedwarsKD);
                ChatLib.chat("&aFinal Kills: &f" + bedwarsFinalKills);
                ChatLib.chat("&aFinal Deaths: &f" + bedwarsFinalDeaths);
                ChatLib.chat("&aFinal Kill/Death Ratio: &f" + bedwarsFinalKD);
                ChatLib.chat("")
                ChatLib.chat("&aBeds Broken: &f" + bedwarsBedsBroken);
                ChatLib.chat("&aBeds Lost: &f" + bedwarsBedsLost);
                ChatLib.chat("&aBeds Broken/Lost Ratio: &f" + bedwarsBedsRatio);
                ChatLib.chat(otherStats)
                ChatLib.chat("&9&m---------------------------------")
            })
        })
        .catch(e => {
            ChatLib.chat("&cInvalid username!");
            print(`Username not found:\n${JSON.stringify(e)}`);
        });
}

function getExtraBWData(player) {
    if (!player) return ChatLib.chat("&cYou must specify a player!");
    request({
        url: `https://api.mojang.com/users/profiles/minecraft/${player}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (ChatTriggers)'
        },
        json: true
    })
        .then(() => {
            request({
                url: `https://api.slothpixel.me/api/players/${player}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (ChatTriggers)'

                },
                json: true
            }).then(data => {
                let playerName = data.username
                let bedwarsWins = data.stats.BedWars.wins
                let bedwarsLosses = data.stats.BedWars.losses
                let bedwarsKills = data.stats.BedWars.kills
                let bedwarsDeaths = data.stats.BedWars.deaths
                let bedwarsLevel = data.stats.BedWars.level
                let bedwarsWL = data.stats.BedWars.w_l
                let bedwarsKD = data.stats.BedWars.k_d
                let bedwarsBedsBroken = data.stats.BedWars.beds_broken
                let bedwarsBedsLost = data.stats.BedWars.beds_lost
                let bedwarsBedsRatio = data.stats.BedWars.bed_ratio
                let bedwarsFinalKills = data.stats.BedWars.final_kills
                let bedwarsFinalDeaths = data.stats.BedWars.final_deaths
                let bedwarsFinalKD = data.stats.BedWars.final_k_d
                let bedwarsVoidKills = data.stats.BedWars.void_kills
                let bedwarsVoidDeaths = data.stats.BedWars.void_deaths
                let bedwarsWinstreak = data.stats.BedWars.winstreak
                let bedwarsIronCollected = data.stats.BedWars.resources_collected.iron
                let bedwarsGoldCollected = data.stats.BedWars.resources_collected.gold
                let bedwarsDiamondsCollected = data.stats.BedWars.resources_collected.diamond
                let bedwarsEmeraldsCollected = data.stats.BedWars.resources_collected.emerald
                let bedwarsGamesPlayed = data.stats.BedWars.games_played
                let rankFormatted;
                if (data.rank_formatted === "&7") rankFormatted = "&7";
                else if (data.rank_formatted !== "&7") rankFormatted = `${data.rank_formatted} `;
                if (!playerName) return ChatLib("That player has not played on Hypixel!")
                let otherStats = new Message(
                    new TextComponent("&eOther Stats...").setClick("suggest_command", "/extrabwstats " + player).setHoverValue("&eType &a/extrabwstats " + player + "&e or click on this text to see extra BedWars stats for this player")
                );
                if (bedwarsLevel >= 1000) bedwarsPrestigeColor = "&k";
                else if (bedwarsLevel >= 900) bedwarsPrestigeColor = "&5";
                else if (bedwarsLevel >= 800) bedwarsPrestigeColor = "&9";
                else if (bedwarsLevel >= 700) bedwarsPrestigeColor = "&d";
                else if (bedwarsLevel >= 600) bedwarsPrestigeColor = "&4";
                else if (bedwarsLevel >= 500) bedwarsPrestigeColor = "&3";
                else if (bedwarsLevel >= 400) bedwarsPrestigeColor = "&2";
                else if (bedwarsLevel >= 300) bedwarsPrestigeColor = "&b";
                else if (bedwarsLevel >= 200) bedwarsPrestigeColor = "&6";
                else if (bedwarsLevel >= 100) bedwarsPrestigeColor = "&f";
                else if (bedwarsLevel < 100) bedwarsPrestigeColor = "&7";
                ChatLib.chat("&9&m---------------------------------")
                if (bedwarsLevel >= 1000) {
                    let bedwarsLevelStr = `${bedwarsLevel}`
                    let bedwarsHighLevel = bedwarsLevelStr.split("");
                    ChatLib.chat("&c[&6" + bedwarsHighLevel[0] + "&e" + bedwarsHighLevel[1] + "&a" + bedwarsHighLevel[2] + "&b" + bedwarsHighLevel[3] + "&d✫&5] " + rankFormatted + playerName + "'s &cBed&bWars &9Stats");
                } else {
                    ChatLib.chat(bedwarsPrestigeColor + "[" + bedwarsLevel + "✫] " + rankFormatted + playerName + "'s &cBed&bWars &9Stats");
                }
                ChatLib.chat("")
                ChatLib.chat("&aWinstreak: &f" + bedwarsWinstreak);
                ChatLib.chat("")
                ChatLib.chat("&aVoid Kills: &f" + bedwarsVoidKills);
                ChatLib.chat("&aVoid Deaths: &f" + bedwarsVoidDeaths);
                ChatLib.chat("")
                ChatLib.chat("&aIron Collected: &f" + bedwarsIronCollected);
                ChatLib.chat("&aGold Collected: &f" + bedwarsGoldCollected);
                ChatLib.chat("&aDiamonds Collected: &f" + bedwarsDiamondsCollected);
                ChatLib.chat("&aEmeralds Collected: &f" + bedwarsEmeraldsCollected);
                ChatLib.chat("&9&m---------------------------------")
            })
        })
        .catch(e => {
            ChatLib.chat("&cInvalid username!");
            print(`Username not found:\n${JSON.stringify(e)}`);
        });
}

function getSWData(player) {
    if (!player) return ChatLib.chat("&cYou must specify a player!");
    request({
        url: `https://api.mojang.com/users/profiles/minecraft/${player}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (ChatTriggers)'
        },
        json: true
    })
        .then(() => {
            request({
                url: `https://api.slothpixel.me/api/players/${player}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (ChatTriggers)'

                },
                json: true
            }).then(data => {
                let playerName = data.username
                let skywarsWins = data.stats.SkyWars.wins
                let skywarsKills = data.stats.SkyWars.kills
                let skywarsDeaths = data.stats.SkyWars.losses
                let skywarsLevel = data.stats.SkyWars.level
                let skywarsWL = data.stats.SkyWars.win_loss_ratio
                let skywarsKD = data.stats.SkyWars.kill_death_ratio
                let skywarsEggs = data.stats.SkyWars.eggs_thrown
                let skywarsEPearls = data.stats.SkyWars.enderpearls_thrown
                let skywarsBlocksPlaced = data.stats.SkyWars.blocks_placed
                let skywarsBlocksBroken = data.stats.SkyWars.blocks_broken
                let skywarsArrowsShot = data.stats.SkyWars.arrows_shot
                let skywarsArrowsHit = data.stats.SkyWars.arrows_hit
                let skywarsAssists = data.stats.SkyWars.assists
                let skywarsGamesPlayed = data.stats.SkyWars.wins + data.stats.SkyWars.losses
                let skywarsSoulWell = data.stats.SkyWars.soul_well_uses
                let rankFormatted;
                if (data.rank_formatted === "&7") rankFormatted = "&7";
                else if (data.rank_formatted !== "&7") rankFormatted = `${data.rank_formatted} `;
                if (!playerName) return ChatLib("That player has not played on Hypixel!")
                let otherStats = new Message(
                    new TextComponent("&eOther Stats...").setClick("suggest_command", "/extraswstats " + player).setHoverValue("&eType &a/extraswstats " + player + "&e or click on this text to see extra SkyWars stats for this player")
                );
                ChatLib.chat("&9&m---------------------------------")
                ChatLib.chat(rankFormatted + playerName + "'s &5Sky&bWars &9Stats");
                ChatLib.chat("")
                ChatLib.chat("&aLevel: &f" + Math.round(skywarsLevel))
                ChatLib.chat("")
                ChatLib.chat("&aWins: &f" + skywarsWins);
                ChatLib.chat("&aGames Played: &f" + skywarsGamesPlayed);
                ChatLib.chat("&aWin/Loss Ratio: &f" + skywarsWL);
                ChatLib.chat("")
                ChatLib.chat("&aKills: &f" + skywarsKills);
                ChatLib.chat("&aDeaths: &f" + skywarsDeaths);
                ChatLib.chat("&aKill/Death Ratio: &f" + skywarsKD);
                ChatLib.chat("")
                ChatLib.chat(otherStats)
                ChatLib.chat("&9&m---------------------------------")
            })
        })
        .catch(e => {
            ChatLib.chat("&cInvalid username!");
            print(`Username not found:\n${JSON.stringify(e)}`);
        });
}

function getExtraSWData(player) {
    if (!player) return ChatLib.chat("&cYou must specify a player!");
    request({
        url: `https://api.mojang.com/users/profiles/minecraft/${player}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (ChatTriggers)'
        },
        json: true
    })
        .then(() => {
            request({
                url: `https://api.slothpixel.me/api/players/${player}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (ChatTriggers)'

                },
                json: true
            }).then(data => {
                let playerName = data.username
                let skywarsWins = data.stats.SkyWars.wins
                let skywarsKills = data.stats.SkyWars.kills
                let skywarsDeaths = data.stats.SkyWars.losses
                let skywarsLevel = data.stats.SkyWars.level
                let skywarsWL = data.stats.SkyWars.win_loss_ratio
                let skywarsKD = data.stats.SkyWars.kill_death_ratio
                let skywarsEggs = data.stats.SkyWars.eggs_thrown
                let skywarsEPearls = data.stats.SkyWars.enderpearls_thrown
                let skywarsBlocksPlaced = data.stats.SkyWars.blocks_placed
                let skywarsBlocksBroken = data.stats.SkyWars.blocks_broken
                let skywarsArrowsShot = data.stats.SkyWars.arrows_shot
                let skywarsArrowsHit = data.stats.SkyWars.arrows_hit
                let skywarsAssists = data.stats.SkyWars.assists
                let skywarsGamesPlayed = data.stats.SkyWars.wins + data.stats.SkyWars.losses
                let skywarsSoulWell = data.stats.SkyWars.soul_well_uses
                let rankFormatted;
                if (data.rank_formatted === "&7") rankFormatted = "&7";
                else if (data.rank_formatted !== "&7") rankFormatted = `${data.rank_formatted} `;
                if (!playerName) return ChatLib("That player has not played on Hypixel!")
                ChatLib.chat("&9&m---------------------------------")
                ChatLib.chat(rankFormatted + playerName + "'s &6Extra &5Sky&bWars &9Stats");
                ChatLib.chat("")
                ChatLib.chat("&aArrows Shot: &f" + skywarsArrowsShot);
                ChatLib.chat("&aArrows Hit: &f" + skywarsArrowsHit);
                ChatLib.chat("")
                ChatLib.chat("&aAssists: &f" + skywarsAssists);
                ChatLib.chat("")
                ChatLib.chat("&aBlocks Placed: &f" + skywarsBlocksPlaced);
                ChatLib.chat("&aBlocks Broken: &f" + skywarsBlocksBroken);
                ChatLib.chat("")
                ChatLib.chat("&aEggs Thrown: &f" + skywarsEggs);
                ChatLib.chat("&aEnderpearls Thrown: &f" + skywarsEPearls);
                ChatLib.chat("")
                ChatLib.chat("&aSoul Well Uses: &f" + skywarsSoulWell);
                ChatLib.chat("&9&m---------------------------------")
            })
        })
        .catch(e => {
            ChatLib.chat("&cInvalid username!");
            print(`Username not found:\n${JSON.stringify(e)}`);
        });
}

function getDuelsData(player) {
    if (!player) return ChatLib.chat("&cYou must specify a player!");
    request({
        url: `https://api.mojang.com/users/profiles/minecraft/${player}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (ChatTriggers)'
        },
        json: true
    })
        .then(() => {
            request({
                url: `https://api.slothpixel.me/api/players/${player}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (ChatTriggers)'

                },
                json: true
            }).then(data => {
                let playerName = data.username
                let duelsWins = data.stats.Duels.general.wins
                let duelsKills = data.stats.Duels.general.kills
                let duelsDeaths = data.stats.Duels.general.deaths
                let duelsLosses = data.stats.Duels.general.losses
                let duelsWL = data.stats.Duels.general.win_loss_ratio
                let duelsKD = data.stats.Duels.general.kd_ratio
                let duelsBowHits = data.stats.Duels.general.bow_hits
                let duelsBowShots = data.stats.Duels.general.bow_shots
                let duelsBlocksPlaced = data.stats.Duels.general.blocks_placed
                let duelsGapples = data.stats.Duels.general.golden_apples_eaten
                let duelsDamage = data.stats.Duels.general.damage_dealt
                let duelsHealthRegenerated = data.stats.Duels.general.health_regenerated
                let duelsMeleeHits = data.stats.Duels.general.melee_hits
                let duelsMeleeSwings = data.stats.Duels.general.melee_swings
                let duelsMeleeRatio = data.stats.Duels.general.melee_hit_ratio
                let duelsBestWinstreak = data.stats.Duels.general.winstreaks.best.overall
                let duelsTitleId = data.stats.Duels.settings.active_cosmetics.cosmetictitle
                let duelsTitle;
                if (!duelsTitleId) duelsTitle = "";
                    else if (duelsTitleId === "godlike_all_modes" && duelsWins >= 56000) duelsTitle = "&6✫ &5&lGodlike X ";
                    else if (duelsTitleId === "godlike_all_modes" && duelsWins >= 52000) duelsTitle = "&6✫ &5&lGodlike IX ";
                    else if (duelsTitleId === "godlike_all_modes" && duelsWins >= 48000) duelsTitle = "&6✫ &5&lGodlike VIII ";
                    else if (duelsTitleId === "godlike_all_modes" && duelsWins >= 44000) duelsTitle = "&6✫ &5&lGodlike VII ";
                    else if (duelsTitleId === "godlike_all_modes" && duelsWins >= 40000) duelsTitle = "&6✫ &5&lGodlike VI ";
                    else if (duelsTitleId === "godlike_all_modes" && duelsWins >= 36000) duelsTitle = "&6✫ &5&lGodlike V ";
                    else if (duelsTitleId === "godlike_all_modes" && duelsWins >= 32000) duelsTitle = "&6✫ &5&lGodlike IV ";
                    else if (duelsTitleId === "godlike_all_modes" && duelsWins >= 28000) duelsTitle = "&6✫ &5&lGodlike III ";
                    else if (duelsTitleId === "godlike_all_modes" && duelsWins >= 24000) duelsTitle = "&6✫ &5&lGodlike II ";
                    else if (duelsTitleId === "godlike_all_modes" && duelsWins >= 20000) duelsTitle = "&6✫ &5&lGodlike ";
                    else if (duelsTitleId === "grandmaster_all_modes" && duelsWins >= 18000) duelsTitle = "&6✫ &e&lGrandmaster V ";
                    else if (duelsTitleId === "grandmaster_all_modes" && duelsWins >= 16000) duelsTitle = "&6✫ &e&lGrandmaster IV ";
                    else if (duelsTitleId === "grandmaster_all_modes" && duelsWins >= 14000) duelsTitle = "&6✫ &e&lGrandmaster III ";
                    else if (duelsTitleId === "grandmaster_all_modes" && duelsWins >= 12000) duelsTitle = "&6✫ &e&lGrandmaster II ";
                    else if (duelsTitleId === "grandmaster_all_modes" && duelsWins >= 10000) duelsTitle = "&6✫ &e&lGrandmaster ";
                    else if (duelsTitleId === "legend_all_modes" && duelsWins >= 8800) duelsTitle = "&6✫ &4Legend V ";
                    else if (duelsTitleId === "legend_all_modes" && duelsWins >= 7600) duelsTitle = "&6✫ &4Legend IV ";
                    else if (duelsTitleId === "legend_all_modes" && duelsWins >= 6400) duelsTitle = "&6✫ &4Legend III ";
                    else if (duelsTitleId === "legend_all_modes" && duelsWins >= 5200) duelsTitle = "&6✫ &4Legend II ";
                    else if (duelsTitleId === "legend_all_modes" && duelsWins >= 4000) duelsTitle = "&6✫ &4Legend ";
                    else if (duelsTitleId === "master_all_modes" && duelsWins >= 3600) duelsTitle = "&6✫ &2Master V ";
                    else if (duelsTitleId === "master_all_modes" && duelsWins >= 3200) duelsTitle = "&6✫ &2Master IV ";
                    else if (duelsTitleId === "master_all_modes" && duelsWins >= 2800) duelsTitle = "&6✫ &2Master III ";
                    else if (duelsTitleId === "master_all_modes" && duelsWins >= 2400) duelsTitle = "&6✫ &2Master II ";
                    else if (duelsTitleId === "master_all_modes" && duelsWins >= 2000) duelsTitle = "&6✫ &2Master ";
                    else if (duelsTitleId === "diamond_all_modes" && duelsWins >= 1800) duelsTitle = "&6✫ &3Diamond V ";
                    else if (duelsTitleId === "diamond_all_modes" && duelsWins >= 1600) duelsTitle = "&6✫ &3Diamond IV ";
                    else if (duelsTitleId === "diamond_all_modes" && duelsWins >= 1400) duelsTitle = "&6✫ &3Diamond III ";
                    else if (duelsTitleId === "diamond_all_modes" && duelsWins >= 1200) duelsTitle = "&6✫ &3Diamond II ";
                    else if (duelsTitleId === "diamond_all_modes" && duelsWins >= 1000) duelsTitle = "&6✫ &3Diamond ";
                    else if (duelsTitleId === "gold_all_modes" && duelsWins >= 900) duelsTitle = "&6✫ &6Gold V ";
                    else if (duelsTitleId === "gold_all_modes" && duelsWins >= 800) duelsTitle = "&6✫ &6Gold IV ";
                    else if (duelsTitleId === "gold_all_modes" && duelsWins >= 700) duelsTitle = "&6✫ &6Gold III ";
                    else if (duelsTitleId === "gold_all_modes" && duelsWins >= 600) duelsTitle = "&6✫ &6Gold II ";
                    else if (duelsTitleId === "gold_all_modes" && duelsWins >= 500) duelsTitle = "&6✫ &6Gold ";
                    else if (duelsTitleId === "iron_all_modes" && duelsWins >= 440) duelsTitle = "&6✫ &fIron V ";
                    else if (duelsTitleId === "iron_all_modes" && duelsWins >= 380) duelsTitle = "&6✫ &fIron IV ";
                    else if (duelsTitleId === "iron_all_modes" && duelsWins >= 320) duelsTitle = "&6✫ &fIron III ";
                    else if (duelsTitleId === "iron_all_modes" && duelsWins >= 260) duelsTitle = "&6✫ &fIron II ";
                    else if (duelsTitleId === "iron_all_modes" && duelsWins >= 200) duelsTitle = "&6✫ &fIron ";
                    else if (duelsTitleId === "rookie_all_modes" && duelsWins >= 180) duelsTitle = "&6✫ &8Rookie V ";
                    else if (duelsTitleId === "rookie_all_modes" && duelsWins >= 160) duelsTitle = "&6✫ &8Rookie IV ";
                    else if (duelsTitleId === "rookie_all_modes" && duelsWins >= 140) duelsTitle = "&6✫ &8Rookie III ";
                    else if (duelsTitleId === "rookie_all_modes" && duelsWins >= 120) duelsTitle = "&6✫ &8Rookie II ";
                    else if (duelsTitleId === "rookie_all_modes" && duelsWins >= 100) duelsTitle = "&6✫ &8Rookie ";
                    else if (duelsTitleId === "godlike_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 28000) duelsTitle = "&6✫ &5&lClassic Godlike X ";
                    else if (duelsTitleId === "godlike_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 26000) duelsTitle = "&6✫ &5&lClassic Godlike IX ";
                    else if (duelsTitleId === "godlike_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 24000) duelsTitle = "&6✫ &5&lClassic Godlike VIII ";
                    else if (duelsTitleId === "godlike_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 22000) duelsTitle = "&6✫ &5&lClassic Godlike VII ";
                    else if (duelsTitleId === "godlike_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 20000) duelsTitle = "&6✫ &5&lClassic Godlike VI ";
                    else if (duelsTitleId === "godlike_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 18000) duelsTitle = "&6✫ &5&lClassic Godlike V ";
                    else if (duelsTitleId === "godlike_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 16000) duelsTitle = "&6✫ &5&lClassic Godlike IV ";
                    else if (duelsTitleId === "godlike_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 14000) duelsTitle = "&6✫ &5&lClassic Godlike III ";
                    else if (duelsTitleId === "godlike_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 12000) duelsTitle = "&6✫ &5&lClassic Godlike II ";
                    else if (duelsTitleId === "godlike_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 10000) duelsTitle = "&6✫ &5&lClassic Godlike ";
                    else if (duelsTitleId === "grandmaster_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 9000) duelsTitle = "&6✫ &e&lClassic Grandmaster V ";
                    else if (duelsTitleId === "grandmaster_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 8000) duelsTitle = "&6✫ &e&lClassic Grandmaster IV ";
                    else if (duelsTitleId === "grandmaster_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 7000) duelsTitle = "&6✫ &e&lClassic Grandmaster III ";
                    else if (duelsTitleId === "grandmaster_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 6000) duelsTitle = "&6✫ &e&lClassic Grandmaster II ";
                    else if (duelsTitleId === "grandmaster_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 5000) duelsTitle = "&6✫ &e&lClassic Grandmaster ";
                    else if (duelsTitleId === "legend_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 4400) duelsTitle = "&6✫ &4Classic Legend V ";
                    else if (duelsTitleId === "legend_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 3800) duelsTitle = "&6✫ &4Classic Legend IV ";
                    else if (duelsTitleId === "legend_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 3200) duelsTitle = "&6✫ &4Classic Legend III ";
                    else if (duelsTitleId === "legend_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 2600) duelsTitle = "&6✫ &4Classic Legend II ";
                    else if (duelsTitleId === "legend_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 2000) duelsTitle = "&6✫ &4Classic Legend ";
                    else if (duelsTitleId === "master_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 1800) duelsTitle = "&6✫ &2Classic Master V ";
                    else if (duelsTitleId === "master_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 1600) duelsTitle = "&6✫ &2Classic Master IV ";
                    else if (duelsTitleId === "master_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 1400) duelsTitle = "&6✫ &2Classic Master III ";
                    else if (duelsTitleId === "master_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 1200) duelsTitle = "&6✫ &2Classic Master II ";
                    else if (duelsTitleId === "master_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 1000) duelsTitle = "&6✫ &2Classic Master ";
                    else if (duelsTitleId === "diamond_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 900) duelsTitle = "&6✫ &3Classic Diamond V ";
                    else if (duelsTitleId === "diamond_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 800) duelsTitle = "&6✫ &3Classic Diamond IV ";
                    else if (duelsTitleId === "diamond_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 700) duelsTitle = "&6✫ &3Classic Diamond III ";
                    else if (duelsTitleId === "diamond_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 600) duelsTitle = "&6✫ &3Classic Diamond II ";
                    else if (duelsTitleId === "diamond_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 500) duelsTitle = "&6✫ &3Classic Diamond ";
                    else if (duelsTitleId === "gold_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 450) duelsTitle = "&6✫ &6Classic Gold V ";
                    else if (duelsTitleId === "gold_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 400) duelsTitle = "&6✫ &6Classic Gold IV ";
                    else if (duelsTitleId === "gold_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 350) duelsTitle = "&6✫ &6Classic Gold III ";
                    else if (duelsTitleId === "gold_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 300) duelsTitle = "&6✫ &6Classic Gold II ";
                    else if (duelsTitleId === "gold_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 250) duelsTitle = "&6✫ &6Classic Gold ";
                    else if (duelsTitleId === "iron_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 220) duelsTitle = "&6✫ &fClassic Iron V ";
                    else if (duelsTitleId === "iron_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 190) duelsTitle = "&6✫ &fClassic Iron IV ";
                    else if (duelsTitleId === "iron_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 160) duelsTitle = "&6✫ &fClassic Iron III ";
                    else if (duelsTitleId === "iron_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 130) duelsTitle = "&6✫ &fClassic Iron II ";
                    else if (duelsTitleId === "iron_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 100) duelsTitle = "&6✫ &fClassic Iron ";
                    else if (duelsTitleId === "rookie_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 90) duelsTitle = "&6✫ &8Classic Rookie V ";
                    else if (duelsTitleId === "rookie_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 80) duelsTitle = "&6✫ &8Classic Rookie IV ";
                    else if (duelsTitleId === "rookie_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 70) duelsTitle = "&6✫ &8Classic Rookie III ";
                    else if (duelsTitleId === "rookie_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 60) duelsTitle = "&6✫ &8Classic Rookie II ";
                    else if (duelsTitleId === "rookie_classic" && data.stats.Duels.gamemodes.classic_duel.wins >= 50) duelsTitle = "&6✫ &8Classic Rookie ";
                    else if (duelsTitleId === "godlike_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 28000) duelsTitle = "&6✫ &5&lSkyWars Godlike X ";
                    else if (duelsTitleId === "godlike_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 26000) duelsTitle = "&6✫ &5&lSkyWars Godlike IX ";
                    else if (duelsTitleId === "godlike_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 24000) duelsTitle = "&6✫ &5&lSkyWars Godlike VIII ";
                    else if (duelsTitleId === "godlike_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 22000) duelsTitle = "&6✫ &5&lSkyWars Godlike VII ";
                    else if (duelsTitleId === "godlike_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 20000) duelsTitle = "&6✫ &5&lSkyWars Godlike VI ";
                    else if (duelsTitleId === "godlike_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 18000) duelsTitle = "&6✫ &5&lSkyWars Godlike V ";
                    else if (duelsTitleId === "godlike_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 16000) duelsTitle = "&6✫ &5&lSkyWars Godlike IV ";
                    else if (duelsTitleId === "godlike_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 14000) duelsTitle = "&6✫ &5&lSkyWars Godlike III ";
                    else if (duelsTitleId === "godlike_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 12000) duelsTitle = "&6✫ &5&lSkyWars Godlike II ";
                    else if (duelsTitleId === "godlike_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 10000) duelsTitle = "&6✫ &5&lSkyWars Godlike ";
                    else if (duelsTitleId === "grandmaster_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 9000) duelsTitle = "&6✫ &e&lSkyWars Grandmaster V ";
                    else if (duelsTitleId === "grandmaster_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 8000) duelsTitle = "&6✫ &e&lSkyWars Grandmaster IV ";
                    else if (duelsTitleId === "grandmaster_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 7000) duelsTitle = "&6✫ &e&lSkyWars Grandmaster III ";
                    else if (duelsTitleId === "grandmaster_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 6000) duelsTitle = "&6✫ &e&lSkyWars Grandmaster II ";
                    else if (duelsTitleId === "grandmaster_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 5000) duelsTitle = "&6✫ &e&lSkyWars Grandmaster ";
                    else if (duelsTitleId === "legend_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 4400) duelsTitle = "&6✫ &4SkyWars Legend V ";
                    else if (duelsTitleId === "legend_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 3800) duelsTitle = "&6✫ &4SkyWars Legend IV ";
                    else if (duelsTitleId === "legend_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 3200) duelsTitle = "&6✫ &4SkyWars Legend III ";
                    else if (duelsTitleId === "legend_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 2600) duelsTitle = "&6✫ &4SkyWars Legend II ";
                    else if (duelsTitleId === "legend_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 2000) duelsTitle = "&6✫ &4SkyWars Legend ";
                    else if (duelsTitleId === "master_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 1800) duelsTitle = "&6✫ &2SkyWars Master V ";
                    else if (duelsTitleId === "master_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 1600) duelsTitle = "&6✫ &2SkyWars Master IV ";
                    else if (duelsTitleId === "master_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 1400) duelsTitle = "&6✫ &2SkyWars Master III ";
                    else if (duelsTitleId === "master_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 1200) duelsTitle = "&6✫ &2SkyWars Master II ";
                    else if (duelsTitleId === "master_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 1000) duelsTitle = "&6✫ &2SkyWars Master ";
                    else if (duelsTitleId === "diamond_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 900) duelsTitle = "&6✫ &3SkyWars Diamond V ";
                    else if (duelsTitleId === "diamond_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 800) duelsTitle = "&6✫ &3SkyWars Diamond IV ";
                    else if (duelsTitleId === "diamond_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 700) duelsTitle = "&6✫ &3SkyWars Diamond III ";
                    else if (duelsTitleId === "diamond_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 600) duelsTitle = "&6✫ &3SkyWars Diamond II ";
                    else if (duelsTitleId === "diamond_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 500) duelsTitle = "&6✫ &3SkyWars Diamond ";
                    else if (duelsTitleId === "gold_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 450) duelsTitle = "&6✫ &6SkyWars Gold V ";
                    else if (duelsTitleId === "gold_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 400) duelsTitle = "&6✫ &6SkyWars Gold IV ";
                    else if (duelsTitleId === "gold_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 350) duelsTitle = "&6✫ &6SkyWars Gold III ";
                    else if (duelsTitleId === "gold_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 300) duelsTitle = "&6✫ &6SkyWars Gold II ";
                    else if (duelsTitleId === "gold_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 250) duelsTitle = "&6✫ &6SkyWars Gold ";
                    else if (duelsTitleId === "iron_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 220) duelsTitle = "&6✫ &fSkyWars Iron V ";
                    else if (duelsTitleId === "iron_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 190) duelsTitle = "&6✫ &fSkyWars Iron IV ";
                    else if (duelsTitleId === "iron_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 160) duelsTitle = "&6✫ &fSkyWars Iron III ";
                    else if (duelsTitleId === "iron_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 130) duelsTitle = "&6✫ &fSkyWars Iron II ";
                    else if (duelsTitleId === "iron_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 100) duelsTitle = "&6✫ &fSkyWars Iron ";
                    else if (duelsTitleId === "rookie_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 90) duelsTitle = "&6✫ &8SkyWars Rookie V ";
                    else if (duelsTitleId === "rookie_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 80) duelsTitle = "&6✫ &8SkyWars Rookie IV ";
                    else if (duelsTitleId === "rookie_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 70) duelsTitle = "&6✫ &8SkyWars Rookie III ";
                    else if (duelsTitleId === "rookie_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 60) duelsTitle = "&6✫ &8SkyWars Rookie II ";
                    else if (duelsTitleId === "rookie_skywars" && data.stats.Duels.gamemodes.skywars.doubles.wins + data.stats.Duels.gamemodes.skywars.duels.wins >= 50) duelsTitle = "&6✫ &8SkyWars Rookie ";
                    else if (duelsTitleId === "godlike_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 28000) duelsTitle = "&6✫ &5&lSumo Godlike X ";
                    else if (duelsTitleId === "godlike_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 26000) duelsTitle = "&6✫ &5&lSumo Godlike IX ";
                    else if (duelsTitleId === "godlike_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 24000) duelsTitle = "&6✫ &5&lSumo Godlike VIII ";
                    else if (duelsTitleId === "godlike_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 22000) duelsTitle = "&6✫ &5&lSumo Godlike VII ";
                    else if (duelsTitleId === "godlike_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 20000) duelsTitle = "&6✫ &5&lSumo Godlike VI ";
                    else if (duelsTitleId === "godlike_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 18000) duelsTitle = "&6✫ &5&lSumo Godlike V ";
                    else if (duelsTitleId === "godlike_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 16000) duelsTitle = "&6✫ &5&lSumo Godlike IV ";
                    else if (duelsTitleId === "godlike_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 14000) duelsTitle = "&6✫ &5&lSumo Godlike III ";
                    else if (duelsTitleId === "godlike_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 12000) duelsTitle = "&6✫ &5&lSumo Godlike II ";
                    else if (duelsTitleId === "godlike_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 10000) duelsTitle = "&6✫ &5&lSumo Godlike ";
                    else if (duelsTitleId === "grandmaster_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 9000) duelsTitle = "&6✫ &e&lSumo Grandmaster V ";
                    else if (duelsTitleId === "grandmaster_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 8000) duelsTitle = "&6✫ &e&lSumo Grandmaster IV ";
                    else if (duelsTitleId === "grandmaster_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 7000) duelsTitle = "&6✫ &e&lSumo Grandmaster III ";
                    else if (duelsTitleId === "grandmaster_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 6000) duelsTitle = "&6✫ &e&lSumo Grandmaster II ";
                    else if (duelsTitleId === "grandmaster_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 5000) duelsTitle = "&6✫ &e&lSumo Grandmaster ";
                    else if (duelsTitleId === "legend_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 4400) duelsTitle = "&6✫ &4Sumo Legend V ";
                    else if (duelsTitleId === "legend_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 3800) duelsTitle = "&6✫ &4Sumo Legend IV ";
                    else if (duelsTitleId === "legend_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 3200) duelsTitle = "&6✫ &4Sumo Legend III ";
                    else if (duelsTitleId === "legend_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 2600) duelsTitle = "&6✫ &4Sumo Legend II ";
                    else if (duelsTitleId === "legend_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 2000) duelsTitle = "&6✫ &4Sumo Legend ";
                    else if (duelsTitleId === "master_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 1800) duelsTitle = "&6✫ &2Sumo Master V ";
                    else if (duelsTitleId === "master_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 1600) duelsTitle = "&6✫ &2Sumo Master IV ";
                    else if (duelsTitleId === "master_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 1400) duelsTitle = "&6✫ &2Sumo Master III ";
                    else if (duelsTitleId === "master_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 1200) duelsTitle = "&6✫ &2Sumo Master II ";
                    else if (duelsTitleId === "master_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 1000) duelsTitle = "&6✫ &2Sumo Master ";
                    else if (duelsTitleId === "diamond_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 900) duelsTitle = "&6✫ &3Sumo Diamond V ";
                    else if (duelsTitleId === "diamond_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 800) duelsTitle = "&6✫ &3Sumo Diamond IV ";
                    else if (duelsTitleId === "diamond_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 700) duelsTitle = "&6✫ &3Sumo Diamond III ";
                    else if (duelsTitleId === "diamond_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 600) duelsTitle = "&6✫ &3Sumo Diamond II ";
                    else if (duelsTitleId === "diamond_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 500) duelsTitle = "&6✫ &3Sumo Diamond ";
                    else if (duelsTitleId === "gold_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 450) duelsTitle = "&6✫ &6Sumo Gold V ";
                    else if (duelsTitleId === "gold_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 400) duelsTitle = "&6✫ &6Sumo Gold IV ";
                    else if (duelsTitleId === "gold_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 350) duelsTitle = "&6✫ &6Sumo Gold III ";
                    else if (duelsTitleId === "gold_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 300) duelsTitle = "&6✫ &6Sumo Gold II ";
                    else if (duelsTitleId === "gold_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 250) duelsTitle = "&6✫ &6Sumo Gold ";
                    else if (duelsTitleId === "iron_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 220) duelsTitle = "&6✫ &fSumo Iron V ";
                    else if (duelsTitleId === "iron_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 190) duelsTitle = "&6✫ &fSumo Iron IV ";
                    else if (duelsTitleId === "iron_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 160) duelsTitle = "&6✫ &fSumo Iron III ";
                    else if (duelsTitleId === "iron_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 130) duelsTitle = "&6✫ &fSumo Iron II ";
                    else if (duelsTitleId === "iron_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 100) duelsTitle = "&6✫ &fSumo Iron ";
                    else if (duelsTitleId === "rookie_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 90) duelsTitle = "&6✫ &8Sumo Rookie V ";
                    else if (duelsTitleId === "rookie_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 80) duelsTitle = "&6✫ &8Sumo Rookie IV ";
                    else if (duelsTitleId === "rookie_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 70) duelsTitle = "&6✫ &8Sumo Rookie III ";
                    else if (duelsTitleId === "rookie_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 60) duelsTitle = "&6✫ &8Sumo Rookie II ";
                    else if (duelsTitleId === "rookie_sumo" && data.stats.Duels.gamemodes.sumo.wins >= 50) duelsTitle = "&6✫ &8Sumo Rookie ";
                    else duelsTitle = ""
                if (data.rank_formatted === "&7") rankFormatted = "&7";
                else if (data.rank_formatted !== "&7") rankFormatted = `${data.rank_formatted} `;
                if (!playerName) return ChatLib("That player has not played on Hypixel!")
                let otherStats = new Message(
                    new TextComponent("&eOther Stats...").setClick("suggest_command", "/extraduelsstats " + player).setHoverValue("&eType &a/extraduelsstats " + player + "&e or click on this text to see extra Duels stats for this player")
                );
                ChatLib.chat("&9&m---------------------------------")
                ChatLib.chat(duelsTitle + rankFormatted + playerName + "'s &3Duels &9Stats");
                ChatLib.chat("")
                ChatLib.chat("&aWins: &f" + duelsWins);
                ChatLib.chat("&aLosses: &f" + duelsLosses);
                ChatLib.chat("&aWin/Loss Ratio: &f" + Math.round((duelsWins/duelsLosses)*100)/100.0);
                ChatLib.chat("")
                ChatLib.chat("&aKills: &f" + duelsKills);
                ChatLib.chat("&aDeaths: &f" + duelsDeaths);
                ChatLib.chat("&aKill/Death Ratio: &f" + Math.round((duelsKills/duelsDeaths)*100)/100.0);
                ChatLib.chat("")    
                ChatLib.chat("&aMelee Hits: &f" + duelsMeleeHits);
                ChatLib.chat("&aMelee Swings: &f" + duelsMeleeSwings);
                ChatLib.chat("&aMelee Ratio: &f" + Math.round((duelsMeleeHits/duelsMeleeSwings)*100)/100.0);
                ChatLib.chat(otherStats)
                ChatLib.chat("&9&m---------------------------------")
            })
        })
        .catch(e => {
            ChatLib.chat("&cInvalid username!");
            print(`Username not found:\n${JSON.stringify(e)}`);
        });
}

register("command", name => {
    if (!allowUsage) {
        ChatLib.chat(`&cYou are not allowed to use that in this area!`)
        return;
    }
    getSWData(name)
}).setName("swstats");
register("command", name => {
    if (!allowUsage) {
        ChatLib.chat(`&cYou are not allowed to use that in this area!`)
        return;
    }
    getExtraSWData(name)
}).setName("extraswstats");
register("command", name => {
    if (!allowUsage) {
        ChatLib.chat(`&cYou are not allowed to use that in this area!`)
        return;
    }
    getBWData(name)
}).setName("bwstats");
register("command", name => {
    if (!allowUsage) {
        ChatLib.chat(`&cYou are not allowed to use that in this area!`)
        return;
    }
    getExtraBWData(name)
}).setName("extrabwstats");
register("command", name => {
    if (!allowUsage) {
        ChatLib.chat(`&cYou are not allowed to use that in this area!`)
        return;
    }
    getDuelsData(name)
}).setName("duelsstats");
register("command", () => {
    ChatLib.chat("&9&m---------------------------------")
    ChatLib.chat("&aStats Commands")
    ChatLib.chat("&e/bwstats&8 - &7Shows useful BedWars Stats")
    ChatLib.chat("&e/extrabwstats&8 - &7Shows some extra BedWars Stats")
    ChatLib.chat("&e/swstats&8 - &7Shows useful SkyWars Stats")
    ChatLib.chat("&e/extraswstats&8 - &7Shows some extra SkyWars Stats")
    ChatLib.chat("&e/duelsstats&8 - &7Shows useful Duels Stats")
    ChatLib.chat("&e/statshelp&8 - &7Shows this message")
    ChatLib.chat("&9&m---------------------------------")
}).setName("statshelp");