const level = {
    "mydiv" : 0,
    "mydiv2" : 1,
}

// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));
dragElement(document.getElementById("mydiv2"))
renderLines();

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        let top = elmnt.offsetTop - pos2
        let left = elmnt.offsetLeft - pos1
        elmnt.style.top = top + "px";
        elmnt.style.left = left + "px";
        updateLine(elmnt)
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

function updateLine(elmnt) {
    let line = document.querySelector(`path[id*=${elmnt.id}]`)
    let lineId = line.id
    let isStartingLine = lineId.slice(0, elmnt.id.length) == elmnt.id
    let secondBoxId = (isStartingLine) ? lineId.substring(elmnt.id.length + 4, lineId.length) : lineId.substring(0, lineId.indexOf("-to-"))
    let secondBox = document.getElementById(secondBoxId)

    let y = elmnt.offsetTop + (elmnt.offsetHeight / 2)
    let secondY = secondBox.offsetTop + (secondBox.offsetHeight / 2)
    let curveY = (level[elmnt.id] < level[secondBox.id]) ? y : secondY
    let curvePoints = getCurvePoints(line.getAttribute("d").toString())
    
    if (isStartingLine) {
        let x2 = (getHorizontalOffsetCenter(elmnt) > getHorizontalOffsetCenter(secondBox)) ? getOffsetRight(secondBox) : secondBox.offsetLeft
        let x1 = (getHorizontalOffsetCenter(elmnt) > getHorizontalOffsetCenter(secondBox)) ? elmnt.offsetLeft : getOffsetRight(elmnt);

        let path = createPathString(x1, y, x2, curveY, x2, curvePoints.endY)
        line.setAttribute("d", path)
    } else {
        let x1 = (getHorizontalOffsetCenter(elmnt) > getHorizontalOffsetCenter(secondBox)) ? getOffsetRight(secondBox) : secondBox.offsetLeft
        let x2 = (getHorizontalOffsetCenter(elmnt) > getHorizontalOffsetCenter(secondBox)) ? elmnt.offsetLeft : getOffsetRight(elmnt)

        let path = createPathString(x1, curvePoints.startY, x2, curveY, x2, y)
        line.setAttribute("d", path)
        console.log(path)
    }
}

function renderLines() {
    var firstBox = document.getElementById("mydiv")
    updateLine(firstBox)
}

function getCurvePoints(pathString) {
    const [_, x1, y1, Q, cx, cy, x2, y2] = pathString.split(" ");
    const startX = parseFloat(x1);
    const startY = parseFloat(y1);
    const endX = parseFloat(x2);
    const endY = parseFloat(y2);
    const controlX = parseFloat(cx);
    const controlY = parseFloat(cy);
    return { startX, startY, controlX, controlY, endX, endY };
}

function createPathString(startX, startY, controlX, controlY, endX, endY) {
    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
}

function getOffsetRight(element) {
    return element.offsetLeft + element.offsetWidth
}

function getHorizontalOffsetCenter(element) {
    return element.offsetLeft + (element.offsetWidth/ 2 )
}
