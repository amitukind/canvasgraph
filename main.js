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
