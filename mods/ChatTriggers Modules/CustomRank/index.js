const CustomRankSettings = require('./settings.js')
const {
    Setting
} = require("../SettingsManager/SettingsManager");
Setting.register(CustomRankSettings);


class CustomRank {
    constructor(player) {
        this.playerName = player;
        this.useCustomName = getSetting("Name Change Enabled");
        this.customName = getSetting("Custom Name");
        this.easyRankSwitchEnabled = getSetting("Easy Switch Enabled");
        this.easyRankSwitchValue = getSetting("Easy Rank Switch");
        this.freeTextValueRank = getSetting("Anything as Rank");
        this.settingsUpdateInterval = 1;
    };

    getScoreboardValue(regex) {
        const scLines = Scoreboard.getLines();
        let retVal = undefined;
        scLines.forEach(scLine => {
            if (regex.test(scLine.getName())) {
                retVal = scLine.getPoints();
            }
        });
        return retVal;
    };

    updateSettings() {
        this.useCustomName = getSetting("Name Change Enabled");
        this.customName = getSetting("Custom Name");
        this.easyRankSwitchEnabled = getSetting("Easy Switch Enabled");
        this.easyRankSwitchValue = getSetting("Easy Rank Switch");
        this.freeTextValueRank = getSetting("Anything as Rank");
    };

    getTabName() {
        let tabName;
        if (this.easyRankSwitchEnabled) {
            tabName = this.easyRankSwitchValue;
            tabName += this.useCustomName ? " " + this.customName : " " + this.playerName;
            Player.setTabDisplayName(new TextComponent(tabName));
        } else {
            tabName = this.freeTextValueRank;
            tabName += this.useCustomName ? " " + this.customName : " " + this.playerName;
            Player.setTabDisplayName(new TextComponent(tabName));
        }
        return tabName;
    };

    getChangedMessage(msg) {
        const customName = this.useCustomName ? this.customName : this.playerName;
        if (new RegExp("\[[A-Za-z&0-9\+]+\] " + this.playerName, "g").test(msg)) {
            // Message contains one of Hypixel's ranks and name
            msg = msg.replace(new RegExp("\[[A-Za-z&0-9\+]+\] " + this.playerName), this.easyRankSwitchEnabled ? this.easyRankSwitchValue + " " + customName : this.freeTextValueRank + " " + customName);
        } else if (new RegExp("(&r&7|&7)" + this.playerName).test(msg)) {
            // Replacer for players with no rank.
            msg = msg.replace(new RegExp("(&r&7|&7)" + this.playerName), this.easyRankSwitchEnabled ? this.easyRankSwitchValue + " " + customName : this.freeTextValueRank + " " + customName);
        } else {
            const lastFormat = (this.easyRankSwitchEnabled ? /[&a-f0-9rblomn]{2}/.exec(this.easyRankSwitchValue) : /[&a-f0-9rblomn]{2}/.exec(this.freeTextValueRank))[/[&a-f0-9rblomn]{2}/.exec(this.freeTextValueRank).length - 1];
            msg = msg.replace(new RegExp("[a-f0-9&]{2}" + this.playerName), lastFormat + this.playerName);
        }
        return msg;
    };

    renderScoreboard() {
        if (!getSetting("Custom Rank Enabled"))
            return;
        const setTextScore = this.easyRankSwitchEnabled ? this.easyRankSwitchValue.replace("[", "").replace("]", "").replaceAll("&", "§") : this.freeTextValueRank.replace("[", "").replace("]", "").replaceAll("&", "§");
        const scLine = this.getScoreboardValue(/Rank: .+/);
        if (scLine != undefined)
            Scoreboard.setLine(scLine, "Rank: " + setTextScore, true);
    };

    changeMessage(event) {
        if (!getSetting("Custom Rank Enabled"))
            return;
        const msg = this.getChangedMessage(ChatLib.getChatMessage(event, true));
        cancel(event);
        ChatLib.chat(msg);
    };

    setTabName() {
        if (!getSetting("Custom Rank Enabled"))
            return;
        const tabName = this.getTabName();
        Player.setTabDisplayName(new TextComponent(tabName));
    };

    settingsUpdater() {
        this.updateSettings();
    };

    registerTriggers() {
        register('command', () => CustomRankSettings.open()).setCommandName('crank');
        register('renderPlayerList', this.setTabName.bind(this));
        register('renderOverlay', this.renderScoreboard.bind(this));
        register('chat', this.changeMessage.bind(this)).setChatCriteria(this.playerName).setParameter('contains');
        register('step', this.settingsUpdater.bind(this)).setDelay(this.settingsUpdateInterval);
    };
}

const customRank = new CustomRank(Player.getName());
customRank.registerTriggers();
customRank.updateSettings();

String.prototype.replaceAll = function (find, replace) {
    const str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

function getSetting(whatSetting) {
    return CustomRankSettings.getSetting("CustomRank", whatSetting);
};