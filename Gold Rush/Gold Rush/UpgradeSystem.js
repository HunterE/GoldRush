var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var UpgradeSystem = (function () {
    function UpgradeSystem() {
        this.lowestUnregisteredId = 0;
        this.Name = "Upgrade";
        this.Reset();
    }
    UpgradeSystem.prototype.LookupUpgrade = function (id) {
        return this.items[id];
    };

    UpgradeSystem.prototype.RegisterItem = function (upgrade) {
        upgrade.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = upgrade;
        this.lowestUnregisteredId++;
    };

    UpgradeSystem.prototype.ActivateOnLoad = function () {
        for (var i = 0; i < this.items.length; ++i) {
            if (this.items[i].Active) {
                this.items[i].Activate();
            }
        }
    };

    UpgradeSystem.prototype.Reset = function () {
        if (this.items) {
            for (var i = 0; i < this.items.length; ++i) {
                if (this.items[i].Active) {
                    for (var x = 0; x < this.items[i].Effect.length; ++x) {
                        this.items[i].Effect[x].deactivate();
                    }
                }
            }
        }
        this.lowestUnregisteredId = 0;
        this.items = new Array();
    };

    UpgradeSystem.prototype.Purchase = function (id) {
        var upgrade = this.items[id];

        if (game.inventory.deductFunds(upgrade.Price)) {
            upgrade.Activate();
        }
    };
    return UpgradeSystem;
})();

var Upgrade = (function () {
    function Upgrade() {
        this.Display = true;
        this.Price = 0;
        this.Effect = new Array();
    }
    Upgrade.prototype.Activate = function () {
        this.Active = true;
        for (var i = 0; i < this.Effect.length; ++i) {
            this.Effect[i].effect();
        }
    };

    Upgrade.prototype.Deactivate = function () {
        this.Active = false;
        for (var i = 0; i < this.Effect.length; ++i) {
            this.Effect[i].deactivate();
        }
    };

    Upgrade.prototype.GetPrice = function (currAmm) {
        return this.Price;
    };
    Upgrade.prototype.GetTooltip = function () {
        var tooltip = "";
        for (var i = 0; i < this.Effect.length; ++i) {
            tooltip += (this.Effect[i].tooltip() + ". ");
        }

        return tooltip;
    };
    Upgrade.prototype.SetDisplay = function (disp) {
        this.Display = disp;
        return this;
    };
    Upgrade.prototype.SetID = function (id) {
        this.ID = id;
    };
    Upgrade.prototype.SetName = function (name) {
        this.Name = name;
        return this;
    };
    Upgrade.prototype.SetActive = function (active) {
        this.Active = active;
        return this;
    };
    Upgrade.prototype.SetRequires = function (upgrade) {
        this.Requires = upgrade;
        return this;
    };
    Upgrade.prototype.SetType = function (type) {
        this.Type = type;
        return this;
    };
    Upgrade.prototype.AddEffect = function (effect) {
        this.Effect.push(effect);
        return this;
    };
    Upgrade.prototype.SetPrice = function (price) {
        this.Price = price;
        return this;
    };
    Upgrade.prototype.SetRecipe = function (recipe) {
        this.Recipe = recipe;
        return this;
    };
    Upgrade.prototype.SetStoreCategory = function (sc) {
        this.StoreCategory = sc;
        return this;
    };
    return Upgrade;
})();

var UpgradeType;
(function (UpgradeType) {
    UpgradeType[UpgradeType["Purchased"] = 0] = "Purchased";
    UpgradeType[UpgradeType["Crafted"] = 1] = "Crafted";
})(UpgradeType || (UpgradeType = {}));

var UpgradeEffect = (function () {
    function UpgradeEffect() {
        this.duration = -1;
    }
    UpgradeEffect.prototype.effect = function () {
    };

    UpgradeEffect.prototype.deactivate = function () {
    };

    UpgradeEffect.prototype.tooltip = function () {
    };
    return UpgradeEffect;
})();

