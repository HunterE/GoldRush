class UpgradeSystem {
    items: Array<Upgrade>;
    private lowestUnregisteredId: number = 0;
    public Name: string="Upgrade";

    constructor() {
        this.Reset();
    }

    LookupUpgrade(id: number) {
        return this.items[id];
    }

    RegisterItem(upgrade: Upgrade) {
        upgrade.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = upgrade;
        this.lowestUnregisteredId++;
    }

    ActivateOnLoad() {
        for (var i = 0; i<this.items.length; ++i) {
            if (this.items[i].Active) {
                this.items[i].Activate();
            }
        }
    }

    Reset() {
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
        this.items = new Array<Upgrade>();
    }

    Purchase(id: number) {
        var upgrade = this.items[id];

        if (game.inventory.deductFunds(upgrade.Price)) {// We've purchased the upgrade!
            upgrade.Activate();
        }
    }
}

class Upgrade {
    public ID
    public Name: string;
    public Display: boolean = true;
    public Active: boolean;
    public Requires: Upgrade; 
    public Type: UpgradeType;
    public StoreCategory: StoreCategory;
    public Effect: Array<UpgradeEffect>;
    public Price: number = 0;
    public Recipe: Recipe;

    constructor() {
        this.Effect = new Array<UpgradeEffect>();
    }

    public Activate() {
        this.Active = true;
        for (var i = 0; i < this.Effect.length; ++i) {
            this.Effect[i].effect();
        }
    }

    public Deactivate() {
        this.Active = false;
        for (var i = 0; i < this.Effect.length; ++i) {
            this.Effect[i].deactivate();
        }
    }

    public GetPrice(currAmm: number) { // Exists for upgrade/gatherer manipulation compatitibilty and easy extensibility.
        return this.Price;
    }
    public GetTooltip(): string {
        var tooltip: string = "";
        for (var i = 0; i < this.Effect.length; ++i) {
            tooltip+=(this.Effect[i].tooltip()+". ");
        }

        return tooltip;
    }
    public SetDisplay(disp: boolean): Upgrade {
        this.Display = disp;
        return this;
    }
    public SetID(id: number) {
        this.ID = id;
    }
    public SetName(name: string): Upgrade {
        this.Name = name;
        return this;
    }
    public SetActive(active: boolean): Upgrade {
        this.Active = active;
        return this;
    }
    public SetRequires(upgrade: Upgrade): Upgrade {
        this.Requires = upgrade;
        return this;
    }
    public SetType(type: UpgradeType): Upgrade {
        this.Type = type;
        return this;
    }
    public AddEffect(effect: UpgradeEffect): Upgrade {
        this.Effect.push(effect);
        return this;
    }
    public SetPrice(price: number): Upgrade {
        this.Price = price;
        return this;
    }
    public SetRecipe(recipe: Recipe): Upgrade {
        this.Recipe = recipe;
        return this;
    }
    public SetStoreCategory(sc: StoreCategory): Upgrade {
        this.StoreCategory = sc;
        return this;
    }
}

enum UpgradeType {
    Purchased,
    Crafted
}

class UpgradeEffect {
    constructor() {
        
    }

    duration: number = -1;

    effect() {
        
    }

    deactivate() {
        
    }

    tooltip() {
        
    }
}

class OreUpgradeEffect extends UpgradeEffect {
    public AddedOre: Array<Item>;
    public AffectedGatherers: Array<Gatherer>;

    constructor(ores: Array<Item>, ga: Array<Gatherer>) {
        this.AddedOre = new Array<Item>();
        this.AffectedGatherers = new Array<Gatherer>();
        this.AddedOre = this.AddedOre.concat(ores);
        this.AffectedGatherers = this.AffectedGatherers.concat(ga);

        super();
    }

