var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// Register Mouse event handlers
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mouseleave", mouseUp);

// Register touch event handlers
canvas.addEventListener('touchstart', touchDown, false);
canvas.addEventListener('touchmove', touchMove, false);
canvas.addEventListener('touchcancel', mouseUp, false);
canvas.addEventListener('touchend', mouseUp, false);


function drawGraph() {
    ctx.strokeStyle = "#000000";
    ctx.textAlign = 'left';
    for (i = 50; i < 500; i += 50) {
        ctx.beginPath();
        ctx.lineWidth = i === 250 ? 3 : 1;
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.width);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 0);
    ctx.lineTo(50, 450);
    ctx.lineTo(500, 450);
    ctx.lineTo(500, 500);
    ctx.lineTo(0, 500);
    ctx.fillStyle = "#E5E4E2";
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.font = "bold 20px Arial";

    var counter = 4;
    for (i = 50; i < 500; i += 50) {
        ctx.fillText(counter, 25, i + 5);
        ctx.fillText(-counter--, i - 7, 475);
    }
}

drawGraph();

function drawLine(pointA, pointB) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000090";
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.stroke();
    drawPoints(pointA, pointB)

}

function drawPoints(a, b) {
    ctx.fillStyle = "#000090";
    ctx.beginPath();
    ctx.arc(a.x, a.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#000090";
    ctx.beginPath();
    ctx.arc(b.x, b.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    drawLabel(a, "A");
    drawLabel(b, "B");
}

function drawLabel(point, name) {
    var graphPoints = { x: (point.x - 250) / 50, y: (250 - point.y) / 50 }
    var pointsText = "(" + graphPoints.x + "," + graphPoints.y + ")";


    var label = (graphPoints.x > 0) ? name + pointsText : pointsText + name;
    ctx.font = "bold 15px Arial";
    if (graphPoints.x > 0) {
        if (graphPoints.x === 5) {
            label = pointsText + name;
            ctx.textAlign = 'right';
            ctx.fillText(label, point.x - 15, point.y + 15);
        }
        else {
            ctx.textAlign = 'left';
            ctx.fillText(label, point.x + 5, point.y + 15);
        }

    }
    else {
        if (graphPoints.x === -4) {
            label = name + pointsText;
            ctx.textAlign = 'left';
            ctx.fillText(label, point.x + 5, point.y + 15);
        }
        else {
            ctx.textAlign = 'right';
            ctx.fillText(label, point.x - 5, point.y + 15);
        }


    }

}


var A = { x: 200, y: 300 };
var B = { x: 350, y: 150 };
var points = [A, B]
drawLine(points[0], points[1]);

var dragging = false;
var offset = { x: 0, y: 0, x0: 0, y0: 0 };
var draggedPoint = {};

function inputDown(x, y) {
    for (var i in points) {
        if (Math.pow(x - points[i].x, 2) + Math.pow(y - points[i].y, 2) < Math.pow(6, 2)) {
            draggedPoint = points[i];
            offset = { x: draggedPoint.x, y: draggedPoint.y, x0: x, y0: y };
            dragging = true;
            return;
        }
    }
}
function inputMove(x, y) {
    if (dragging && x > 50 && x <= 500 && y >= 0 && y < 450) {
        var deltaX = x - offset.x0;
        var deltaY = y - offset.y0;

        // Snapping
        if (Math.abs(deltaX) < 25) deltaX = 0;
        if (Math.abs(deltaY) < 25) deltaY = 0;
        if (Math.abs(deltaX) > 25) deltaX = deltaX < 0 ? -(50 + 50 * parseInt(Math.abs(deltaX) / 50)) : 50 + 50 * parseInt(Math.abs(deltaX) / 50);
        if (Math.abs(deltaY) > 25) deltaY = deltaY < 0 ? -(50 + 50 * parseInt(Math.abs(deltaY) / 50)) : 50 + 50 * parseInt(Math.abs(deltaY) / 50);

        //Applying Changes
        draggedPoint.x = deltaX + offset.x;
        draggedPoint.y = deltaY + offset.y;
        ctx.clearRect(0, 0, 500, 500);
        drawGraph();
        drawLine(points[0], points[1]);
    }
}

function mouseDown(e) {
    inputDown(e.offsetX, e.offsetY);
}

function mouseMove(e) {
    inputMove(e.offsetX, e.offsetY);
}
function mouseUp() {
    dragging = false;
}

function touchDown(e) {
    var touchCoordinates = getTouchPos(e);
    inputDown(touchCoordinates.x, touchCoordinates.y);
}

function touchMove(e) {
    var touchCoordinates = getTouchPos(e);
    inputMove(touchCoordinates.x, touchCoordinates.y);
}
function getTouchPos(touchEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}