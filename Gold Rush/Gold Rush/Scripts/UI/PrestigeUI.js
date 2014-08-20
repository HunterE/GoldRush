var PrestigeUI = (function () {
    function PrestigeUI(prestige) {
        this.prestigeSystem = prestige;
        this.draw();
    }
    PrestigeUI.prototype.draw = function () {
        var prestigeTab = document.getElementById("tabs-Prestige");

        while (prestigeTab.firstChild) {
            prestigeTab.removeChild(prestigeTab.firstChild);
        }

        var currentPrestigePanel = document.createElement("div");
        var prestigeRewardsPanel = document.createElement("div");

        var nextPrestigeReqPanel = document.createElement("div");
        var nextPrestigeRewPanel = document.createElement("div");
        var nextPrestigeButton = document.createElement("button");

        // Current prestige panel
        currentPrestigePanel.id = "currentprestigepanel"; // Prestige Panel Holder
        currentPrestigePanel.style.height = "75px";
        currentPrestigePanel.style.width = "95%";
        currentPrestigePanel.style.position = "relative";
        currentPrestigePanel.style.margin = "auto";
        currentPrestigePanel.style.border = "1px solid black";
        currentPrestigePanel.style.borderRadius = "10px";

        var currentPrestigeText = document.createElement("span");
        currentPrestigeText.id = "currentprestigetext"; // Prestige Label: Prestige Panel Holder
        currentPrestigeText.style.marginLeft = "40%";
        currentPrestigeText.style.marginTop = "17px";
        currentPrestigeText.style.fontSize = "30px";
        currentPrestigeText.style.display = "inline-block";
        var currentPrestigeImg = document.createElement("img");
        currentPrestigeImg.id = "currentprestigeimage"; // Prestige Image: Prestige Panel Holder
        currentPrestigeImg.setAttribute("class", "inventoryheaderimg");

        currentPrestigePanel.appendChild(currentPrestigeImg);
        currentPrestigePanel.appendChild(currentPrestigeText);

        prestigeTab.appendChild(currentPrestigePanel);

        if (this.prestigeSystem.GetHighestPrestige() !== this.prestigeSystem.HighestPrestige) {
            prestigeTab.appendChild(document.createElement("br"));

            var nextPrestige = this.prestigeSystem.items[this.prestigeSystem.GetHighestPrestige().ID + 1];

            // Next prestige req panel
            nextPrestigeReqPanel.id = "nextprestigerequirements";
            nextPrestigeReqPanel.style.width = "95%";
            nextPrestigeReqPanel.style.position = "relative";
            nextPrestigeReqPanel.style.margin = "auto";
            nextPrestigeReqPanel.style.border = "1px solid black";
            nextPrestigeReqPanel.style.borderRadius = "10px";

            var table = document.createElement("table");
            table.style.width = "100%";
            table.style.border = "none";
            var header = table.createTHead();
            var row = header.insertRow(0);
            row.style.textAlign = "center";
            row.style.fontSize = "30px";
            row.textContent = "Requirements for " + nextPrestige.Item.Name + " tier";

            var body = table.createTBody();

            for (var r = 0; r < nextPrestige.Requirements.length; ++r) {
                var requirement = nextPrestige.Requirements[r];
                var row = body.insertRow(body.rows.length);
                var prog = document.createElement("div");
                prog.id = "prestigereqprog" + r;
                row.appendChild(prog);
                row.style.textAlign = "center";
                row.style.fontSize = "18px";

                row.id = "prestigereq" + r;
                row.textContent = requirement.GetTooltip();
            }

            nextPrestigeReqPanel.appendChild(table);
            prestigeTab.appendChild(nextPrestigeReqPanel);

            // Next prestige rewards panel
            prestigeTab.appendChild(document.createElement("br"));

            nextPrestigeRewPanel.id = "nextprestigerewards";
            nextPrestigeRewPanel.style.width = "95%";
            nextPrestigeRewPanel.style.position = "relative";
            nextPrestigeRewPanel.style.margin = "auto";
            nextPrestigeRewPanel.style.border = "1px solid black";
            nextPrestigeRewPanel.style.borderRadius = "10px";

            var table = document.createElement("table");
            table.style.width = "100%";
            table.style.border = "none";
            var header = table.createTHead();
            var row = header.insertRow(0);
            row.style.textAlign = "center";
            row.style.fontSize = "30px";
            row.textContent = "Rewards for " + nextPrestige.Item.Name + " tier";

            var body = table.createTBody();

            for (var x = 0; x < nextPrestige.Rewards.length; ++x) {
                var reward = nextPrestige.Rewards[x];
                var row = body.insertRow(body.rows.length);
                row.style.textAlign = "center";
                row.style.fontSize = "18px";

                row.textContent = reward.GetTooltip();
            }

            nextPrestigeRewPanel.appendChild(table);
            prestigeTab.appendChild(nextPrestigeRewPanel);

            // next prestige button
            prestigeTab.appendChild(document.createElement("br"));

            nextPrestigeButton.id = "nextprestigebutton";
            nextPrestigeButton.style.width = "95%";
            nextPrestigeButton.style.position = "relative";
            nextPrestigeButton.style.margin = "auto";
            nextPrestigeButton.style.border = "1px solid black";
            nextPrestigeButton.style.borderRadius = "10px";
            nextPrestigeButton.textContent = "PRESTIGE";
            nextPrestigeButton.style.height = "40px";
            nextPrestigeButton.addEventListener("click", function () {
                game.prestigeSystem.Prestige(nextPrestige);
            }, false);

            prestigeTab.appendChild(nextPrestigeButton);
        }
        this.update();
    };

    PrestigeUI.prototype.update = function () {
        document.getElementById("currentprestigetext").textContent = this.prestigeSystem.GetHighestPrestige().Item.Name + " tier";
        document.getElementById("currentprestigeimage").src = "/Images/" + this.prestigeSystem.GetHighestPrestige().Item.Name + ".png";

        if (this.prestigeSystem.GetHighestPrestige() !== this.prestigeSystem.HighestPrestige) {
            var nextPrestige = this.prestigeSystem.items[this.prestigeSystem.GetHighestPrestige().ID + 1];

            for (var r = 0; r < nextPrestige.Requirements.length; ++r) {
                var reqrow = document.getElementById("prestigereq" + r);
                var req = nextPrestige.Requirements[r];

                //reqrow.style.backgroundColor = (req.Condition.condition() ? "green" : "white");
                var progdiv = document.getElementById("prestigereqprog");
                var prog = req.Condition.getprogress() * 100;

                progdiv.style.width = prog + "%";
                progdiv.style.backgroundColor = (prog > 40 ? (prog < 100 ? "yellow" : "green") : "red");
            }

            var btn = document.getElementById("nextprestigebutton").style.display = (this.prestigeSystem.CheckRequirements(nextPrestige) ? "block" : "none");
        }
    };
    return PrestigeUI;
})();
//# sourceMappingURL=PrestigeUI.js.map
