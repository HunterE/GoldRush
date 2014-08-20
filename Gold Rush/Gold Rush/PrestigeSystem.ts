class PrestigeSystem {
    items: Array<Prestige>;
    private lowestUnregisteredId: number = 0;
    public HighestPrestige: Prestige;
    public Name: string = "Prestige";

    constructor() {
        this.Reset();
    }

    Reset() {
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
        this.items = new Array<Prestige>();
    }

    RegisterItem(prestige: Prestige) {
        prestige.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = prestige;
        this.lowestUnregisteredId++;
        this.HighestPrestige = prestige;
    }

    ActivateRewards() {
        for (var i = 0; i < this.items.length; ++i) {
            var pres = this.items[i];
            if (pres.Active) {
                for (var u = 0; u < pres.Rewards.length; ++u) {
                    pres.Rewards[u].Activate();
                }
            }
        }
    }

    CheckRequirements(pres: Prestige) {
        var done = true;
        for (var i = 0; i < pres.Requirements.length; ++i) {
            if (!pres.Requirements[i].Condition.condition()) {
                done = false;
            }
        }
        return done;
    }

    Prestige(pres: Prestige) {
        if (this.CheckRequirements(pres)) {
            pres.Active = true;
            data.softReset();
            this.ActivateRewards();
            game.prestigeUI.draw();
        }
    }

    GetHighestPrestige(): Prestige {
        for (var i = 0; i < this.items.length; ++i) {
            if (i === this.items.length-1) {// If this is the highest prestige return.
                return this.items[i];
            }

            if (this.items[i].Active && !this.items[i + 1].Active) {//If this prestige is active and the one above it is not then it's the highest.
                return this.items[i];
            }
        }
    }
}

class Prestige {
    constructor() {
        this.Rewards = new Array<Upgrade>();
        this.Requirements = new Array<Achievement>();
    }

    public ID: number;
    public Active: boolean = false; // use to set default prestige.
    public Item: Item; // Item that the prestige will be represented by. I.E. Stone, Copper, Iron
    public Rewards: Array<Upgrade>;
    public Requirements: Array<Achievement>;

    public SetID(id:number) {
        this.ID = id;
    }
    
    public SetActive(active: boolean): Prestige {
        this.Active = active;
        return this;
    }

    public SetItem(item: Item): Prestige {
        this.Item = item;
        return this;
    }

    public AddRequirements(achievements: Array<Achievement>): Prestige {
        this.Requirements = new Array<Achievement>();
        this.Requirements = this.Requirements.concat(this.Requirements,achievements);
        return this;
    }

    public AddRewards(upgrades: Array<Upgrade>): Prestige {
        this.Rewards = new Array<Upgrade>();
        this.Rewards = this.Rewards.concat(this.Rewards,upgrades);
        return this;
    }
}

var StonePrestige = new Prestige(); // Default prestige.

// Copper Requirements.
var CopperPrestigeStoneReq = new Achievement().SetCondition(new AchievementAlltime(Item[1]=[Stone], 10000000));
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