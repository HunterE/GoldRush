var PrestigeSystem = (function () {
    function PrestigeSystem() {
        this.lowestUnregisteredId = 0;
        this.Name = "Prestige";
        this.Reset();
    }
    PrestigeSystem.prototype.Reset = function () {
        if (this.items) {
            for (var i = 0; i < this.items.length; ++i) {
                if (this.items[i].Active) {
                    for (var x = 0; x < this.items[i].Rewards.length; ++x) {
                        this.items[i].Rewards[x].Effect[0].deactivate();
                    }
                }
            }
        }

        this.lowestUnregisteredId = 0;
        this.items = new Array();
    };

    PrestigeSystem.prototype.RegisterItem = function (prestige) {
        prestige.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = prestige;
        this.lowestUnregisteredId++;
        this.HighestPrestige = prestige;
    };

    PrestigeSystem.prototype.ActivateRewards = function () {
        for (var i = 0; i < this.items.length; ++i) {
            var pres = this.items[i];
            if (pres.Active) {
                for (var u = 0; u < pres.Rewards.length; ++u) {
                    pres.Rewards[u].Activate();
                }
            }
        }
    };

    PrestigeSystem.prototype.CheckRequirements = function (pres) {
        var done = true;
        for (var i = 0; i < pres.Requirements.length; ++i) {
            if (!pres.Requirements[i].Condition.condition()) {
                done = false;
            }
        }
        return done;
    };

    PrestigeSystem.prototype.Prestige = function (pres) {
        if (this.CheckRequirements(pres)) {
            pres.Active = true;
            data.softReset();
            this.ActivateRewards();
            game.prestigeUI.draw();
        }
    };

    PrestigeSystem.prototype.GetHighestPrestige = function () {
        for (var i = 0; i < this.items.length; ++i) {
            if (i === this.items.length - 1) {
                return this.items[i];
            }

            if (this.items[i].Active && !this.items[i + 1].Active) {
                return this.items[i];
            }
        }
    };
    return PrestigeSystem;
})();

var Prestige = (function () {
    function Prestige() {
        this.Active = false;
        this.Rewards = new Array();
        this.Requirements = new Array();
    }
    Prestige.prototype.SetID = function (id) {
        this.ID = id;
    };

    Prestige.prototype.SetActive = function (active) {
        this.Active = active;
        return this;
    };

    Prestige.prototype.SetItem = function (item) {
        this.Item = item;
        return this;
    };

    Prestige.prototype.AddRequirements = function (achievements) {
        this.Requirements = new Array();
        this.Requirements = this.Requirements.concat(this.Requirements, achievements);
        return this;
    };

    Prestige.prototype.AddRewards = function (upgrades) {
        this.Rewards = new Array();
        this.Rewards = this.Rewards.concat(this.Rewards, upgrades);
        return this;
    };
    return Prestige;
})();

var StonePrestige = new Prestige();

// Copper Requirements.
var CopperPrestigeStoneReq = new Achievement().SetCondition(new AchievementAlltime(Item[1] = [Stone], 10000000));
var CopperPrestigeLumberReq = new Achievement().SetCondition(new AchievementAlltime(Item[1] = [Logs], 2500000));
var CopperPrestigeTitBarReq = new Achievement().SetCondition(new AchievementAlltime(Item[1] = [Titanium_bar], 250));
var CopperPrestigeCoinsReq = new Achievement().SetCondition(new AchievementQuantity(Item[1] = [Coins], 5000000000));
var CopperPrestigeDiamondsReq = new Achievement().SetCondition(new AchievementQuantity(Item[1] = [Diamond], 500));

// Copper Rewards
var CopperPrestigeValueUpgrade = new Upgrade().AddEffect(new ItemValueUpgradeEffect(0.25));
var CopperPrestigeClickingUpgrade = new Upgrade().AddEffect(new EfficiencyMagnitudeUpgradeEffect(1, Gatherer[1] = [Player]));
var CopperPrestigeProcessorUpgrade = new Upgrade().AddEffect(new ManufacturerEfficiencyUpgradeEffect(0.50, Processor[2] = [Furnace, Cauldron]));

var CopperPrestige = new Prestige();

var IronPrestige = new Prestige();
//# sourceMappingURL=PrestigeSystem.js.map
