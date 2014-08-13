class ProcessorSystem {
    items: Array<Processor>;
    private lowestUnregisteredId: number = 0;
    public Name: string = "Processor";

    constructor() {
        this.Reset();
    }

    LookupItem(id: number): Processor {
        return this.items[id];
    }

    RegisterItem(item: Processor) {
        item.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = item;
        this.lowestUnregisteredId++;
    }

    Reset() {
        this.lowestUnregisteredId = 0;
        this.items = new Array<Processor>();
    }

    DisplayProcessors() {
        for (var i = 0; i < this.items.length; ++i) {
            var item = this.items[i];
            item.UI = new ProcessorUI(item);
            document.getElementById("tabs-4").appendChild(item.Display());
        }
    }

    Process() {
        for (var i = 0; i < this.items.length; ++i) {
            this.items[i].Tick();
        }
    }
}

class Processor {
    Recipes = new Array<ProcessorRecipe>();
    public Name: string;
    public ID: number;
    public Efficiency: number = 1;
    public Enabled: boolean = false;
    public Capacity: number = 100;
    public UI: ProcessorUI;

    public ActiveRecipe: ProcessorRecipe; // Current recipe.
    public ActiveJobs: number =0; // Number of iterations total.
    public ActiveProgress: number=0; // Number of iterations completed.

    public Jobs: number = 0;
    public Recipe: ProcessorRecipe;

    public MaxProgress: number = 100;
    public Progress: number = 0;

    public RemainingTime: number;

    public Processor() {

    }

    public GetRecipeIndex(): number {
        for (var i = 0; i < this.Recipes.length; ++i) {
            if (this.Recipes[i] === this.ActiveRecipe) {
                return i;
            }
        }
        return 0;
    }

    public Deactivate() {
        for (var i = 0; i < this.ActiveRecipe.Recipe.inputs.length; ++i) { // return the user their items.
            this.ActiveRecipe.Recipe.inputs[i].item.Quantity += Math.floor((this.ActiveRecipe.Recipe.inputs[i].quantity * (this.ActiveJobs - this.ActiveProgress)) / 2);
        }
        this.ActiveJobs = 0;
        this.Progress = 0;
    }

    public Activate() { // Make sure the player has sufficient resources and then deduct them.
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
    }

    public Tick() {
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
            if (this.Progress >= this.MaxProgress) { // If the processor has completed processing an item.
                this.ActiveProgress++;
                this.Progress = 0;

                for (var i = 0; i < this.ActiveRecipe.Recipe.outputs.length; ++i) { // Grab dem outputs.
                    game.inventory.addItem(this.ActiveRecipe.Recipe.outputs[i].item.ID);
                }
            } else {
                this.Progress+= (1*this.Efficiency);
            }
            if (this.ActiveProgress >= this.ActiveJobs) { // If the processor is done processing.
                this.ActiveJobs = 0;
                this.Progress = 0;
            }
        }
        this.UI.Update();
    }

    public SetID(n: number) {
        this.ID = n;
    }
    public AddRecipe(r: ProcessorRecipe): Processor {
        this.Recipes.push(r);
        return this;
    }
    public SetCapacity(c: number): Processor {
        this.Capacity = c;
        return this;
    }
    public SetName(n: string): Processor {
        this.Name = n;
        return this;
    }
    public Display() {
        this.Recipe = this.Recipes[0];
        return this.UI.Display();
    }
    public Reset(): Processor {
        this.ActiveJobs = 0;
        this.Progress = 0;
        this.Enabled = false;
        return this;
    }
}

var Furnace = new Processor();
var Cauldron = new Processor();