var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    radius = canvas.height / 2;

context.translate(radius, radius);
radius = radius * 0.90;


setInterval(drawClock, 1000);
setInterval(digitalClockTime, 1000);

function drawClock() {
    drawFace(context, radius);
    drawNumbers(context, radius);
    drawTime(context, radius);
}

function drawFace(context, radius) {
    var gradient;
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = '#EEEEEE';
    context.fill();

    gradient = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    gradient.addColorStop(0, '#263238');
    gradient.addColorStop(0.5, '#EEEEEE');
    gradient.addColorStop(1, '#263238');

    context.strokeStyle = gradient;
    context.lineWidth = radius * 0.1;
    context.stroke();
    context.beginPath();
    context.arc(0, 0, radius * 0.07, 0, 2 * Math.PI);
    context.fillStyle = '#263238';
    context.fill();
}

function drawNumbers(context, radius) {
    var angle,
        num;

    context.font = radius * 0.15 + 'px Arial';
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    for (num = 1; num < 13; num++) {
        angle = num * Math.PI / 6;
        context.rotate(angle);
        context.translate(0, -radius * 0.85);
        context.rotate(-angle);
        context.fillText(num.toString(), 0, 0);
        context.rotate(angle);
        context.translate(0, radius * 0.85);
        context.rotate(-angle);
    }
}

function drawTime(context, radius) {
    var now = new Date(),
        hour = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds();
    
        hour = hour % 12;
        hour = (hour * Math.PI / 6) + (minutes * Math.PI / (6 * 60)) + (seconds * Math.PI / (360 * 60));

        drawHand(context, hour, radius * 0.5, radius * 0.07);

        minutes = (minutes * Math.PI / 30) + (seconds * Math.PI / (30 * 60));
        drawHand(context, minutes, radius * 0.8, radius * 0.07);

        seconds = (seconds * Math.PI / 30);
        drawHand(context, seconds, radius * 0.9, radius * 0.02);
}

function drawHand(context, pos, length, width) {
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = 'round';
    context.moveTo(0, 0);
    context.rotate(pos);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-pos);
}

function zeroFill(n) {
    return ('0' + n).slice(-2);
}

function digitalClockTime() {
    var today = new Date(),
        hour = zeroFill(today.getHours()),
        minutes = zeroFill(today.getMinutes()),
        seconds = zeroFill(today.getSeconds());

    document.getElementById('hour').innerHTML = hour;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
}