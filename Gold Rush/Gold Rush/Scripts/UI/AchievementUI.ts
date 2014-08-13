class AchievementUI {
    constructor(ach: AchievementSystem) {
        this.achievementSystem = ach;
        this.Draw();
    }

    achievementSystem: AchievementSystem

    Draw() {
        for (var i = 0; i < this.achievementSystem.items.length; ++i) {
            var achContainer = document.createElement("div");
            var achImage = document.createElement("div");
            var achText = document.createElement("span");

            var achievement = this.achievementSystem.items[i];

            achContainer.style.width = "200px";
            achContainer.style.height = "75px";
            achContainer.style.margin = "10px";
            achContainer.style.display = "inline-block";
            achContainer.style.position = "relative";
            achContainer.style.backgroundColor = "#BDBBBB";
            achContainer.id = "achievementcontainer" + i;
            achContainer.title = achievement.GetTooltip();

            achImage.style.height = "65px";
            achImage.style.width = "65px";
            achImage.style.marginTop = "5px";
            achImage.style.marginLeft = "5px";
            achImage.style.display = "inline-block";
            achImage.style.backgroundColor = "#8D8C8C";
            achImage.id = "achievementimage" + i;

            achText.style.marginLeft = "30px";
            achText.style.position = "absolute";
            achText.style.top = "40%";
            achText.textContent = achievement.Name;
            achText.id = "achievementtext" + i;

            achContainer.appendChild(achImage);
            achContainer.appendChild(achText);

            document.getElementById("tabs-Achievements").appendChild(achContainer);
        }
    }

    Update() {
        for (var i = 0; i < this.achievementSystem.items.length; ++i) {
            var container = document.getElementById("achievementcontainer" + i);
            var image = document.getElementById("achievementimage" + i);
            var text = document.getElementById("achievementtext" + i);

            var achievement = this.achievementSystem.items[i];

            if (achievement.Requires) {
                text.textContent = (achievement.Requires.Completed) ? achievement.Name : "???";
                container.title = (achievement.Requires.Completed) ? achievement.GetTooltip() : "";
            }

            container.style.backgroundColor = (achievement.Completed) ? "#08E700" : "#BDBBBB";
        }
    }
} 