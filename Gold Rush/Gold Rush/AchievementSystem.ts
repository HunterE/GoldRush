 class AchievementSystem {
     items: Array<Achievement>;
     private lowestUnregisteredId: number = 0;
     public Name: string = "Achievement";

     constructor() {
         this.Reset();
     }

     Reset() {
         this.lowestUnregisteredId = 0;
         this.items = new Array<Achievement>();
     }

     LookupAchievement(id: number) {
         return this.items[id];
     }

     RegisterItem(ach: Achievement) {
         ach.SetID(this.lowestUnregisteredId);
         this.items[this.lowestUnregisteredId] = ach;
         this.lowestUnregisteredId++;
     }

     Check() {
         for (var i = 0; i < this.items.length; ++i) {
             var ach = this.items[i];

             if (ach.Condition.condition()) {
                 ach.Completed = true;
             }
         }
     }
 }

 class Achievement {
     public ID: number;
     public Name: string;
     public Completed: boolean = false;
     public Requires: Achievement;
     public Condition: AchievementListener;

     constructor() {
            
     }

     public SetID(id: number) {
         this.ID = id;
     }
     public SetName(n: string) {
         this.Name = n;
         return this;
     }
     public SetCondition(c: AchievementListener) {
         this.Condition = c;
         return this;
     }
     public SetRequires(r: Achievement) {
         this.Requires = r;
         return this;
     }
     public SetCompleted(com: boolean) {
         this.Completed = com;
         return this;
     }
     public GetTooltip(): string {
         return this.Condition.tooltip();
     }
 }

class AchievementListener {
     tooltip(): string {
         return "";
     }

     condition() {
         
     }

     getPercentage(): number {
         return 0;
     }

     getCurrentProgress(): number {
         return 0;
     }

     getMaxProgress(): number {
         return 0;
     }
 }

class AchievementAlltime extends AchievementListener {
     Variables: any;
     Requirement: number;

     constructor(v: any[], r: number) {
         this.Variables = v;
         this.Requirement = r;
         super();
     }

    tooltip() {
        var names = new Array<string>();
        for (var i = 0; i < this.Variables.length; ++i) {
            names.push(this.Variables[i].Name);
        }
        return "Have an all time total of " + formatNumber(this.Requirement) + " " + names.join(", ") + ".";
    }

     condition() {
         var total = 0;

         for (var i = 0; i < this.Variables.length; ++i) {
             total += this.Variables[i].Alltime;
         }

         if (total >= this.Requirement) {
             return true;
         }
         return false;
     }

     getPercentage() {
         return this.getCurrentProgress() / this.getMaxProgress();
     }

     getCurrentProgress() {
         return this.Variables[0].Alltime;
     }

    getMaxProgress() {
        return this.Requirement;
    }
 }

 class AchievementQuantity extends AchievementListener {
     Variables: any;
     Requirement: number;

     constructor(v: any[], r: number) {
         this.Variables = v;
         this.Requirement = r;
         super();
     }

     tooltip() {
         var names = new Array<string>();
         for (var i = 0; i < this.Variables.length; ++i) {
             names.push(this.Variables[i].Name);
         }
         return "Have " + formatNumber(this.Requirement) + " " + names.join(", ") + " in your inventory.";
     }

     condition() {
         var total = 0;

         for (var i = 0; i < this.Variables.length; ++i) {
             total += this.Variables[i].Quantity;
         }

         if (total >= this.Requirement) {
             return true;
         }
         return false;
     }

     getPercentage() {
         return this.Variables[0].Quantity / this.Requirement;
     }

     getCurrentProgress() {
         return this.Variables[0].Quantity;
     }

     getMaxProgress() {
         return this.Requirement;
     }
 }

 class AchievementItemType extends AchievementListener {
     ItemType: ItemType;

     constructor(it: ItemType) {
         this.ItemType = it;

         super();
     }

     tooltip() {
         return "Discover every type of " + ItemType[this.ItemType] + ".";
     }

     condition() {
         for (var x = 0; x < game.itemSystem.items.length; ++x) {
             var item = game.itemSystem.items[x];

             if (item.Type === this.ItemType) {// If this is the type of item we're inspecting.
                 if (item.Alltime <= 0) {// If we don't have any of it
                     return false;
                 }
             }
         }
         return true;
     }

     getPercentage() {
         var need = 0;
         var have = 0;

         for (var x = 0; x < game.itemSystem.items.length; ++x) {
             var item = game.itemSystem.items[x];

             if (item.Type === this.ItemType) {// If this is the type of item we're inspecting.
                 need++;
                 if (item.Alltime > 0) {// If we don't have any of it
                     have++;
                 }
             }
         }
         return have / need;
     }

     getCurrentProgress() {
         var have = 0;

         for (var x = 0; x < game.itemSystem.items.length; ++x) {
             var item = game.itemSystem.items[x];

             if (item.Type === this.ItemType) {// If this is the type of item we're inspecting.
                 if (item.Alltime > 0) {// If we don't have any of it
                     have++;
                 }
             }
         }

         return have;
     }

     getMaxProgress() {
         var need = 0;

         for (var x = 0; x < game.itemSystem.items.length; ++x) {
             var item = game.itemSystem.items[x];

             if (item.Type === this.ItemType) { // If this is the type of item we're inspecting.
                 need++;
             }
         }
         return need;
     }
  }

 class AchievementStatistic extends AchievementListener {
     Variable: any;
     Requirement: number;

     constructor(v: any, r: number) {
         this.Variable = v;
         this.Requirement = r;
         super();
     } 

     tooltip() {
         return formatNumber(this.Requirement)+" "+this.Variable.Name;
     }

     condition() {
         if (this.Variable.Value >= this.Requirement) {
             return true;
         }
         return false;
     }

     getPercentage() {
         return this.Variable.Value / this.Requirement;
     }

     getCurrentProgress() {
         return this.Variable.Value;
     }

     getMaxProgress() {
         return this.Requirement;
     }
 }

// You need to think this through carefully.

var AchMoney1 = new Achievement();
 var AchMoney2 = new Achievement();
 var AchMoney3 = new Achievement();

 var AchMiner1 = new Achievement();
 var AchMiner2 = new Achievement();
 var AchMiner3 = new Achievement();

 var AchItemCatOre = new Achievement();
 var AchItemCatGem = new Achievement();
 var AchItemCatCrafting = new Achievement();
 var AchItemCatIngredient = new Achievement();
 var AchItemCatPotion = new Achievement();