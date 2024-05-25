export function drawHexagon(ctx, x, y, r) {
    const a = 2 * Math.PI / 6;
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.sin(a * i), y + r * Math.cos(a * i));
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}