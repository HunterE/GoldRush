var ProcessorSystem = (function () {
    function ProcessorSystem() {
        this.lowestUnregisteredId = 0;
        this.Name = "Processor";
        this.Reset();
    }
    ProcessorSystem.prototype.LookupItem = function (id) {
        return this.items[id];
    };

    ProcessorSystem.prototype.RegisterItem = function (item) {
        item.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = item;
        this.lowestUnregisteredId++;
    };

    ProcessorSystem.prototype.Reset = function () {
        this.lowestUnregisteredId = 0;
        this.items = new Array();
    };

    ProcessorSystem.prototype.DisplayProcessors = function () {
        for (var i = 0; i < this.items.length; ++i) {
            var item = this.items[i];
            item.UI = new ProcessorUI(item);
            document.getElementById("tabs-4").appendChild(item.Display());
        }
    };

    ProcessorSystem.prototype.Process = function () {
        for (var i = 0; i < this.items.length; ++i) {
            this.items[i].Tick();
        }
    };
    return ProcessorSystem;
})();

var Processor = (function () {
    function Processor() {
        this.Recipes = new Array();
        this.Efficiency = 1;
        this.Enabled = false;
        this.Capacity = 100;
        this.ActiveJobs = 0;
        this.ActiveProgress = 0;
        this.Jobs = 0;
        this.MaxProgress = 100;
        this.Progress = 0;
    }
    Processor.prototype.Processor = function () {
    };

    Processor.prototype.GetRecipeIndex = function () {
        for (var i = 0; i < this.Recipes.length; ++i) {
            if (this.Recipes[i] === this.ActiveRecipe) {
                return i;
            }
        }
        return 0;
    };

    Processor.prototype.Deactivate = function () {
        for (var i = 0; i < this.ActiveRecipe.Recipe.inputs.length; ++i) {
            this.ActiveRecipe.Recipe.inputs[i].item.Quantity += Math.floor((this.ActiveRecipe.Recipe.inputs[i].quantity * (this.ActiveJobs - this.ActiveProgress)) / 2);
        }
        this.ActiveJobs = 0;
        this.Progress = 0;
    };

    Processor.prototype.Activate = function () {
        var goodResources = true;
        this.ActiveRecipe = this.Recipe;
        this.MaxProgress = this.Recipe.Duration;

        if (this.ActiveJobs === 0) {
            for (var i = 0; i < this.ActiveRecipe.Recipe.inputs.length; ++i) {
                var iqp = this.ActiveRecipe.Recipe.inputs[i];

                if (iqp.item.Quantity < (iqp.quantity * this.Jobs)) {
                    goodResources = false;
                }
            }
            if (goodResources) {
                for (i = 0; i < this.ActiveRecipe.Recipe.inputs.length; ++i) {
                    iqp = this.ActiveRecipe.Recipe.inputs[i];
                    this.ActiveRecipe.Recipe.inputs[i].item.Quantity -= iqp.quantity * this.Jobs;
                }
            }
        }

        if (goodResources) {
            this.MaxProgress = this.Recipe.Duration;
            this.Progress = 0;

            this.ActiveJobs = this.Jobs;
            this.ActiveRecipe = this.Recipe;
            this.ActiveProgress = 0;
        }
    };

    Processor.prototype.Tick = function () {
        if (this.ActiveJobs > 0) {
            this.RemainingTime = Math.ceil((this.ActiveRecipe.Duration * (this.ActiveJobs - this.ActiveProgress) - this.Progress) / this.Efficiency);
            this.MaxProgress = this.ActiveRecipe.Duration;
        } else {
            this.RemainingTime = 0;
        }
        if (this.Jobs > this.Capacity) {
            this.Jobs = this.Capacity;
        }
        if (this.ActiveJobs > 0) {
            if (this.Progress >= this.MaxProgress) {
                this.ActiveProgress++;
                this.Progress = 0;

                for (var i = 0; i < this.ActiveRecipe.Recipe.outputs.length; ++i) {
                    game.inventory.addItem(this.ActiveRecipe.Recipe.outputs[i].item.ID);
                }
            } else {
                this.Progress += (1 * this.Efficiency);
            }
            if (this.ActiveProgress >= this.ActiveJobs) {
                this.ActiveJobs = 0;
                this.Progress = 0;
            }
        }
        this.UI.Update();
    };

    Processor.prototype.SetID = function (n) {
        this.ID = n;
    };
    Processor.prototype.AddRecipe = function (r) {
        this.Recipes.push(r);
        return this;
    };
    Processor.prototype.SetCapacity = function (c) {
        this.Capacity = c;
        return this;
    };
    Processor.prototype.SetName = function (n) {
        this.Name = n;
        return this;
    };
    Processor.prototype.Display = function () {
        this.Recipe = this.Recipes[0];
        return this.UI.Display();
    };
    Processor.prototype.Reset = function () {
        this.ActiveJobs = 0;
        this.Progress = 0;
        this.Enabled = false;
        return this;
    };
    return Processor;
})();

var Furnace = new Processor();
var Cauldron = new Processor();
//# sourceMappingURL=ProcessorSystem.js.map
