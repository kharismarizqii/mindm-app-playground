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
        updateLine()
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function updateLine() {
        let lineId = document.querySelector(`line[id*=${elmnt.id}]`).id
        let isStartingLine = lineId.slice(0, elmnt.id.length) == elmnt.id
        let secondBoxId = (isStartingLine) ? lineId.substring(elmnt.id.length + 4, lineId.length) : lineId.substring(0, lineId.indexOf("-to-"))
        let secondBox = document.getElementById(secondBoxId)
        let secondBoxOffsetRight = secondBox.offsetLeft + secondBox.offsetWidth
        let secondBoxHorizontalOffsetCenter = secondBox.offsetLeft + (secondBox.offsetWidth / 2)
        let currentBoxHorizontalOffsetCenter = elmnt.offsetLeft + (secondBox.offsetWidth/ 2 )
        let currentBoxOffsetRight = elmnt.offsetLeft + secondBox.offsetWidth
        let y = elmnt.offsetTop + (elmnt.offsetHeight / 2) + "px"
        let line = document.getElementById(lineId)
        let circ1 = document.getElementById(`circ-1-of-${line.id}`)
        let circ2 = document.getElementById(`circ-2-of-${line.id}`)
        if (isStartingLine) {
            let x2 = (currentBoxHorizontalOffsetCenter > secondBoxHorizontalOffsetCenter) ? secondBoxOffsetRight: secondBox.offsetLeft + "px"
            let x1 = (currentBoxHorizontalOffsetCenter > secondBoxHorizontalOffsetCenter) ? elmnt.offsetLeft : currentBoxOffsetRight + "px"
            line.setAttribute('x1', x1)
            line.setAttribute('y1', y)
            line.setAttribute('x2', x2)
            circ1.setAttribute('cx', x1)
            circ1.setAttribute('cy', y)
            circ2.setAttribute('cx', x2)
        } else {
            let x1 = (currentBoxHorizontalOffsetCenter > secondBoxHorizontalOffsetCenter) ? secondBoxOffsetRight : secondBox.offsetLeft + "px"
            let x2 = (currentBoxHorizontalOffsetCenter > secondBoxHorizontalOffsetCenter) ? elmnt.offsetLeft : currentBoxOffsetRight + "px"
            line.setAttribute('x2', x2)
            line.setAttribute('y2', y)
            line.setAttribute('x1', x1)
            circ2.setAttribute('cx', x2)
            circ2.setAttribute('cy', y)
            circ1.setAttribute('cx', x1)
        }
    }
}

function renderLines() {
    var firstBox = document.getElementById("mydiv")
    var secondBox = document.getElementById("mydiv2")

    let line = document.getElementById(`${firstBox.id}-to-${secondBox.id}`)
    let circ1 = document.getElementById(`circ-1-of-${line.id}`)
    let circ2 = document.getElementById(`circ-2-of-${line.id}`)

    line.setAttribute('x1', "0px")
    line.setAttribute('y1', firstBox.offsetHeight / 2 + "px")
    line.setAttribute('x2', "0px")
    line.setAttribute('y2', secondBox.offsetHeight / 2 + "px")
    circ1.setAttribute('cx', 0)
    circ1.setAttribute('cy', firstBox.offsetHeight / 2)
    circ2.setAttribute('cx', 0)
    circ2.setAttribute('cy', firstBox.offsetHeight / 2)
}