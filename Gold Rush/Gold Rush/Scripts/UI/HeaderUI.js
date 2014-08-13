var HeaderUI = (function () {
    function HeaderUI(d) {
        this.resetScreen = false;
        this.iexportScreen = false;
        this.data = d;
        this.eventHandlers();
        this.draw();
    }
    HeaderUI.prototype.toggleReset = function () {
        var initialval = this.resetScreen;
        this.closeAll();
        this.resetScreen = !initialval;
        this.update();
    };

    HeaderUI.prototype.toggleIExport = function () {
        var initialval = this.iexportScreen;
        this.closeAll();
        this.iexportScreen = !initialval;
        this.update();
        this.refreshExportData();
    };

    HeaderUI.prototype.closeAll = function () {
        this.resetScreen = false;
        this.iexportScreen = false;
    };

    HeaderUI.prototype.eventHandlers = function () {
        document.getElementById("headerreset").addEventListener("click", function () {
            game.headerUI.toggleReset();
        }, false);

        document.getElementById("headerimportexport").addEventListener("click", function () {
            game.headerUI.toggleIExport();
        }, false);
    };

    HeaderUI.prototype.draw = function () {
        // Reset window
        var resetWindow = document.createElement("div");
        resetWindow.textContent = "Are you SURE you want to reset?";
        var confirm = document.createElement("input");
        confirm.setAttribute("type", "button");
        confirm.setAttribute("value", "Yes");
        confirm.style.position = "absolute";
        confirm.style.bottom = "0";
        confirm.style.right = "50%";
        confirm.addEventListener("click", function () {
            data.initializeData();
            game.headerUI.toggleReset();
        }, false);

        var decline = document.createElement("input");
        decline.setAttribute("type", "button");
        decline.setAttribute("value", "No");
        decline.style.position = "absolute";
        decline.style.bottom = "0";
        decline.style.right = "35%";
        decline.addEventListener("click", function () {
            game.headerUI.toggleReset();
        }, false);

        resetWindow.appendChild(confirm);
        resetWindow.appendChild(decline);
        resetWindow.style.width = "250px";
        resetWindow.style.height = "75px";
        resetWindow.style.position = "absolute";
        resetWindow.style.top = "50%";
        resetWindow.style.left = "50%";
        resetWindow.style.marginTop = "-37px";
        resetWindow.style.marginLeft = "-125px";
        resetWindow.style.backgroundColor = "white";
        resetWindow.style.textAlign = "center";
        resetWindow.style.border = "solid 1px black";
        resetWindow.id = "resetWindow";

        // Import Export Window
        var iexportWindow = document.createElement("div");
        iexportWindow.id = "iexportWindow";
        iexportWindow.style.width = "750px";
        iexportWindow.style.height = "500px";
        iexportWindow.style.position = "absolute";
        iexportWindow.style.top = "50%";
        iexportWindow.style.left = "50%";
        iexportWindow.style.marginTop = "-250px";
        iexportWindow.style.marginLeft = "-375px";
        iexportWindow.style.border = "solid 1px black";
        iexportWindow.style.backgroundColor = "white";
        var exportPane = document.createElement("div");
        exportPane.style.width = "46%";
        exportPane.style.height = "90%";
        exportPane.style.margin = "1.5%";
        exportPane.style.wordWrap = "break-word";
        exportPane.style.border = "solid 1px black";
        exportPane.style.verticalAlign = "top";
        exportPane.style.display = "inline-block";
        exportPane.style.overflow = "scroll";
        exportPane.id = "exportPane";
        var exportRefresh = document.createElement("input");
        exportRefresh.setAttribute("value", "Refresh Save");
        exportRefresh.setAttribute("type", "button");
        exportRefresh.style.position = "absolute";
        exportRefresh.style.bottom = "5px";
        exportRefresh.style.left = "135px";
        exportRefresh.addEventListener("click", function () {
            game.headerUI.refreshExportData();
        }, false);

        iexportWindow.appendChild(exportRefresh);

        var importPane = document.createElement("div");
        importPane.style.width = "45%";
        importPane.style.height = "90%";
        importPane.style.margin = "1.5%";
        importPane.style.border = "solid 1px black";
        importPane.style.display = "inline-block";
        var importText = document.createElement("textarea");
        importText.setAttribute("class", "textareafill");
        importText.id = "importPane";
        var importConfirm = document.createElement("input");
        importConfirm.setAttribute("value", "Import");
        importConfirm.setAttribute("type", "button");
        importConfirm.addEventListener("click", function () {
            data.importSave(document.getElementById("importPane").value);
        }, false);
        importConfirm.style.position = "absolute";
        importConfirm.style.bottom = "5px";
        importConfirm.style.right = "155px";

        iexportWindow.appendChild(importConfirm);

        importPane.appendChild(importText);
        iexportWindow.appendChild(exportPane);
        iexportWindow.appendChild(importPane);

        document.body.appendChild(iexportWindow);
        document.body.appendChild(resetWindow);
    };

    HeaderUI.prototype.update = function () {
        var rwindow = document.getElementById("resetWindow");
        rwindow.style.display = (this.resetScreen === true ? "block" : "none");

        var iexportwindow = document.getElementById("iexportWindow");
        iexportwindow.style.display = (this.iexportScreen === true ? "block" : "none");
    };

    HeaderUI.prototype.refreshExportData = function () {
        document.getElementById("exportPane").textContent = localStorage.getItem("save");
    };
    return HeaderUI;
})();
//# sourceMappingURL=HeaderUI.js.map
