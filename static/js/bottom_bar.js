let IDList = [];
function CreateIDList(){
    fetch("static/json/data.json")
        .then(response => response.json())
        .then(data => {
            for (let cellData of data["Cells"]) {
                IDList.push(cellData["ID"]);
                // console.log(cellData["ID"]);
            }
            // ToCenter(IDList[2]); // For testing
    })
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
            ToCenter(id);
        });
    }
}