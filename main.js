var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Drawing Graph Lines
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
    ctx.fillText(-counter--, i - 5, 475);
}