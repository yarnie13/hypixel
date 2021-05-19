import { SettingsObject, Setting } from "../SettingsManager/SettingsManager";

const BedwarsStatsSettings = new SettingsObject("BedwarsStats", [
    {
        name: "Stats Format Settings",
        settings: [
            new Setting.Toggle("Show Stars", true),
            new Setting.Toggle("Show FKDR", true),
            new Setting.Toggle("Show WLR", true),
            new Setting.Toggle("Show Beds Broken", true),
            new Setting.Toggle("Show Final Kills", true),
            new Setting.Toggle("Seperate Title and Stats", true),
            new Setting.Toggle("Seperate Stats and Chat", true),
            new Setting.TextInput("Title", "&f[&6{name}'s &fStats]\\n"),
            new Setting.TextInput("Stars", "&3&lStars: &e{stars}\\n\\n"),
            new Setting.TextInput("FKDR", "&3&lFKDR: &e{fkdr}\\n\\n"),
            new Setting.TextInput("WLR", "&3&lWLR: &e{wlr}\\n\\n"),
            new Setting.TextInput("Beds Broken", "&3&lBeds Broken: &e{beds broken}\\n\\n"),
            new Setting.TextInput("Final Kills", "&3&lFinal Kills: &e{final kills}"),
            new Setting.Button("Reset Settings", "Click Here", function() {
                BedwarsStatsSettings.reset();
                BedwarsStatsSettings.load();
            })
        ]
    },
]);

class SettingsCache_ {
    constructor(settings) {
        this.settings = settings;
        this.showStars = settings.getSetting("Stats Format Settings", "Show Stars");
        this.showFkdr = settings.getSetting("Stats Format Settings", "Show FKDR");
        this.showWlr = settings.getSetting("Stats Format Settings", "Show WLR");
        this.showBedsBroken = settings.getSetting("Stats Format Settings", "Show Beds Broken");
        this.showFinalKills = settings.getSetting("Stats Format Settings", "Show Final Kills");
        this.title = settings.getSetting("Stats Format Settings", "Title");
        this.stars = settings.getSetting("Stats Format Settings", "Stars");
        this.fkdr = settings.getSetting("Stats Format Settings", "FKDR");
        this.wlr = settings.getSetting("Stats Format Settings", "WLR");
        this.bedsBroken = settings.getSetting("Stats Format Settings", "Beds Broken");
        this.finalKills = settings.getSetting("Stats Format Settings", "Final Kills");
    }

    recache = () => {
        this.showStars = this.settings.getSetting("Stats Format Settings", "Show Stars");
        this.showFkdr = this.settings.getSetting("Stats Format Settings", "Show FKDR");
        this.showWlr = this.settings.getSetting("Stats Format Settings", "Show WLR");
        this.showBedsBroken = this.settings.getSetting("Stats Format Settings", "Show Beds Broken");
        this.showFinalKills = this.settings.getSetting("Stats Format Settings", "Show Final Kills");
        this.title = this.settings.getSetting("Stats Format Settings", "Title");
        this.stars = this.settings.getSetting("Stats Format Settings", "Stars");
        this.fkdr = this.settings.getSetting("Stats Format Settings", "FKDR");
        this.wlr = this.settings.getSetting("Stats Format Settings", "WLR");
        this.bedsBroken = this.settings.getSetting("Stats Format Settings", "Beds Broken");
        this.finalKills = this.settings.getSetting("Stats Format Settings", "Final Kills");
    }
}


BedwarsStatsSettings.setCommand("bwsettings").setSize(400, 400).setColor(0xfff9ac59);


Setting.register(BedwarsStatsSettings);

const SettingsCache = new SettingsCache_(BedwarsStatsSettings);

export { BedwarsStatsSettings as default, SettingsCache };