function resizeBackground() {
    const backgroundDiv = document.getElementById("background");
    backgroundDiv.style.height = String(Number(window.innerHeight) - BackgroundMrgin*2) + "px";
    backgroundDiv.style.width = String(Number(window.innerWidth) - BackgroundMrgin*2) + "px";
}



function initializeBackground() {
    const backgroundDiv = document.getElementById("background");
    fetch("static/json/data.json")
    .then(response => response.json())
    .then(data => {
        let TopImage = `<img id="TopImage" src="${data["TopImage"]}" alt="Yuika 2nd Asia Tour in Taipei" class="top-image"></img>`;
        backgroundDiv.insertAdjacentHTML("beforeend", TopImage);
        
        const bottomBarContainer = document.getElementById("bottom-bar-container");

        for (let cellData of data["Cells"]) {
            let cellDiv = `<div class="cell">
                <p class="cell-title" id="${cellData["ID"]}">${cellData["Title"]}</p>
                <hr class="divider">`
            let bottomBar = `<a id="nav-${cellData["ID"]}" href="#${cellData["ID"]}">${cellData["Title"]}</a>`
            IDList.push(cellData["ID"]);
            for (let line of cellData["Index"]) {
                if(line["type"] === "p"){
                    cellDiv += `<p class="cell-descripition">${line["text"]}</p>`;
                }else if(line["type"] === "spacer"){
                    cellDiv += `<div style="height: ${line["height"]}px; width: 1px; flex-shrink: 0"></div>`;
                }
                else if(line["type"] === "a"){
                    cellDiv += `<a class="cell-a" href="${line["href"]}" target="_blank">${line["text"]}</a>`;
                }
                else if(line["type"] === "mail"){
                    cellDiv += `<a class="cell-a" href="mailto:${line["href"]}">${line["text"]}</a>`;
                }
            }
            cellDiv += `</div>`;
            backgroundDiv.insertAdjacentHTML("beforeend", cellDiv);
            bottomBarContainer.insertAdjacentHTML("beforeend", bottomBar);
            AddListener(cellData["ID"]);
        }
        const spacerDiv = `<div style="height: 50%; width: 1px; flex-shrink: 0"></div>`;
        backgroundDiv.insertAdjacentHTML("beforeend", spacerDiv);

        CreateIDList();//Bottom Bar
    })
}


document.addEventListener("DOMContentLoaded", function() {
    

    initializeBackground();
    resizeBackground();
    let isListenerAdded = false;
    if (!isListenerAdded) {
        window.addEventListener("resize", resizeBackground);
        isListenerAdded = true;
    }
})  