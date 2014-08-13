class BuffSystem {
    items: Array<Buff>;
    private lowestUnregisteredId: number = 0;
    public Name: string = "Buff";

    constructor() {
        this.Reset();
    }

    RegisterItem(buff: Buff) {
        buff.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = buff;
        this.lowestUnregisteredId++;
        
    }

    Reset() {
        this.lowestUnregisteredId = 0;
        this.items = new Array<Buff>();
    }

    tick() {
        for (var i = 0; i < this.items.length; ++i) {
            var item = this.items[i];
            if (item.RemainingTime > 0 && !item.Active) {
                item.Upgrade.Activate();
                item.Active = true;
            }

            if (item.Active) {
                if (item.RemainingTime > 0) {
                    item.RemainingTime--;
                } else {
                    item.Deactivate();
                }
            }
        }
    }
}

class Buff {
    constructor() {

    }

    public SetID(id: number) {
        this.ID = id;
    }
    public SetUpgrade(up: Upgrade) {
        this.Upgrade = up;
        return this;
    }
    public SetItem(item: Item) {
        this.Item = item;
        return this;
    }
    public SetDuration(d: number) {
        this.Duration = d;
        return this;
    }
    public Activate() {
        this.Active = true;
        this.RemainingTime = this.Duration; 
        this.Upgrade.Activate();
    }
    public Deactivate() {
        this.Active = false;
        this.RemainingTime = 0;
        this.Upgrade.Deactivate();
    }
    public SetRemaining(r:number) {
        this.RemainingTime = r;
        return this;
    }

    ID: number;
    Active: boolean = false;
    RemainingTime: number = 0;
    Duration: number; 
    Item: Item;
    Upgrade: Upgrade;
}

var SpeechPotionUpgrade = new Upgrade().SetName("Speech Potion").SetDisplay(false).SetActive(false).AddEffect(SpeechPotion_Effect);
var ClickingPotionUpgrade = new Upgrade().SetName("Clicking Potion").SetDisplay(false).SetActive(false).AddEffect(ClickingPotion_Effect);
var SmeltingPotionUpgrade = new Upgrade().SetName("Smelting Potion").SetDisplay(false).SetActive(false).AddEffect(SmeltingPotion_Effect);
var AlchemyPotionUpgrade = new Upgrade().SetName("Alchemy Potion").SetDisplay(false).SetActive(false).AddEffect(AlchemyPotion_Effect);

var SpeechPotionBuff = new Buff();
var SmeltingPotionBuff = new Buff();
var AlchemyPotionBuff = new Buff();
var ClickingPotionBuff = new Buff();