var CraftingUI = (function () {
    function CraftingUI(processors, upgrades, items) {
        this.headers = ["Action", "Description", "Input", "Output", "Name"];
        this.headerWidths = ["10%", "50%", "15%", "15%", "10%"];
        this.processorSystem = processors;
        this.upgradeSystem = upgrades;
        this.itemSystem = items;

        this.drawMachines();
        this.drawCraftingTable();
    }
    CraftingUI.prototype.drawMachines = function () {
        this.processorSystem.DisplayProcessors();
    };

    CraftingUI.prototype.drawCraftingTable = function () {
        var craftingPanel = document.createElement("div");
        craftingPanel.setAttribute("class", "processorpane");
        var craftingTable = this.drawTableHeader();
        var body = craftingTable.createTBody();

        for (i = 0; i < this.upgradeSystem.items.length; ++i) {
            if (this.upgradeSystem.items[i].Type === 1 /* Crafted */) {
                row = body.insertRow(0);
                this.drawUpgradeCraftingRow(this.upgradeSystem.items[i], row);
            }
        }

        var titlerow = body.insertRow(0);
        var cell = titlerow.insertCell(0);
        cell.setAttribute("colspan", this.headers.length.toString());
        cell.style.height = "35px";
        cell.textContent = "Upgrades";

        for (var i = 0; i < this.itemSystem.recipes.length; ++i) {
            var row = body.insertRow(0);
            this.drawItemCraftingRow(this.itemSystem.recipes[i], row);
        }

        craftingTable.appendChild(body);
        craftingPanel.appendChild(craftingTable);
        document.getElementById("tabs-4").appendChild(craftingPanel);
    };

    CraftingUI.prototype.drawTableHeader = function () {
        var craftingTable = document.createElement("table");
        craftingTable.setAttribute("class", "processortable");

        var header = craftingTable.createTHead();
        var titleRow = header.insertRow(0);
        var titleCell = titleRow.insertCell(0);
        titleRow.style.height = "35px";
        titleCell.textContent = "Crafting Table";
        titleCell.setAttribute("colspan", this.headers.length.toString());
        header.style.height = "35px";

        var descriptions = header.insertRow(1);
        descriptions.style.height = "35px";
        for (var i = 0; i < this.headers.length; ++i) {
            var cell = descriptions.insertCell(0);
            cell.style.width = this.headerWidths[i];
            cell.textContent = this.headers[i];
        }

        return craftingTable;
    };

    CraftingUI.prototype.drawUpgradeCraftingRow = function (upgrade, row) {
        row.setAttribute("id", "upgradecraftrow" + upgrade.ID);

        var actionCell = row.insertCell(0);
        var descriptionCell = row.insertCell(0);
        var inputCell = row.insertCell(0);
        var outputCell = row.insertCell(0);
        var nameCell = row.insertCell(0);

        var inputtooltip = "";

        var actionButton = document.createElement("input");
        actionButton.setAttribute("type", "button");
        actionButton.setAttribute("value", "Craft");
        actionButton.setAttribute("id", "craftupgrade" + upgrade.ID);
        actionButton.addEventListener("click", function (event) {
            var element = event.target;
            var upgrade = game.upgradeSystem.items[element.id.replace("craftupgrade", "")];

            var hasresources = true;
            for (var x = 0; x < upgrade.Recipe.inputs.length; ++x) {
                if (upgrade.Recipe.inputs[x].item.Quantity < upgrade.Recipe.inputs[x].quantity) {
                    hasresources = false;
                }
            }
            if (hasresources) {
                for (x = 0; x < upgrade.Recipe.inputs.length; ++x) {
                    upgrade.Recipe.inputs[x].item.Quantity -= upgrade.Recipe.inputs[x].quantity;
                }
                game.upgradeSystem.Purchase(upgrade.ID);
            }
        }, false);

        for (var i = 0; i < upgrade.Recipe.inputs.length; ++i) {
            inputCell.appendChild(upgrade.Recipe.inputs[i].addTotalCount().display("upgrade" + upgrade.ID + "input" + i));
            inputtooltip = inputtooltip.concat(formatNumber(upgrade.Recipe.inputs[i].quantity) + " " + upgrade.Recipe.inputs[i].item.Name + " ");
        }
        inputCell.setAttribute("title", inputtooltip);

        nameCell.textContent = upgrade.Name;
        descriptionCell.textContent = upgrade.GetTooltip();
        actionCell.appendChild(actionButton);
    };

    CraftingUI.prototype.drawItemCraftingRow = function (recipe, row) {
        var actionCell = row.insertCell(0);
        var descriptionCell = row.insertCell(0);
        var inputCell = row.insertCell(0);
        var outputCell = row.insertCell(0);
        var nameCell = row.insertCell(0);

        var inputtooltip = "";
        var outputtooltip = "";

        var actionButton = document.createElement("input");
        actionButton.setAttribute("type", "button");
        actionButton.setAttribute("id", "craftrecipe" + recipe.ID);
        actionButton.setAttribute("value", "Craft");
        actionButton.addEventListener("click", function (event) {
            var element = event.target;
            var recipe = game.itemSystem.recipes[element.id.replace("craftrecipe", "")];
            var hasresources = true;

            for (var x = 0; x < recipe.inputs.length; ++x) {
                if (recipe.inputs[x].item.Quantity < recipe.inputs[x].quantity) {
                    hasresources = false;
                }
            }
            if (hasresources) {
                for (x = 0; x < recipe.inputs.length; ++x) {
                    recipe.inputs[x].item.Quantity -= recipe.inputs[x].quantity;
                }
                for (x = 0; x < recipe.outputs.length; ++x) {
                    game.inventory.addItemQuantity(recipe.outputs[x].item.ID, recipe.outputs[x].quantity);
                }
            }
        }, false);

        for (var i = 0; i < recipe.outputs.length; ++i) {
            outputCell.appendChild(recipe.outputs[i].display(""));
            outputtooltip = outputtooltip.concat(formatNumber(recipe.outputs[i].quantity) + " " + recipe.outputs[i].item.Name + " ");
        }
        outputCell.setAttribute("title", outputtooltip);
        for (var i = 0; i < recipe.inputs.length; ++i) {
            inputCell.appendChild(recipe.inputs[i].addTotalCount().display("recipe" + recipe.ID + "id" + i));
            inputtooltip = inputtooltip.concat(formatNumber(recipe.inputs[i].quantity) + " " + recipe.inputs[i].item.Name + " ");
        }
        inputCell.setAttribute("title", inputtooltip);

        nameCell.textContent = recipe.outputs[0].item.Name;
        descriptionCell.textContent = "";
        actionCell.appendChild(actionButton);
    };

    CraftingUI.prototype.Update = function () {
        for (var i = 0; i < this.upgradeSystem.items.length; ++i) {
            var upgrade = this.upgradeSystem.items[i];
            if (upgrade.Type === 1 /* Crafted */) {
                var row = document.getElementById("upgradecraftrow" + i);

                for (var x = 0; x < upgrade.Recipe.inputs.length; ++x) {
                    var recipe = upgrade.Recipe;

                    var txt = document.getElementById("upgrade" + upgrade.ID + "input" + x);
                    txt.textContent = recipe.inputs[x].quantity + " (" + formatNumber(recipe.inputs[x].item.Quantity) + ")";
                }

                if (this.upgradeSystem.items[i].Active) {
                    row.style.display = 'none';
                } else {
                    if (upgrade.Requires) {
                        if (upgrade.Requires.Active) {
                            row.style.display = 'table-row';
                        } else {
                            row.style.display = 'none';
                        }
                    } else {
                        row.style.display = 'table-row';
                    }
                }
            }
        }

        for (var i = 0; i < this.itemSystem.recipes.length; ++i) {
            var recipe = this.itemSystem.recipes[i];

            for (var x = 0; x < recipe.inputs.length; ++x) {
                var input = document.getElementById("recipe" + recipe.ID + "id" + x);
                input.textContent = recipe.inputs[x].quantity + " (" + formatNumber(recipe.inputs[x].item.Quantity) + ")";
            }
        }
    };
    return CraftingUI;
})();
//# sourceMappingURL=CraftingUI.js.map
