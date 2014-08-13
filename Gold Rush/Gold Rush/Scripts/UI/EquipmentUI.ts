class EquipmentUI {
    constructor(upgrades: UpgradeSystem, gatherers: GathererSystem) {
        this.upgradeSystem = upgrades;
        this.gathererSystem = gatherers;

        this.Draw();
    }

    upgradeSystem: UpgradeSystem;
    gathererSystem: GathererSystem;

    Draw() {
        for (var gatherer in this.gathererSystem.items) {
            if (this.gathererSystem.items[gatherer].Display) {
                document.getElementById("tabs-2").appendChild(this.DrawGathererInfoBox(gatherer));
            }
        }
    }

    DrawGathererInfoBox(id: number): HTMLElement {
        var container = document.createElement("div");
        container.setAttribute("class", "equipcont");
        var header = document.createElement("div");
        header.setAttribute("class", "equipheader");

        header.textContent = this.gathererSystem.items[id].Name;
        container.appendChild(header);

        var quantity = document.createElement("div");
        quantity.setAttribute("id", "quantity" + id);
        quantity.textContent = "Quantity: " + this.gathererSystem.items[id].Quantity;
        var max = document.createElement("div");
        max.textContent = "Max Owned: " + this.gathererSystem.items[id].MaxOwned;
        max.setAttribute("id", "max" + id);
        var orestick = document.createElement("div");
        orestick.textContent = "Ores/tick: " + this.gathererSystem.items[id].MinePerTick;
        orestick.setAttribute("id", "orestick" + id);

        container.appendChild(quantity);
        container.appendChild(max);
        container.appendChild(orestick);

        return container;
    }

    Update() {
        for (var gatherer in this.gathererSystem.items) {
            if (this.gathererSystem.items[gatherer].Display) {
                document.getElementById("quantity" + gatherer).textContent = "Quantity: " + this.gathererSystem.items[gatherer].Quantity;
                document.getElementById("max" + gatherer).textContent = "Max Owned: " + this.gathererSystem.items[gatherer].MaxOwned;
                document.getElementById("orestick" + gatherer).textContent = "Ores/tick: " + this.gathererSystem.items[gatherer].MinePerTick;
            }
        }
    }
} 