var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawGraph() {
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

function drawLine(a, b) {
    var pointA = { x: 250 + a.x * 50, y: 250 - a.y * 50 };
    var pointB = { x: 250 + b.x * 50, y: 250 - b.y * 50 };
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
    ctx.arc(a.x, a.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#000090";
    ctx.beginPath();
    ctx.arc(b.x, b.y, 10, 0, 2 * Math.PI);
    ctx.fill();
}

drawLine({ x: 1, y: 1 }, { x: 3, y: 2 });