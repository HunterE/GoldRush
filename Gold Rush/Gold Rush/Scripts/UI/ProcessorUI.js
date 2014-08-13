var ProcessorUI = (function () {
    function ProcessorUI(processor) {
        // order headers in opposite order you want.
        this.headers = ["Action", "Output", "Input", "Capacity", "Image"];
        this.headerWidths = ["10%", "30%", "20%", "20%", "20%"];
        this.id = processor.ID;
        this.name = processor.Name;
        this.recipes = processor.Recipes;
        this.capacity = processor.Capacity;
        this.processor = processor;
    }
    ProcessorUI.prototype.Display = function () {
        var processorPanel = document.createElement("div");
        processorPanel.setAttribute("class", "processorpane");
        processorPanel.setAttribute("id", "processorpanel" + this.id);
        var processorTable = document.createElement("table");
        processorTable.setAttribute("class", "processortable");

        var header = processorTable.createTHead();
        header.style.height = "35px";
        var titleRow = header.insertRow(0);
        var titleCell = titleRow.insertCell(0);
        titleRow.style.height = "35px";
        titleCell.setAttribute("colspan", this.headers.length.toString());
        titleCell.setAttribute("width", "100%");
        titleCell.textContent = this.name;

        var sectionDescriptionRow = header.insertRow(1);

        for (var i = 0; i < this.headers.length; ++i) {
            var cell = sectionDescriptionRow.insertCell(0);
            cell.textContent = this.headers[i];
            cell.setAttribute("width", this.headerWidths[i]);
        }

        var body = processorTable.createTBody();

        // Progress bar section start
        var progressRow = body.insertRow(0);
        var progressCell = progressRow.insertCell(0);
        progressCell.setAttribute("class", "progressbarcontainer");

        progressRow.style.height = "35px";

        var progressBar = document.createElement("progress");
        var progressText = document.createElement("div");
        progressBar.setAttribute("id", "processorprog" + this.id.toString());
        progressBar.setAttribute("max", "100");
        progressBar.setAttribute("class", "progressbar");
        progressText.setAttribute("id", "processorprogtext" + this.id.toString());
        progressText.setAttribute("class", "progressbartext");

        progressCell.setAttribute("colspan", this.headers.length.toString());
        progressCell.appendChild(progressBar);
        progressCell.appendChild(progressText);

        // Progress bar section end
        var contentRow = body.insertRow(1);
        contentRow.style.height = "150px";
        var actionCell = contentRow.insertCell(0);
        var recipeCell = contentRow.insertCell(0);
        var requirementsCell = contentRow.insertCell(0);
        var capacityCell = contentRow.insertCell(0);
        var imageCell = contentRow.insertCell(0);

        var img = document.createElement("img");
        img.setAttribute("src", "/Images/" + this.name + ".png");
        imageCell.appendChild(img);

        capacityCell.textContent = this.capacity.toString();
        capacityCell.setAttribute("id", "processorcapacity" + this.id);

        requirementsCell.setAttribute("id", "processorrequirements" + this.id);
        requirementsCell.setAttribute("class", "processorrequirements");

        var recipeQuantity = document.createElement("input");
        recipeQuantity.setAttribute("type", "text");
        recipeQuantity.setAttribute("id", "processorrecipequantity" + this.id);
        recipeQuantity.style.width = "35px";
        recipeQuantity.setAttribute("value", this.processor.Jobs.toString());
        recipeQuantity.onkeyup = function (event) {
            var element = (event.target);
            var quantity = +element.value;
            var processor = game.processorSystem.items[element.id.replace("processorrecipequantity", "")];

            if (!isNaN(quantity)) {
                processor.Jobs = quantity;
                if (quantity > processor.Capacity) {
                    element.value = processor.Capacity;
                    processor.Jobs = processor.Capacity;
                }
            } else {
                processor.Jobs = 0;
            }
            processor.UI.Update();
        };

        var recipeSelector = document.createElement("select");
        recipeSelector.setAttribute("id", "processorrecipeselect" + this.id);
        for (i = 0; i < this.recipes.length; ++i) {
            var option = document.createElement("option");
            var selectiontext = "";
            for (var x = 0; x < this.recipes[i].Recipe.outputs.length; ++x) {
                selectiontext = selectiontext.concat(this.recipes[i].Recipe.outputs[x].item.Name);
            }
            option.textContent = selectiontext;
            recipeSelector.appendChild(option);
            recipeSelector.selectedIndex = this.processor.GetRecipeIndex();
        }
        recipeSelector.onchange = function (event) {
            var element = (event.target);
            var processor = game.processorSystem.items[element.id.replace("processorrecipeselect", "")];

            processor.ActiveRecipe = processor.Recipes[element.selectedIndex];
            processor.Recipe = processor.Recipes[element.selectedIndex];
            processor.UI.Update();
        };

        recipeCell.appendChild(recipeQuantity);
        recipeCell.appendChild(recipeSelector);

        var deactivation = document.createElement("input");
        deactivation.setAttribute("id", "processordeactivator" + this.id);
        deactivation.setAttribute("type", "button");
        deactivation.setAttribute("value", "Deactivate");
        deactivation.setAttribute("title", "Salvages half of the unused inputs.");
        deactivation.addEventListener("click", function (event) {
            var element = (event.target);
            var processor = game.processorSystem.items[element.id.replace("processordeactivator", "")];

            processor.Deactivate();
            processor.UI.Update();
        }, false);

        var activation = document.createElement("input");
        activation.setAttribute("id", "processoractivator" + this.id);
        activation.setAttribute("type", "button");
        activation.setAttribute("value", "Activate");
        activation.addEventListener("click", function (event) {
            var element = (event.target);
            var processor = game.processorSystem.items[element.id.replace("processoractivator", "")];

            processor.Activate();
            processor.UI.Update();
        }, false);

        actionCell.appendChild(activation);
        actionCell.appendChild(deactivation);

        processorPanel.appendChild(processorTable);
        processorPanel.appendChild(document.createElement("br"));
        this.drawSidebar();
        return processorPanel;
    };

    // container "processorpanel" + ID <div>
    // Progress Bar id = "processorprog"+ ID <progress>
    // Capacity "processorcapacity" + ID <div>
    // Recipe requirements "processorrequirements"+ ID <div>
    // Recipe selector "processorrecipeselect" +  ID <select>
    // Recipe quantity "processorrecipequantity" + ID <input> text
    // Activation button "processoractivator" + ID <input> button
    // Sidebar div "processorstatus" + this.id
    ProcessorUI.prototype.Update = function () {
        var processor = game.processorSystem.items[this.id];

        var capacity = document.getElementById("processorcapacity" + this.id);

        var recipereq = document.getElementById("processorrequirements" + this.id);
        var panel = document.getElementById("processorpanel" + this.id);
        var progress = document.getElementById("processorprog" + this.id);
        var progressText = document.getElementById("processorprogtext" + this.id);

        var selector = document.getElementById("processorrecipeselect" + this.id);
        var sQuantity = document.getElementById("processorrecipequantity" + this.id);
        var activator = document.getElementById("processoractivator" + this.id);
        var deactivator = document.getElementById("processordeactivator" + this.id);

        var overallcont = document.getElementById("processoroverall" + this.id);
        var overallprog = document.getElementById("overprocessorprogress" + this.id);
        var sidebarprog = document.getElementById("processorprogress" + this.id);
        var sidebarcont = document.getElementById("processorstatuscon" + this.id);
        var sidebar = document.getElementById("processorstatus" + this.id);

        if (processor.ActiveRecipe) {
            overallcont.textContent = (processor.ActiveProgress + "/" + processor.ActiveJobs + " " + processor.ActiveRecipe.Recipe.outputs[0].item.Name);
            overallprog.max = processor.MaxProgress;
            overallprog.value = processor.Progress;
            sidebarprog.max = processor.MaxProgress * processor.ActiveJobs;
            sidebarprog.value = (processor.Progress) + (processor.MaxProgress * processor.ActiveProgress);
        }
        sidebarcont.style.display = (processor.RemainingTime > 0) ? 'block' : 'none';
        sidebar.textContent = "(" + Math.floor(processor.RemainingTime / 60) + ":" + ((processor.RemainingTime % 60 < 10) ? "0" : "") + processor.RemainingTime % 60 + ")";

        panel.style.display = ((processor.Enabled) ? 'block' : 'none');
        progress.max = processor.MaxProgress;
        progress.value = processor.Progress;
        capacity.textContent = processor.Capacity.toString();

        while (recipereq.firstChild) {
            recipereq.removeChild(recipereq.firstChild);
        }

        var recipeDisplays = processor.Recipe.Recipe.inputs;
        var recipeTooltip = "";
        for (var i = 0; i < recipeDisplays.length; ++i) {
            recipereq.appendChild(new ItemQuantityPair(recipeDisplays[i].item, recipeDisplays[i].quantity * processor.Jobs).addTotalCount().display("processor" + this.id + "recipe" + i));
            recipeTooltip = recipeTooltip.concat(recipeDisplays[i].quantity * processor.Jobs + " " + recipeDisplays[i].item.Name + " ");
        }
        recipereq.setAttribute("title", recipeTooltip);

        selector.disabled = ((processor.ActiveJobs > 0) ? true : false);
        processor.ActiveRecipe = processor.Recipes[selector.selectedIndex];
        processor.Recipe = processor.Recipes[selector.selectedIndex];
        sQuantity.disabled = ((processor.ActiveJobs > 0) ? true : false);
        activator.disabled = ((processor.ActiveJobs > 0) ? true : false);
        deactivator.style.display = ((processor.ActiveJobs > 0) ? "inline-block" : "none");

        progressText.textContent = (processor.ActiveJobs > 0) ? "Manufacturing " + processor.ActiveRecipe.Recipe.outputs[0].item.Name + " (" + processor.ActiveProgress + "/" + processor.ActiveJobs + ")" : "";
    };

    ProcessorUI.prototype.drawSidebar = function () {
        var sidebar = document.getElementById("sidebar");

        var sidebarmachines = document.createElement("div");
        sidebarmachines.setAttribute("id", "processorstatuscon" + this.id);
        sidebarmachines.setAttribute("class", "sidebarinventory");
        sidebarmachines.style.position = "relative";
        sidebarmachines.style.border = "solid 1px";
        sidebarmachines.style.width = "94.75%";
        sidebarmachines.style.display = "none";
        var sidebarmachineheader = document.createElement("div");
        sidebarmachineheader.style.position = "absolute";
        sidebarmachineheader.style.top = "0";
        sidebarmachineheader.style.right = "0";
        sidebarmachineheader.style.textAlign = "center";
        sidebarmachineheader.style.width = "100%";
        sidebarmachineheader.textContent = this.name;
        var statusHolder = document.createElement("div");
        statusHolder.style.position = "relative";
        statusHolder.style.width = "96%;";
        statusHolder.style.margin = "2%";
        statusHolder.style.marginTop = "25px";

        var overallHolder = document.createElement("div");
        overallHolder.style.position = "relative";
        overallHolder.style.width = "96%;";
        overallHolder.style.margin = "2%";

        var processorstatus = document.createElement("div");
        processorstatus.setAttribute("id", "processorstatus" + this.id);
        processorstatus.style.width = "100%";
        processorstatus.style.textAlign = "center";
        processorstatus.style.display = "inline-block";
        processorstatus.style.position = "absolute";
        processorstatus.style.top = "0";
        processorstatus.style.right = "0";
        processorstatus.style.zIndex = "1001";

        var processorprogress = document.createElement("progress");
        processorprogress.id = "processorprogress" + this.id;
        processorprogress.style.width = "100%";
        processorprogress.style.top = "0";
        processorprogress.style.right = "0";
        processorprogress.style.zIndex = "1000";
        processorprogress.setAttribute("class", "greenprog");

        var overallprocessorprogress = document.createElement("progress");
        overallprocessorprogress.id = "overprocessorprogress" + this.id;
        overallprocessorprogress.style.width = "100%";
        overallprocessorprogress.setAttribute("class", "greenprog");

        var overallprocessortext = document.createElement("div");
        overallprocessortext.setAttribute("id", "processoroverall" + this.id);
        overallprocessortext.style.width = "100%";
        overallprocessortext.style.textAlign = "center";
        overallprocessortext.style.display = "inline-block";
        overallprocessortext.style.position = "absolute";
        overallprocessortext.style.top = "0";
        overallprocessortext.style.right = "0";
        overallprocessortext.style.zIndex = "1001";

        sidebarmachines.appendChild(sidebarmachineheader);
        statusHolder.appendChild(processorprogress);
        statusHolder.appendChild(processorstatus);
        overallHolder.appendChild(overallprocessortext);
        overallHolder.appendChild(overallprocessorprogress);
        sidebarmachines.appendChild(statusHolder);
        sidebarmachines.appendChild(overallHolder);
        sidebar.appendChild(sidebarmachines);
    };
    return ProcessorUI;
})();
//# sourceMappingURL=ProcessorUI.js.map
