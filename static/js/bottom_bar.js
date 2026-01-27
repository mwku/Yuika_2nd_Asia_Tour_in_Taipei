let IDList = [];
let IsMove = false;

function CreateIDList(){
    fetch("static/json/data.json")
        .then(response => response.json())
        .then(data => {
            for (let cellData of data["Cells"]) {
                IDList.push(cellData["ID"]);
                // console.log(cellData["ID"]);
            }
            // ToCenter(IDList[2]); // For testing
            initIntersectionObserver();
            const firstElement = document.getElementById("nav-" + IDList[0]);
            if(firstElement){
                firstElement.className = "active";
                firstElement.style.color = "#000097"
            }
    })
}

function initIntersectionObserver() {
    const backgroundDiv = document.getElementById("background");
    const topimage = document.getElementById("TopImage");
    // console.log(topimage.offsetHeight)
    console.log(topimage);
    topimage.onload = function() {
            console.log("圖片載入完成, 高度:", topimage.offsetHeight);
            CreateIDList(); // 圖片載入後才執行
        };
    // const TopArea = topimage.offsetHeight+30-DetectAreaHight/2;
    // const BottomArea = backgroundDiv.offsetHeight - DetectAreaHight/2;
    // console.log("TopArea:", TopArea, "BottomArea:", BottomArea);
    const observerOptions = {
        root: backgroundDiv,
        rootMargin: `-${window.innerHeight * 0.1}px 0px -${window.innerHeight * 0.8}px 0px`,
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !IsMove) {
                const cellId = entry.target.id;
                console.log("進入中間區域:", cellId);
                ToCenter(cellId);
            }
        });
    }, observerOptions);
    
    IDList.forEach(id => {
        const cellElement = document.getElementById(id);
        if (cellElement) {
            observer.observe(cellElement);
        }
    });
}

function ToCenter(id) {
    const BottomBarElement = document.getElementById("nav-" + id);
    
    if(BottomBarElement){
        const bottomBarContainer = document.getElementById("bottom-bar-container");
        
        if(BottomBarElement.id !== "nav-" + IDList[0] && BottomBarElement.id !== "nav-" + IDList[IDList.length -1]){
            // To center
            const containerWidth = bottomBarContainer.offsetWidth;
            const linkLeft = BottomBarElement.offsetLeft;
            const linkWidth = BottomBarElement.offsetWidth;
            const scrollPosition = linkLeft - (containerWidth / 2) + (linkWidth / 2);
            bottomBarContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }else if(BottomBarElement.id === "nav-" + IDList[0]){
            // To left
            bottomBarContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }else if(BottomBarElement.id === "nav-" + IDList[IDList.length -1]){
            // To right
            bottomBarContainer.scrollTo({
                left: bottomBarContainer.scrollWidth,
                behavior: 'smooth'
            });
        }
        for(let otherID of IDList){
            const OtherElement = document.getElementById("nav-" + otherID);
            if(OtherElement && OtherElement.className === "active"){
                OtherElement.className = "";
                OtherElement.style.color = "#ffffff";
            }
        }
        BottomBarElement.className = "active";
        BottomBarElement.style.color = "#000097"
    }
}

function AddListener(id){
    const BottomBarElement = document.getElementById("nav-" + id);
    if(BottomBarElement){
        BottomBarElement.addEventListener("click", function() {
            IsMove = true;
            ToCenter(id);
            IsMove = false;
        });
    }
}

