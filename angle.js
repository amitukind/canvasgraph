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


function drawLine(pointA, pointB, pointC) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000090";
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineTo(pointC.x, pointC.y);
    ctx.stroke();
    drawPoints(pointA, pointB, pointC)

}

function drawPoints(a, b, c) {
    ctx.fillStyle = "#000090";
    ctx.beginPath();
    ctx.arc(a.x, a.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#000090";
    ctx.beginPath();
    ctx.arc(b.x, b.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#000090";
    ctx.beginPath();
    ctx.arc(c.x, c.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    drawLabel(a, "A");
    drawLabel(b, "B");
    drawLabel(c, "C");
    drawAngle(a, b, c);
}

function drawLabel(point, name) {
    var graphPoints = { x: (point.x - 450), y: (450 - point.y) }
    var pointsText = "(" + graphPoints.x + "," + graphPoints.y + ")";


    var label = (graphPoints.x > 0) ? name + pointsText : pointsText + name;
    ctx.font = "bold 15px Arial";
    if (graphPoints.x < 0) {
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


var A = { x: 100, y: 800 };
var B = { x: 450, y: 450 };
var C = { x: 800, y: 800 };
var points = [A, B, C]
drawLine(points[0], points[1], points[2]);

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
    if (dragging && x > 0 && x <= 900 && y >= 0 && y < 900) {
        var deltaX = x - offset.x0;
        var deltaY = y - offset.y0;

        //Applying Changes
        draggedPoint.x = deltaX + offset.x;
        draggedPoint.y = deltaY + offset.y;
        ctx.clearRect(0, 0, 900, 900);
        drawLine(points[0], points[1], points[2]);
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

function drawAngle(a, b, c) {
    var pointA = { x: (a.x - 450), y: (450 - a.y) };
    var pointB = { x: (b.x - 450), y: (450 - b.y) };
    var pointC = { x: (c.x - 450), y: (450 - c.y) };

    var slopeAB = (pointB.y - pointA.y) / (pointB.x - pointA.x);
    var slopeBC = (pointC.y - pointB.y) / (pointC.x - pointB.x);
    var angleRadians = Math.atan((slopeBC - slopeAB) / (1 + (slopeAB * slopeBC)));

    var angleDegrees = angleRadians * 180 / Math.PI;
    if (angleDegrees < 0) {
        angleDegrees += 180;
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = "#009000";
    ctx.fillText('angle:' + parseInt(angleDegrees), b.x, b.y + 50);

}
