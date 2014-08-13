class GathererSystem {
    items : Array<Gatherer>;
    private lowestUnregisteredId: number = 0;
    public Name: string = "Gatherer";

    constructor() {
        this.Reset();
    }

    CalculateGatherers() {
        for (var i = 0; i < this.items.length; ++i) {
            this.items[i].CalculateMiningStuff();
        }
    }

    Reset() {
        this.lowestUnregisteredId = 0;
        this.items = new Array<Gatherer>();
    }

    LookupGatherer(id: number) {
        return this.items[id];
    }

    RegisterItem(gatherer: Gatherer) {
        gatherer.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = gatherer;
        this.lowestUnregisteredId++;
    }

    Purchase(id: number) {
        var gatherer = this.items[id];

        if (game.inventory.deductFunds(gatherer.GetPrice())) {// We've purchased the upgrade!
            gatherer.Quantity++;
        }
    }

    Mine() {
        for (var i = 0; i < this.items.length; ++i) {
            var gatherer = this.items[i];
            if (gatherer.AutoMine) {
                gatherer.Mine();
            }
        }
    }
}

class Gatherer {
    constructor() {
        this.MineableOre = new Array<Item>();
        this.GuaranteedOre = new Array<Item>();
    }

    public ID: number;
    public AutoMine: boolean = true;
    public Name: string;
    public BasePrice: number;
    public PriceModifier: number;
    public Display: boolean = true;
    public Quantity : number;
    public FuelConsumed: number;
    public Efficiency: number;
    public EfficiencyModifier: number = 0;
    public ProbabilityModifier: number = 0;
    public MaxOwned: number;
    public StoreCategory: StoreCategory = StoreCategory.Machines;
    public GuaranteedOre: Array<Item>;
    public MineableOre: Array<Item>;
    public ChanceOfNothing: number = 0;

    // Mining functions
    public OreProbability: Array<number>;
    public TotalOreProbability;
    public MinePerTick;

    public CalculateMiningStuff() {
        var probabilityMean = 0;
        this.TotalOreProbability = 0;
        this.MinePerTick = 0;

        this.OreProbability = new Array<number>();
        for (var i = 0; i < this.MineableOre.length; ++i) {
            var prob = this.MineableOre[i].Probability;
            this.OreProbability[i] = prob;
            probabilityMean += prob;
            this.TotalOreProbability += prob;
        }
        probabilityMean /= this.MineableOre.length;

        for (i = 0; i < this.MineableOre.length; ++i) {
            if (this.OreProbability[i] >= probabilityMean) { // This is a common ore. We'll reduce the chance of getting it.
                this.OreProbability[i] *= (1 - this.ProbabilityModifier);
            } else { // Uncommon ore. Increase the chance
                this.OreProbability[i] *= (1 + this.ProbabilityModifier);
            }
        }
        
        this.MinePerTick = Math.floor(this.Quantity * (this.Efficiency * (this.EfficiencyModifier+1)));
    }

    public Mine() {
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
    }
    public SetNothingChance(no: number): Gatherer {
        this.ChanceOfNothing = no;
        return this;
    }
    public SetAutoMine(a: boolean): Gatherer {
        this.AutoMine = a;
        return this;
    }
    public GetPrice() {
        var pricem: number = Math.pow(this.PriceModifier, this.Quantity);
        return Math.ceil(pricem * this.BasePrice);
    }
    public SetBasePrice(bp: number): Gatherer {
        this.BasePrice = bp;
        return this;
    }
    public SetPriceModifier(pm: number): Gatherer {
        this.PriceModifier = pm;
        return this;
    }
    public SetID(id: number) {
        this.ID = id;
    }
    public SetDisplay(disp: boolean): Gatherer {
        this.Display = disp;
        return this;
    }
    public SetName(name: string): Gatherer {
        this.Name = name;
        return this;
    }
    public SetQuantity(quantity: number): Gatherer {
        this.Quantity = quantity;
        return this;
    }
    public SetFuelConsumed(consumed: number): Gatherer {
        this.FuelConsumed = consumed;
        return this;
    }
    public SetMaxOwned(max: number): Gatherer {
        this.MaxOwned = max;
        return this;
    }
    public AddGuaranteedOre(item: Item): Gatherer {
        this.GuaranteedOre.push(item);
        return this;
    }
    public AddMineableOre(item: Item): Gatherer {
        this.MineableOre.push(item);
        return this;
    }
    public AddMineableOres(items: Array<Item>): Gatherer { 
        this.MineableOre = this.MineableOre.concat(this.MineableOre, items);
        return this;
    }
    public SetEfficiency(ef: number): Gatherer {
        this.Efficiency = ef;
        return this;
    }
    public SetStoreCategory(sc: StoreCategory): Gatherer {
        this.StoreCategory = sc;
        return this;
    }
}

var Player = new Gatherer();
var Miner = new Gatherer();
var Lumberjack = new Gatherer();
var Pumpjack = new Gatherer();
var BigTexan = new Gatherer();
var Drill = new Gatherer();
var Crusher = new Gatherer();
var Excavator = new Gatherer();
var MegaDrill = new Gatherer();
