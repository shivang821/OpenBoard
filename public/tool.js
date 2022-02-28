let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let toolsCont = document.querySelector(".tools-cont");
let optionscont = document.querySelector(".options-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let pencilFlag = false;
let eraserFlag = false;
let sticky = document.querySelector(".sticky");
let stickyFlag = false;
let optionsFlag = true;
let upload = document.querySelector(".upload");
optionscont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;
    if (optionsFlag) opentool();
    else closetool();
});

function opentool() {
    let iconClass = optionscont.children[0];
    iconClass.classList.remove("fa-bars");
    iconClass.classList.add("fa-times");
    toolsCont.style.display = "flex";
    toolsCont.classList.add("scale-tools");
}

function closetool() {
    let iconClass = optionscont.children[0];
    iconClass.classList.remove("fa-times");
    iconClass.classList.add("fa-bars");
    toolsCont.style.display = "none";
    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}
pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;
    if (pencilFlag) pencilToolCont.style.display = "block";
    else pencilToolCont.style.display = "none";
});
eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;
    if (eraserFlag) eraserToolCont.style.display = "flex";
    else eraserToolCont.style.display = "none";
});
upload.addEventListener("click", (e) => {
    // open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let stickyTemplateHtml = `
        <div class="sticky-cont">
            <div class="header-cont">
                <div class="minimized"></div>
                <div class="remove"></div>
            </div>
            <div class="note-cont">
                <img src="${url}" class="urlimage"/>
            </div>
        </div>
        `;
        createSticky(stickyTemplateHtml);
    });
});

function createSticky(stickyTemplateHtml) {
    let stickycont = document.createElement("div");
    stickycont.setAttribute("class", "sticky-cont");
    stickycont.innerHTML = stickyTemplateHtml;
    document.body.appendChild(stickycont);

    let minimize = stickycont.querySelector(".minimized");
    let remove = stickycont.querySelector(".remove");
    noteActions(minimize, remove, stickycont);
    stickycont.onmousedown = function(event) {
        dragAndDrop(stickycont, event);
    };
    stickycont.ondragstart = function() {
        return false;
    };
}

sticky.addEventListener("click", (e) => {
    let stickyTemplateHtml = `
    <div class="sticky-cont">
        <div class="header-cont">
            <div class="minimized"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <textarea spellcheck="false"></textarea>
        </div>
    </div>
    `;
    createSticky(stickyTemplateHtml);

});

function noteActions(minimize, remove, stickycont) {
    remove.addEventListener("click", (e) => {
        stickycont.remove();
        console.log("hello");
    });
    minimize.addEventListener("click", (e) => {
        let noteCont = stickycont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display == "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    });
}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = "absolute";
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + "px";
        element.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the element on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
        document.removeEventListener("mousemove", onMouseMove);
        element.onmouseup = null;
    };
}