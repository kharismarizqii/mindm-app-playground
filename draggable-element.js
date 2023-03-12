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
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        updateLine(elmnt.offsetTop - pos2, elmnt.offsetLeft - pos1)
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function updateLine(top, left) {
        let lineId = document.querySelector(`line[id*=${elmnt.id}]`).id
        let isStartingLine = lineId.slice(0, elmnt.id.length) == elmnt.id
        let x = left + "px"
        let y = top + (elmnt.offsetHeight / 2) + "px"
        let line = document.getElementById(lineId)
        if (isStartingLine) {
            line.setAttribute('x1', x)
            line.setAttribute('y1', y)
        } else {
            line.setAttribute('x2', x)
            line.setAttribute('y2', y)
        }
    }
}

function renderLines() {
    var firstBox = document.getElementById("mydiv")
    var secondBox = document.getElementById("mydiv2")

    let line = document.getElementById(`${firstBox.id}-to-${secondBox.id}`)

    console.log(firstBox.style.top)

    line.setAttribute('x1', "0px")
    line.setAttribute('y1', firstBox.offsetHeight / 2 + "px")
    line.setAttribute('x2', "0px")
    line.setAttribute('y2', secondBox.offsetHeight / 2 + "px")
}