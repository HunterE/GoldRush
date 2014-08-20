class StatisticSystem {
    items: Array<Statistic>;
    private lowestUnregisteredId: number = 0;
    public Name: string = "Statistic";

    constructor() {
        this.Reset();
    }

    LookupStatistic(id: number) {
        return this.items[id];
    }

    RegisterItem(statistic: Statistic) {
        statistic.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = statistic;
        this.lowestUnregisteredId++;
    }

    Reset() {
        this.lowestUnregisteredId = 0;
        this.items = new Array<Statistic>();
    }
}

class Statistic {
    public ID;
    public Name;
    public Value: number = 0;

    constructor() {
        
    }

    public SetValue(v: any): Statistic {
        this.Value = v;
        return this;
    }

    public SetID(i: number): Statistic {
        this.ID = i;
        return this;
    }

    public SetName(n: string): Statistic {
        this.Name = n;
        return this;
    }
}

var StatVersionNumber = new Statistic();
var StatRockClicked = new Statistic();
var StatTimePlayed = new Statistic();