let IDList = [];
let IsMove = false;

function CreateIDList(){
    fetch("static/json/data.json")
        .then(response => response.json())
        .then(data => {
            for (let cellData of data["Cells"]) {
                IDList.push(cellData["ID"]);
            }
            initScrollDetection();
            const firstElement = document.getElementById("nav-" + IDList[0]);
            if(firstElement){
                firstElement.className = "active";
                firstElement.style.color = "#000097"
            }
    })
}


function initScrollDetection() {
    const container = document.getElementById("background");
    let ticking = false;
    
    container.addEventListener("scroll", function() {
        console.log(IsMove);
        if (!ticking && !IsMove) {
            window.requestAnimationFrame(() => {
                checkVisibleSection();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function checkVisibleSection() {
    const viewportMiddle = window.innerHeight*0.15;
    let closestElement = null;
    let closestDistance = Infinity;
    
    IDList.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            const rect = element.getBoundingClientRect();
            const elementMiddle = rect.top + rect.height / 2;
            const distance = Math.abs(elementMiddle - viewportMiddle);
            if (distance < closestDistance && rect.top < window.innerHeight && rect.bottom > 0) {
                closestDistance = distance;
                closestElement = id;
            }
        }
    });
    
    if (closestElement) {
        ToCenter(closestElement);
    }
}


function ToCenter(id) {
    const BottomBarElement = document.getElementById("nav-" + id);
    
    if(BottomBarElement){
        const bottomBarContainer = document.getElementById("bottom-bar-container");
        
        if(BottomBarElement.id !== "nav-" + IDList[0] && BottomBarElement.id !== "nav-" + IDList[IDList.length -1]){
            // To center
            // const containerWidth = bottomBarContainer.offsetWidth;
            // const linkLeft = BottomBarElement.offsetLeft;
            // const linkWidth = BottomBarElement.offsetWidth;
            // const scrollPosition = linkLeft - (containerWidth / 2) + (linkWidth / 2);
            // bottomBarContainer.scrollTo({
            //     left: scrollPosition,
            //     behavior: 'smooth'
            // });
            // To center
            const containerRect = bottomBarContainer.getBoundingClientRect();
            const elementRect = BottomBarElement.getBoundingClientRect();
            
            // 計算元素相對於容器的位置
            const elementCenter = elementRect.left - containerRect.left + elementRect.width / 2;
            const containerCenter = containerRect.width / 2;
            const scrollOffset = elementCenter - containerCenter;
            
            bottomBarContainer.scrollTo({
                left: bottomBarContainer.scrollLeft + scrollOffset,
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
function MoveTo(id){
    const cellElement = document.getElementById(id);
    const backgroundDiv = document.getElementById("background");
    if(cellElement){
        // IsMove = true;
        const elementTop = cellElement.offsetTop;
        const offset = window.innerHeight * offsetPercent;
        const targetPosition = elementTop - offset;

        backgroundDiv.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
        ToCenter(id);
        let scrollTimeout;
        const onScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                IsMove = false;
                backgroundDiv.removeEventListener('scroll', onScroll);
            }, 150);
        };
        
        backgroundDiv.addEventListener('scroll', onScroll);
    }
}
function AddListener(id){
    const BottomBarElement = document.getElementById("nav-" + id);
    if(BottomBarElement){
        BottomBarElement.addEventListener("click", function() {
            IsMove = true;
            MoveTo(id);
            // IsMove = false;
        });
    }
}