    effect() {
        for(var gatherer in this.AffectedGatherers)
        {
            this.AffectedGatherers[gatherer].MineableOre = this.AffectedGatherers[gatherer].MineableOre.concat(this.AddedOre);
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    }

    deactivate() {
        for (var gatherer in this.AffectedGatherers) {
            for (var i = 0; i < this.AddedOre.length; ++i) {
                for (var x = 0; x < this.AffectedGatherers[gatherer].MineableOre.length; ++x) {
                    if (this.AddedOre[i] === this.AffectedGatherers[gatherer].MineableOre[x]) {
                        this.AffectedGatherers[gatherer].MineableOre.splice(x,1);
                    }
                }
            }
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    }

    tooltip() {
        var tooltip = "Discovers: ";
        var names = Array<String>();
        for (var i = 0; i < this.AddedOre.length; ++i) {
            names.push(this.AddedOre[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        return tooltip;
    }
}

class EfficiencyUpgradeEffect extends UpgradeEffect {
    public Efficiency: number;
    public AffectedGatherers: Array<Gatherer>;

    constructor(ef: number, ga: Array<Gatherer>) {
        this.AffectedGatherers = new Array<Gatherer>();
        this.AffectedGatherers = this.AffectedGatherers.concat(ga);
        this.Efficiency = ef;
        super();
    }

    effect() {
        for (var gatherer in this.AffectedGatherers) {
            if (this.AffectedGatherers[gatherer].Efficiency === 0 || !this.AffectedGatherers[gatherer].Efficiency) {
                this.AffectedGatherers[gatherer].Efficiency = this.Efficiency;
            } else {
                this.AffectedGatherers[gatherer].Efficiency += this.Efficiency;
            }
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    }

    deactivate() {
        for (var gatherer in this.AffectedGatherers) {
            this.AffectedGatherers[gatherer].Efficiency -= this.Efficiency;
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    }

    tooltip() {
        var tooltip = "Increases resources gathered per tick by " + this.Efficiency + " for ";
        var names = Array<String>();
        for (var i = 0; i < this.AffectedGatherers.length; ++i) {
            names.push(this.AffectedGatherers[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        return tooltip;
    }
}

class EfficiencyMagnitudeUpgradeEffect extends UpgradeEffect {
    public Efficiency: number;
    public AffectedGatherers: Array<Gatherer>;

    constructor(ef: number, ga: Array<Gatherer>) {
        this.AffectedGatherers = new Array<Gatherer>();
        this.AffectedGatherers = this.AffectedGatherers.concat(ga);
        this.Efficiency = ef;
        super();
    }

    effect() {
        for (var gatherer in this.AffectedGatherers) {
            this.AffectedGatherers[gatherer].EfficiencyModifier += this.Efficiency;
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    }

    deactivate() {
        for (var gatherer in this.AffectedGatherers) {
            this.AffectedGatherers[gatherer].EfficiencyModifier -= this.Efficiency;
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    }

    tooltip() {
        var tooltip = "Increases resources gathered by " + (this.Efficiency*100) + "% for ";
        var names = Array<String>();
        for (var i = 0; i < this.AffectedGatherers.length; ++i) {
            names.push(this.AffectedGatherers[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        return tooltip;
    }
}

class ProbabilityUpgradeEffect extends UpgradeEffect { // ONLY 1 PROBABILITY UPGRADE WILL APPLY. HIGHEST ONE WILL BE USED!
    public Probability: number;
    public AffectedGatherers: Array<Gatherer>;

    constructor(prob: number, ga: Array<Gatherer>) {
        this.AffectedGatherers = new Array<Gatherer>();
        this.AffectedGatherers = this.AffectedGatherers.concat(ga);
        this.Probability = prob;
        super();
    }

    effect() {
        for (var gatherer in this.AffectedGatherers) {
            if (!this.AffectedGatherers[gatherer].ProbabilityModifier) {
                this.AffectedGatherers[gatherer].ProbabilityModifier = 0;
            }
            this.AffectedGatherers[gatherer].ProbabilityModifier += this.Probability;
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    }

    deactivate() {
        for (var gatherer in this.AffectedGatherers) {
            this.AffectedGatherers[gatherer].ProbabilityModifier -= this.Probability;
            this.AffectedGatherers[gatherer].CalculateMiningStuff();
        }
    }

    tooltip(): string {
        var tooltip = "Increases chance of gathering rare resources by " + (this.Probability * 100).toString() + "% for ";
        var names = Array<String>();
        for (var i = 0; i < this.AffectedGatherers.length; ++i) {
            names.push(this.AffectedGatherers[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        return tooltip;
    }
}

class ManufacturerEfficiencyUpgradeEffect extends UpgradeEffect {
    public AffectedProcessors: Array<Processor>;
    public Efficiency: number;

    constructor(ef:number, proc: Array<Processor>) {
        this.Efficiency = ef;
        this.AffectedProcessors = proc;
        super();
    }

    effect() {
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            this.AffectedProcessors[i].Efficiency += this.Efficiency;
        }
    }

    deactivate() {
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            this.AffectedProcessors[i].Efficiency -= this.Efficiency;
        }
    }

    tooltip(): string {
        var names = Array<String>();
        var tooltip = "Increases speed of ";
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            names.push(this.AffectedProcessors[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        tooltip = tooltip.concat(" by " + (this.Efficiency * 100)+"%");
        return tooltip;
    }
}

class ManufacturerUnlockUpgradeEffect extends UpgradeEffect {
    public ActivatedProcessor : Processor;

    constructor(proc: Processor) {
        this.ActivatedProcessor = proc;
        super();
    }

    effect() {
        this.ActivatedProcessor.Enabled = true;
    }

    deactivate() {
        this.ActivatedProcessor.Enabled = false;
    }

    tooltip(): string {
        var tooltip = "Unlocks: " + this.ActivatedProcessor.Name;
        return tooltip;
    }
}

class ItemValueUpgradeEffect extends UpgradeEffect {
    public Value;

    constructor(v: number) {
        this.Value = v;
        super();
    } 

    effect() {
        for (var i = 0; i < game.itemSystem.items.length; ++i) {
            game.itemSystem.items[i].ValueModifier += this.Value;
        }
    }

    deactivate() {
        for (var i = 0; i < game.itemSystem.items.length; ++i) {
            game.itemSystem.items[i].ValueModifier -= this.Value;
        }
    }

    tooltip(): string {
        return "Increases value of items by " + (this.Value * 100)+"%";
    }
}

class ManufacturerCapacityUpgradeEffect extends UpgradeEffect {
    public Capacity;
    public AffectedProcessors: Array<Processor>;

    constructor(cap: number, proc: Array<Processor>) {
        this.Capacity = cap;
        this.AffectedProcessors = proc;
        super();
    }

    effect() {
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            this.AffectedProcessors[i].Capacity += this.Capacity;
        }
    }

    deactivate() {
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            this.AffectedProcessors[i].Capacity -= this.Capacity;
        }
    }

    tooltip(): string {
        var names = Array<String>();
        var tooltip = "Increases capacity of ";
        for (var i = 0; i < this.AffectedProcessors.length; ++i) {
            names.push(this.AffectedProcessors[i].Name);
        }
        tooltip = tooltip.concat(names.join(", "));
        tooltip = tooltip.concat(" by " + this.Capacity);
        return tooltip;
    }
}

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

var Researcher_Effect = new OreUpgradeEffect(Item[3] = [Sapphire, Emerald, Ruby], Gatherer[6]=[Player,Miner,Drill,Crusher,Excavator,MegaDrill]);
var Geologist_Effect = new OreUpgradeEffect(Item[3] = [Onyx, Quartz, Diamond], Gatherer[6] = [Player, Miner, Drill, Crusher, Excavator, MegaDrill]);
var Backpack_Effect = new OreUpgradeEffect(Item[4] = [Sito, Ardigal, Redberries, Jangerberries], Gatherer[1] =[Lumberjack]);
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