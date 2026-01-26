function resizeBackground() {
    const backgroundDiv = document.getElementById("background");
    backgroundDiv.style.height = String(Number(window.innerHeight) - BackgroundMrgin*2) + "px";
    backgroundDiv.style.width = String(Number(window.innerWidth) - BackgroundMrgin*2) + "px";
}

function initializeBackground() {
    const backgroundDiv = document.getElementById("background");

    // <div class="cell">
    //         <p class="cell-title">Zepp New Taipei</p>
    //         <hr class="divider">
    //         <p class="cell-descripition">地址:新北市新莊區新北大道四段3號8樓<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(宏匯廣場)</p>
    //         <div style="height: 30px; width: 1px; flex-shrink: 0"></div>
    //         <!-- <div class="info-divider-container">
    //             <p class="info-text">info</p>
    //             <hr class="info-divider">
    //         </div> -->
    //         <a class="cell-a" href="https://www.zepp.co.jp/hall/newtaipei/" target="_blank">Zepp官方網站</a>
    //         <a class="cell-a" href="https://www.facebook.com/zeppnewtaipei/?locale=zh_TW" target="_blank">Zepp facebook</a>
    //         <a class="cell-a" href="https://www.instagram.com/zeppnewtaipei/" target="_blank">Zepp instagram</a>
    //         <a class="cell-a" href="mailto:inquiry.tw@zepp.co.jp">Zepp mail</a>
    //         <a class="cell-a" href="https://www.google.com/maps/dir/台北車站捷運站+100臺北市中正區忠孝西路一段/Zepp+New+Taipei+242新北市新莊區新北大道四段3號8樓/@25.0574708,121.4595517,14z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x3442a965e1aebc47:0xfc079d9e81a5d9c6!2m2!1d121.5156511!2d25.0467151!1m5!1m1!1s0x3442a914b663455b:0xee6cea3890a8418f!2m2!1d121.4494801!2d25.0597396!3e3?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D" target="_blank">
    //             google map  (台北車站-Zepp New Taipei)
    //         </a>
    //     </div>
    fetch("static/json/data.json")
    .then(response => response.json())
    .then(data => {
        let TopImage = `<img src="${data["TopImage"]}" alt="Yuika 2nd Asia Tour in Taipei" class="top-image"></img>`;
        backgroundDiv.insertAdjacentHTML("beforeend", TopImage);

        for (let cellData of data["Cells"]) {
            let cellDiv = `<div class="cell">
                <p class="cell-title">${cellData["Title"]}</p>
                <hr class="divider">`
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
        }
        const spacerDiv = `<div style="height: 20%; width: 1px; flex-shrink: 0"></div>`;
        backgroundDiv.insertAdjacentHTML("beforeend", spacerDiv);
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