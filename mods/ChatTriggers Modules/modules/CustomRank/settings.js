const { Setting, SettingsObject } = require("../SettingsManager/SettingsManager");

const CustomRankSettings = new SettingsObject("CustomRank", [
    {
        name: "CustomRank",
        settings: [
            new Setting.Toggle("Custom Rank Enabled", true),
            new Setting.Toggle("Easy Switch Enabled", false),
            new Setting.Toggle("Name Change Enabled", false),
            new Setting.TextInput("Anything as Rank", "&c[Example]"),
            new Setting.TextInput("Custom Name", Player.getName()),
            new Setting.StringSelector("Easy Rank Switch", 0, [
                "&a[VIP]", 
                "&a[VIP&6+&a]", 
                "&b[MVP]", 
                "&b[MVP&c+&b]", 
                "&6[MVP&c++&6]",
                "&1[HELPER]",
                "&2[MOD]",
                "&3[BUILD TEAM]",
                "&c[ADMIN]",
                "&c[OWNER]",
                "&c[&fYOUTUBE&c]",
                "&6[MOJANG]",
                "&b[Mixer]",
                "&c[&aMC&fProHosting&c]",
                "&c[SLOTH]",
                "&c[ANGUS]",
                "&6[APPLE]",
                "&6[EVENTS]",
                "&c[MCP]",
                "&d[PIG]",
                "&d[PIG&b+&d]",
                "&d[PIG&b++&d]",
                "&1[JR HELPER]",
                "&a[LOL]",
                "&a[LOL&6+&a]",
                "&3[BUILD TEAM&c+&3]",
                "&0[SPECIAL]",
                "&c[RETIRED]",
                "&d[BETA TESTER]",
                "&e[GOD]",
                "[ABOVE THE RULES]",
            ]),
            new Setting.Button("Reset Settings", "Click Here", function() {
                CustomRankSettings.reset();
                CustomRankSettings.load();
            })
        ]
    },
]);

CustomRankSettings.setCommand("customrank").setSize(200, 150);

module.exports = CustomRankSettings;
