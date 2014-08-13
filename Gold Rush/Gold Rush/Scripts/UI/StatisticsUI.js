var StatisticsUI = (function () {
    function StatisticsUI(items) {
        this.headers = ["Alltime collected", "Item"];
        this.headerWidths = ["85%", "15%"];
        this.itemSystem = items;
        this.Draw();
    }
    StatisticsUI.prototype.Draw = function () {
        var itemStatsPanel = document.createElement("div");
        itemStatsPanel.style.width = "45%";
        itemStatsPanel.style.margin = "2%";
        itemStatsPanel.appendChild(this.DrawItemStatsTable());

        document.getElementById("tabs-Statistics").appendChild(itemStatsPanel);
    };

    StatisticsUI.prototype.DrawItemStatsHeader = function () {
        var achievementtable = document.createElement("table");
        achievementtable.setAttribute("class", "processortable");

        var header = achievementtable.createTHead();
        var titleRow = header.insertRow(0);
        var titleCell = titleRow.insertCell(0);
        titleRow.style.height = "35px";
        titleCell.textContent = "Statistics";
        titleCell.setAttribute("colspan", this.headers.length.toString());
        header.style.height = "35px";

        var descriptions = header.insertRow(1);
        descriptions.style.height = "35px";
        for (var i = 0; i < this.headers.length; ++i) {
            var cell = descriptions.insertCell(0);
            cell.style.width = this.headerWidths[i];
            cell.textContent = this.headers[i];
        }

        return achievementtable;
    };

    StatisticsUI.prototype.DrawItemStatsTable = function () {
        var achievementtable = this.DrawItemStatsHeader();
        var body = achievementtable.createTBody();

        for (var i = 0; i < this.itemSystem.items.length; ++i) {
            var item = this.itemSystem.items[i];

            var row = body.insertRow(body.rows.length);
            var quantity = row.insertCell(0);
            var itemcell = row.insertCell(0);
            quantity.setAttribute("id", "statsitemalltime" + i);
            itemcell.setAttribute("title", item.Name);

            var itemimg = document.createElement("img");
            itemimg.src = "/Images/" + item.Name + ".png";
            itemimg.style.width = "15px";
            itemimg.style.height = "15px";
            itemcell.appendChild(itemimg);
            quantity.textContent = item.Alltime.toString();
        }

        return achievementtable;
    };

    StatisticsUI.prototype.Update = function () {
        this.UpdateItemStatsTable();
    };

    StatisticsUI.prototype.UpdateItemStatsTable = function () {
        for (var i = 0; i < this.itemSystem.items.length; ++i) {
            document.getElementById("statsitemalltime" + i).textContent = formatNumber(this.itemSystem.items[i].Alltime);
        }
    };
    return StatisticsUI;
})();
//# sourceMappingURL=StatisticsUI.js.map
