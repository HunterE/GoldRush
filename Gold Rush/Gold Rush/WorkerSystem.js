var GathererSystem = (function () {
    function GathererSystem() {
        this.lowestUnregisteredId = 0;
        this.Name = "Gatherer";
        this.Reset();
    }
    GathererSystem.prototype.CalculateGatherers = function () {
        for (var i = 0; i < this.items.length; ++i) {
            this.items[i].CalculateMiningStuff();
        }
    };

    GathererSystem.prototype.Reset = function () {
        this.lowestUnregisteredId = 0;
        this.items = new Array();
    };

    GathererSystem.prototype.LookupGatherer = function (id) {
        return this.items[id];
    };

    GathererSystem.prototype.RegisterItem = function (gatherer) {
        gatherer.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = gatherer;
        this.lowestUnregisteredId++;
    };

    GathererSystem.prototype.Purchase = function (id) {
        var gatherer = this.items[id];

        if (game.inventory.deductFunds(gatherer.GetPrice())) {
            gatherer.Quantity++;
        }
    };

    GathererSystem.prototype.Mine = function () {
        for (var i = 0; i < this.items.length; ++i) {
            var gatherer = this.items[i];
            if (gatherer.AutoMine) {
                gatherer.Mine();
            }
        }
    };
    return GathererSystem;
})();

var Gatherer = (function () {
    function Gatherer() {
        this.AutoMine = true;
        this.Display = true;
        this.EfficiencyModifier = 0;
        this.ProbabilityModifier = 0;
        this.StoreCategory = 1 /* Machines */;
        this.ChanceOfNothing = 0;
        this.MineableOre = new Array();
        this.GuaranteedOre = new Array();
    }
    Gatherer.prototype.CalculateMiningStuff = function () {
        var probabilityMean = 0;
        this.TotalOreProbability = 0;
        this.MinePerTick = 0;

        this.OreProbability = new Array();
        for (var i = 0; i < this.MineableOre.length; ++i) {
            var prob = this.MineableOre[i].Probability;
            this.OreProbability[i] = prob;
            probabilityMean += prob;
            this.TotalOreProbability += prob;
        }
        probabilityMean /= this.MineableOre.length;

        for (i = 0; i < this.MineableOre.length; ++i) {
            if (this.OreProbability[i] >= probabilityMean) {
                this.OreProbability[i] *= (1 - this.ProbabilityModifier);
            } else {
                this.OreProbability[i] *= (1 + this.ProbabilityModifier);
            }
        }

        this.MinePerTick = Math.floor(this.Quantity * (this.Efficiency * (this.EfficiencyModifier + 1)));
    };

    Gatherer.prototype.Mine = function () {
        this.CalculateMiningStuff();

        if (this.MineableOre.length > 0)
            for (var i = 0; i < this.MinePerTick; ++i) {
                var num = randomInt(0, this.TotalOreProbability);
                var cur = 0;
                for (var x = 0; x < this.OreProbability.length; ++x) {
                    cur += this.OreProbability[x];
                    if (num < cur) {
                        if (randomInt(0, this.ChanceOfNothing) === 0) {
                            this.MineableOre[x].Gather();
                        }
                        break;
                    }
                }
            }

        var guaranteedOrePerTick = Math.floor(this.Quantity * (1 + this.EfficiencyModifier));

        for (i = 0; i < guaranteedOrePerTick; ++i) {
            for (x = 0; x < this.GuaranteedOre.length; ++x) {
                this.GuaranteedOre[x].Gather();
            }
        }
    };
    Gatherer.prototype.SetNothingChance = function (no) {
        this.ChanceOfNothing = no;
        return this;
    };
    Gatherer.prototype.SetAutoMine = function (a) {
        this.AutoMine = a;
        return this;
    };
    Gatherer.prototype.GetPrice = function () {
        var pricem = Math.pow(this.PriceModifier, this.Quantity);
        return Math.ceil(pricem * this.BasePrice);
    };
    Gatherer.prototype.SetBasePrice = function (bp) {
        this.BasePrice = bp;
        return this;
    };
    Gatherer.prototype.SetPriceModifier = function (pm) {
        this.PriceModifier = pm;
        return this;
    };
    Gatherer.prototype.SetID = function (id) {
        this.ID = id;
    };
    Gatherer.prototype.SetDisplay = function (disp) {
        this.Display = disp;
        return this;
    };
    Gatherer.prototype.SetName = function (name) {
        this.Name = name;
        return this;
    };
    Gatherer.prototype.SetQuantity = function (quantity) {
        this.Quantity = quantity;
        return this;
    };
    Gatherer.prototype.SetFuelConsumed = function (consumed) {
        this.FuelConsumed = consumed;
        return this;
    };
    Gatherer.prototype.SetMaxOwned = function (max) {
        this.MaxOwned = max;
        return this;
    };
    Gatherer.prototype.AddGuaranteedOre = function (item) {
        this.GuaranteedOre.push(item);
        return this;
    };
    Gatherer.prototype.AddMineableOre = function (item) {
        this.MineableOre.push(item);
        return this;
    };
    Gatherer.prototype.AddMineableOres = function (items) {
        this.MineableOre = this.MineableOre.concat(this.MineableOre, items);
        return this;
    };
    Gatherer.prototype.SetEfficiency = function (ef) {
        this.Efficiency = ef;
        return this;
    };
    Gatherer.prototype.SetStoreCategory = function (sc) {
        this.StoreCategory = sc;
        return this;
    };
    return Gatherer;
})();

var Player = new Gatherer();
var Miner = new Gatherer();
var Lumberjack = new Gatherer();
var Pumpjack = new Gatherer();
var BigTexan = new Gatherer();
var Drill = new Gatherer();
var Crusher = new Gatherer();
var Excavator = new Gatherer();
var MegaDrill = new Gatherer();
//# sourceMappingURL=WorkerSystem.js.map
