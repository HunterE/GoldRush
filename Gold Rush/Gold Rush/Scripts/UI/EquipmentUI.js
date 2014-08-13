var EquipmentUI = (function () {
    function EquipmentUI(upgrades, gatherers) {
        this.upgradeSystem = upgrades;
        this.gathererSystem = gatherers;

        this.Draw();
    }
    EquipmentUI.prototype.Draw = function () {
        for (var gatherer in this.gathererSystem.items) {
            if (this.gathererSystem.items[gatherer].Display) {
                document.getElementById("tabs-2").appendChild(this.DrawGathererInfoBox(gatherer));
            }
        }
    };

    EquipmentUI.prototype.DrawGathererInfoBox = function (id) {
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
    };

    EquipmentUI.prototype.Update = function () {
        for (var gatherer in this.gathererSystem.items) {
            if (this.gathererSystem.items[gatherer].Display) {
                document.getElementById("quantity" + gatherer).textContent = "Quantity: " + this.gathererSystem.items[gatherer].Quantity;
                document.getElementById("max" + gatherer).textContent = "Max Owned: " + this.gathererSystem.items[gatherer].MaxOwned;
                document.getElementById("orestick" + gatherer).textContent = "Ores/tick: " + this.gathererSystem.items[gatherer].MinePerTick;
            }
        }
    };
    return EquipmentUI;
})();
//# sourceMappingURL=EquipmentUI.js.map
