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
            let cellDiv = `<div class="cell" id="cell-${cellData["ID"]}">
                <p class="cell-title" id="${cellData["ID"]}">${cellData["Title"]}</p>
                <hr class="divider">`;
            if(cellData["PlayList"]){
                // console.log("PlayList detected for cell ID:", cellData["ID"]);
                cellDiv += `<div class="cell-play-button" id="play-button-${cellData["ID"]}"></div>`
            }
            let bottomBar = `<p id="nav-${cellData["ID"]}">${cellData["Title"]}</a>`;// href="#${cellData["ID"]}"

            IDList.push(cellData["ID"]);
            for (let line of cellData["Index"]) {
                if(line["type"] === "p"){
                    let text="";
                    if(window.innerWidth <= TextWeight){
                         for(let i =0; i < line["text"].length; i++){
                            if(i === line["text"].length -1){
                                text += line["text"][i];
                            }else{
                                text += line["text"][i] + "<br>"+"&nbsp;".repeat(line["space"]);
                            }
                         }
                    }
                    else{
                        for(let i =0; i < line["text"].length; i++){
                            text += line["text"][i];
                        }
                    }
                    cellDiv += `<p class="cell-descripition">${text}</p>`;
                }else if(line["type"] === "spacer"){
                    cellDiv += `<div style="height: ${line["height"]}px; width: 1px; flex-shrink: 0"></div>`;
                }
                else if(line["type"] === "a"){
                    cellDiv += `<a class="cell-a" href="${line["href"]}" target="_blank">${line["text"]}</a>`;
                }
                else if(line["type"] === "mail"){
                    cellDiv += `<a class="cell-a" href="mailto:${line["href"]}">${line["text"]}</a>`;
                }else if(line["type"] === "img"){
                    cellDiv += `<img class="cell-image" src="${line["src"]}" alt="${line["alt"]}"></img>`;
                }else if(line["type"] === "music"){
                    if(String(line["id"]) === "-1"){
                        cellDiv += `<p class="cell-descripition mc-text">${line["text"]}</p>`;
                    }else if(String(line["id"]) === "-2"){
                        cellDiv += `<p class="cell-descripition music-undefined-text">${line["name"]}(音檔待下載)</p>`;
                    }else{
                        const musicInfo = MusicData[line["id"]];
                        if(cellData["ID"] === "Setlist530"){
                            PlayList530.push(line["id"]);
                        }else if(cellData["ID"] === "Setlist531"){
                            PlayList531.push(line["id"]);
                        }
                        cellDiv += `<p class="cell-descripition music-text">${musicInfo[0]}</p>`;
                        
                    }
                }
            }
            cellDiv += `</div>`;
            backgroundDiv.insertAdjacentHTML("beforeend", cellDiv);
            bottomBarContainer.insertAdjacentHTML("beforeend", bottomBar);
            AddListener(cellData["ID"]);
        }
        const spacerDiv = `<div style="height: 50%; width: 1px; flex-shrink: 0"></div>`;
        backgroundDiv.insertAdjacentHTML("beforeend", spacerDiv);
        for (let cellData of data["Cells"]) {
            if(cellData["PlayList"]){
                document.getElementById(`play-button-${cellData["ID"]}`).addEventListener("click",function(){
                    // console.log(cellData["ID"]);
                    Play(cellData["ID"]);
                })
            }
        }
        CreateIDList();//Bottom Bar
    })
}


document.addEventListener("DOMContentLoaded", function() {

    initializeBackground();
    // resizeBackground();
    // let isListenerAdded = false;
    // if (!isListenerAdded) {
    //     window.addEventListener("resize", resizeBackground);
    //     isListenerAdded = true;
    // }
})  