var OreUpgradeEffect = (function (_super) {
    __extends(OreUpgradeEffect, _super);
    function OreUpgradeEffect(ores, ga) {
        this.AddedOre = new Array();
        this.AffectedGatherers = new Array();
        this.AddedOre = this.AddedOre.concat(ores);
        this.AffectedGatherers = this.AffectedGatherers.concat(ga);

        _super.call(this);
    }
    OreUpgradeEffect.prototype.effect = function () {
        for (var gatherer in this.AffectedGatherers) {
            this.AffectedGatherers[gatherer].MineableOre = this.AffectedGatherers[gatherer].MineableOre.concat(this.AddedOre);
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    };

    OreUpgradeEffect.prototype.deactivate = function () {
        for (var gatherer in this.AffectedGatherers) {
            for (var i = 0; i < this.AddedOre.length; ++i) {
                for (var x = 0; x < this.AffectedGatherers[gatherer].MineableOre.length; ++x) {
                    if (this.AddedOre[i] === this.AffectedGatherers[gatherer].MineableOre[x]) {
                        this.AffectedGatherers[gatherer].MineableOre.splice(x, 1);
                    }
                }
            }
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    };

    OreUpgradeEffect.prototype.tooltip = function () {
        var tooltip = "Discovers: ";
        var names = Array();
        for (var i = 0; i < this.AddedOre.length; ++i) {
            names.push(this.AddedOre[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        return tooltip;
    };
    return OreUpgradeEffect;
})(UpgradeEffect);

var EfficiencyUpgradeEffect = (function (_super) {
    __extends(EfficiencyUpgradeEffect, _super);
    function EfficiencyUpgradeEffect(ef, ga) {
        this.AffectedGatherers = new Array();
        this.AffectedGatherers = this.AffectedGatherers.concat(ga);
        this.Efficiency = ef;
        _super.call(this);
    }
    EfficiencyUpgradeEffect.prototype.effect = function () {
        for (var gatherer in this.AffectedGatherers) {
            if (this.AffectedGatherers[gatherer].Efficiency === 0 || !this.AffectedGatherers[gatherer].Efficiency) {
                this.AffectedGatherers[gatherer].Efficiency = this.Efficiency;
            } else {
                this.AffectedGatherers[gatherer].Efficiency += this.Efficiency;
            }
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    };

    EfficiencyUpgradeEffect.prototype.deactivate = function () {
        for (var gatherer in this.AffectedGatherers) {
            this.AffectedGatherers[gatherer].Efficiency -= this.Efficiency;
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    };

    EfficiencyUpgradeEffect.prototype.tooltip = function () {
        var tooltip = "Increases resources gathered per tick by " + this.Efficiency + " for ";
        var names = Array();
        for (var i = 0; i < this.AffectedGatherers.length; ++i) {
            names.push(this.AffectedGatherers[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        return tooltip;
    };
    return EfficiencyUpgradeEffect;
})(UpgradeEffect);

var EfficiencyMagnitudeUpgradeEffect = (function (_super) {
    __extends(EfficiencyMagnitudeUpgradeEffect, _super);
    function EfficiencyMagnitudeUpgradeEffect(ef, ga) {
        this.AffectedGatherers = new Array();
        this.AffectedGatherers = this.AffectedGatherers.concat(ga);
        this.Efficiency = ef;
        _super.call(this);
    }
    EfficiencyMagnitudeUpgradeEffect.prototype.effect = function () {
        for (var gatherer in this.AffectedGatherers) {
            this.AffectedGatherers[gatherer].EfficiencyModifier += this.Efficiency;
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    };

    EfficiencyMagnitudeUpgradeEffect.prototype.deactivate = function () {
        for (var gatherer in this.AffectedGatherers) {
            this.AffectedGatherers[gatherer].EfficiencyModifier -= this.Efficiency;
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    };

    EfficiencyMagnitudeUpgradeEffect.prototype.tooltip = function () {
        var tooltip = "Increases resources gathered by " + (this.Efficiency * 100) + "% for ";
        var names = Array();
        for (var i = 0; i < this.AffectedGatherers.length; ++i) {
            names.push(this.AffectedGatherers[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        return tooltip;
    };
    return EfficiencyMagnitudeUpgradeEffect;
})(UpgradeEffect);

var ProbabilityUpgradeEffect = (function (_super) {
    __extends(ProbabilityUpgradeEffect, _super);
    function ProbabilityUpgradeEffect(prob, ga) {
        this.AffectedGatherers = new Array();
        this.AffectedGatherers = this.AffectedGatherers.concat(ga);
        this.Probability = prob;
        _super.call(this);
    }
    ProbabilityUpgradeEffect.prototype.effect = function () {
        for (var gatherer in this.AffectedGatherers) {
            if (!this.AffectedGatherers[gatherer].ProbabilityModifier) {
                this.AffectedGatherers[gatherer].ProbabilityModifier = 0;
            }
            this.AffectedGatherers[gatherer].ProbabilityModifier += this.Probability;
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    };

    ProbabilityUpgradeEffect.prototype.deactivate = function () {
        for (var gatherer in this.AffectedGatherers) {
            this.AffectedGatherers[gatherer].ProbabilityModifier -= this.Probability;
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    };

    ProbabilityUpgradeEffect.prototype.tooltip = function () {
        var tooltip = "Increases chance of gathering rare resources by " + (this.Probability * 100).toString() + "% for ";
        var names = Array();
        for (var i = 0; i < this.AffectedGatherers.length; ++i) {
            names.push(this.AffectedGatherers[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        return tooltip;
    };
    return ProbabilityUpgradeEffect;
})(UpgradeEffect);

var ManufacturerEfficiencyUpgradeEffect = (function (_super) {
    __extends(ManufacturerEfficiencyUpgradeEffect, _super);
    function ManufacturerEfficiencyUpgradeEffect(ef, proc) {
        this.Efficiency = ef;
        this.AffectedProcessors = proc;
        _super.call(this);
    }
    ManufacturerEfficiencyUpgradeEffect.prototype.effect = function () {
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            this.AffectedProcessors[i].Efficiency += this.Efficiency;
        }
    };

    ManufacturerEfficiencyUpgradeEffect.prototype.deactivate = function () {
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            this.AffectedProcessors[i].Efficiency -= this.Efficiency;
        }
    };

    ManufacturerEfficiencyUpgradeEffect.prototype.tooltip = function () {
        var names = Array();
        var tooltip = "Increases speed of ";
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            names.push(this.AffectedProcessors[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        tooltip = tooltip.concat(" by " + (this.Efficiency * 100) + "%");
        return tooltip;
    };
    return ManufacturerEfficiencyUpgradeEffect;
})(UpgradeEffect);

var ManufacturerUnlockUpgradeEffect = (function (_super) {
    __extends(ManufacturerUnlockUpgradeEffect, _super);
    function ManufacturerUnlockUpgradeEffect(proc) {
        this.ActivatedProcessor = proc;
        _super.call(this);
    }
    ManufacturerUnlockUpgradeEffect.prototype.effect = function () {
        this.ActivatedProcessor.Enabled = true;
    };

    ManufacturerUnlockUpgradeEffect.prototype.deactivate = function () {
        this.ActivatedProcessor.Enabled = false;
    };

    ManufacturerUnlockUpgradeEffect.prototype.tooltip = function () {
        var tooltip = "Unlocks: " + this.ActivatedProcessor.Name;
        return tooltip;
    };
    return ManufacturerUnlockUpgradeEffect;
})(UpgradeEffect);

var ItemValueUpgradeEffect = (function (_super) {
    __extends(ItemValueUpgradeEffect, _super);
    function ItemValueUpgradeEffect(v) {
        this.Value = v;
        _super.call(this);
    }
    ItemValueUpgradeEffect.prototype.effect = function () {
        for (var i = 0; i < game.itemSystem.items.length; ++i) {
            game.itemSystem.items[i].ValueModifier += this.Value;
        }
    };

    ItemValueUpgradeEffect.prototype.deactivate = function () {
        for (var i = 0; i < game.itemSystem.items.length; ++i) {
            game.itemSystem.items[i].ValueModifier -= this.Value;
        }
    };

    ItemValueUpgradeEffect.prototype.tooltip = function () {
        return "Increases value of items by " + (this.Value * 100) + "%";
    };
    return ItemValueUpgradeEffect;
})(UpgradeEffect);

var ManufacturerCapacityUpgradeEffect = (function (_super) {
    __extends(ManufacturerCapacityUpgradeEffect, _super);
    function ManufacturerCapacityUpgradeEffect(cap, proc) {
        this.Capacity = cap;
        this.AffectedProcessors = proc;
        _super.call(this);
    }
    ManufacturerCapacityUpgradeEffect.prototype.effect = function () {
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            this.AffectedProcessors[i].Capacity += this.Capacity;
        }
    };

    ManufacturerCapacityUpgradeEffect.prototype.deactivate = function () {
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            this.AffectedProcessors[i].Capacity -= this.Capacity;
        }
    };

    ManufacturerCapacityUpgradeEffect.prototype.tooltip = function () {
        var names = Array();
        var tooltip = "Increases capacity of ";
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            names.push(this.AffectedProcessors[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        tooltip = tooltip.concat(" by " + this.Capacity);
        return tooltip;
    };
    return ManufacturerCapacityUpgradeEffect;
})(UpgradeEffect);

// Upgrade effects.
var Mechanic_Effect = new EfficiencyUpgradeEffect(5, Gatherer[4] = [Drill, Crusher, Excavator, MegaDrill]);
var ExpertMechanic_Effect = new EfficiencyUpgradeEffect(10, Gatherer[4] = [Drill, Crusher, Excavator, MegaDrill]);
var Foreman_Effect = new EfficiencyMagnitudeUpgradeEffect(0.15, Gatherer[2] = [Miner, Lumberjack]);
var Dictator_Effect = new EfficiencyMagnitudeUpgradeEffect(0.25, Gatherer[2] = [Miner, Lumberjack]);
var Oilbaron_Effect = new EfficiencyMagnitudeUpgradeEffect(0.20, Gatherer[2] = [Pumpjack]);

var ClickUpgrade_Effect = new EfficiencyUpgradeEffect(1, Gatherer[1] = [Player]);
var ClickUpgrade2_Effect = new EfficiencyUpgradeEffect(5, Gatherer[1] = [Player]);
var ClickUpgrade3_Effect = new EfficiencyUpgradeEffect(10, Gatherer[1] = [Player]);
var GoldenClick_Effect = new EfficiencyUpgradeEffect(25, Gatherer[1] = [Player]);

var IronPickaxe_Effect = new ProbabilityUpgradeEffect(0.05, Gatherer[1] = [Player]);
var SteelPickaxe_Effect = new ProbabilityUpgradeEffect(0.10, Gatherer[1] = [Player]);
var GoldPickaxe_Effect = new ProbabilityUpgradeEffect(0.15, Gatherer[1] = [Player]);
var DiamondPickaxe_Effect = new ProbabilityUpgradeEffect(0.20, Gatherer[1] = [Player]);

var Researcher_Effect = new OreUpgradeEffect(Item[3] = [Sapphire, Emerald, Ruby], Gatherer[6] = [Player, Miner, Drill, Crusher, Excavator, MegaDrill]);
var Geologist_Effect = new OreUpgradeEffect(Item[3] = [Onyx, Quartz, Diamond], Gatherer[6] = [Player, Miner, Drill, Crusher, Excavator, MegaDrill]);
var Backpack_Effect = new OreUpgradeEffect(Item[4] = [Sito, Ardigal, Redberries, Jangerberries], Gatherer[1] = [Lumberjack]);
var Botanist_Effect = new OreUpgradeEffect(Item[3] = [Volencia, Fellstalk, Snape_grass], Gatherer[1] = [Lumberjack]);
var Tunnels_Effect = new OreUpgradeEffect(Item[2] = [Uranium, Titanium], Gatherer[6] = [Player, Miner, Drill, Crusher, Excavator, MegaDrill]);

var SpeechPotion_Effect = new ItemValueUpgradeEffect(0.2);
var SmeltingPotion_Effect = new ManufacturerEfficiencyUpgradeEffect(0.75, Processor[1] = [Furnace]);
var AlchemyPotion_Effect = new ManufacturerEfficiencyUpgradeEffect(0.50, Processor[1] = [Cauldron]);
var ClickingPotion_Effect = new EfficiencyMagnitudeUpgradeEffect(2.50, Gatherer[1] = [Player]);

// Upgrade recipes.
var GoldenClick_Recipe = new Recipe().AddInput(new ItemQuantityPair(Gold_bar, 50));
var Tunnels_Recipe = new Recipe().AddInput(new ItemQuantityPair(TNT, 500));
var Backpack_Recipe = new Recipe().AddInput(new ItemQuantityPair(Copper_Wire, 100));
var LargerCauldron_Recipe = new Recipe().AddInput(new ItemQuantityPair(Iron_bar, 50));
var ReinforcedFurnace_Recipe = new Recipe().AddInput(new ItemQuantityPair(Stone, 50000)).AddInput(new ItemQuantityPair(Iron_bar, 100));
var HotterFurnace_Recipe = new Recipe().AddInput(new ItemQuantityPair(Stone, 10000)).AddInput(new ItemQuantityPair(Logs, 50000));
var EnchantedCauldron_Recipe = new Recipe().AddInput(new ItemQuantityPair(Logs, 25000)).AddInput(new ItemQuantityPair(Iron_bar, 100));

// Upgrades.
var ClickUpgrade = new Upgrade();
var ClickUpgrade2 = new Upgrade();
var ClickUpgrade3 = new Upgrade();
var GoldenClick = new Upgrade();

var IronPickaxe = new Upgrade();
var SteelPickaxe = new Upgrade();
var GoldPickaxe = new Upgrade();
var DiamondPickaxe = new Upgrade();

var Researcher = new Upgrade();
var Geologist = new Upgrade();
var Backpack = new Upgrade();
var Botanist = new Upgrade();
var Tunnels = new Upgrade();

var Foreman = new Upgrade();
var Dictator = new Upgrade();
var Mechanic = new Upgrade();
var ExpertMechanic = new Upgrade();
var OilBaron = new Upgrade();

var EnchantedCauldron_Effect = new ManufacturerEfficiencyUpgradeEffect(0.5, Processor[1] = [Cauldron]);
var CauldronUnlock_Effect = new ManufacturerUnlockUpgradeEffect(Cauldron);
var FurnaceUnlock_Effect = new ManufacturerUnlockUpgradeEffect(Furnace);
var ReinforcedFurnace_Effect = new ManufacturerCapacityUpgradeEffect(150, Processor[1] = [Furnace]);
var LargerCauldron_Effect = new ManufacturerCapacityUpgradeEffect(9, Processor[1] = [Cauldron]);
var Witch_Effect = new ManufacturerEfficiencyUpgradeEffect(0.5, Processor[1] = [Cauldron]);
var Blacksmith_Effect = new ManufacturerEfficiencyUpgradeEffect(0.25, Processor[1] = [Furnace]);
var HotterFurnace_Effect = new ManufacturerEfficiencyUpgradeEffect(0.25, Processor[1] = [Furnace]);

var FurnaceUnlock = new Upgrade();
var LargerCauldron = new Upgrade();
var EnchantedCauldron = new Upgrade();
var ReinforcedFurnace = new Upgrade();
var HotterFurnace = new Upgrade();
var CauldronUnlock = new Upgrade();
var Witch = new Upgrade();
var Blacksmith = new Upgrade();
//# sourceMappingURL=UpgradeSystem.js.map
