var BuffSystem = (function () {
    function BuffSystem() {
        this.lowestUnregisteredId = 0;
        this.Name = "Buff";
        this.Reset();
    }
    BuffSystem.prototype.RegisterItem = function (buff) {
        buff.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = buff;
        this.lowestUnregisteredId++;
    };

    BuffSystem.prototype.Reset = function () {
        this.lowestUnregisteredId = 0;
        this.items = new Array();
    };

    BuffSystem.prototype.tick = function () {
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
    };
    return BuffSystem;
})();

var Buff = (function () {
    function Buff() {
        this.Active = false;
        this.RemainingTime = 0;
    }
    Buff.prototype.SetID = function (id) {
        this.ID = id;
    };
    Buff.prototype.SetUpgrade = function (up) {
        this.Upgrade = up;
        return this;
    };
    Buff.prototype.SetItem = function (item) {
        this.Item = item;
        return this;
    };
    Buff.prototype.SetDuration = function (d) {
        this.Duration = d;
        return this;
    };
    Buff.prototype.Activate = function () {
        this.Active = true;
        this.RemainingTime = this.Duration;
        this.Upgrade.Activate();
    };
    Buff.prototype.Deactivate = function () {
        this.Active = false;
        this.RemainingTime = 0;
        this.Upgrade.Deactivate();
    };
    Buff.prototype.SetRemaining = function (r) {
        this.RemainingTime = r;
        return this;
    };
    return Buff;
})();

var SpeechPotionUpgrade = new Upgrade().SetName("Speech Potion").SetDisplay(false).SetActive(false).AddEffect(SpeechPotion_Effect);
var ClickingPotionUpgrade = new Upgrade().SetName("Clicking Potion").SetDisplay(false).SetActive(false).AddEffect(ClickingPotion_Effect);
var SmeltingPotionUpgrade = new Upgrade().SetName("Smelting Potion").SetDisplay(false).SetActive(false).AddEffect(SmeltingPotion_Effect);
var AlchemyPotionUpgrade = new Upgrade().SetName("Alchemy Potion").SetDisplay(false).SetActive(false).AddEffect(AlchemyPotion_Effect);

var SpeechPotionBuff = new Buff();
var SmeltingPotionBuff = new Buff();
var AlchemyPotionBuff = new Buff();
var ClickingPotionBuff = new Buff();
//# sourceMappingURL=BuffSystem.js.map
