let IDList = [];
let IsMove = false;
let isCentering = false;
let centeringTimeout = null; 

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
    let scrollTimeout;
    
    container.addEventListener("scrollend", function() {
        // console.log(IsMove);
        if (!ticking && !IsMove) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (!isCentering) {
                    window.requestAnimationFrame(() => {
                        checkVisibleSection();
                        ticking = false;
                    });
                }
            }, 50);
            ticking = true;
        }
    }, { passive: true });
}

function checkVisibleSection() {
    const viewportMiddle = window.innerHeight*offsetPercent;
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
    
    if(BottomBarElement && !isCentering){
        isCentering = true;
        clearTimeout(centeringTimeout);
        
        const bottomBarContainer = document.getElementById("bottom-bar-container");
        
        if(BottomBarElement.id !== "nav-" + IDList[0] && BottomBarElement.id !== "nav-" + IDList[IDList.length -1]){
            const containerRect = bottomBarContainer.getBoundingClientRect();
            const elementRect = BottomBarElement.getBoundingClientRect();
            
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
        BottomBarElement.style.color = "#000097";
        
        centeringTimeout = setTimeout(() => {
            isCentering = false;
        }, 150);
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
        });
    }
}

