var canvas = document.getElementById('canvas1'), ctx = canvas.getContext('2d');
canvas.width = 1237;
canvas.height = 400;

function drawPoint(p, r, color) {
  ctx.fillStyle = color || '#ccc';
  ctx.beginPath();
  ctx.arc(p[0], p[1], r || 3, 0,Math.PI*2, 0);
  ctx.fill();
}
function vec2Len(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  return Math.sqrt(x*x + y*y);
}
function vec2Lerp(a, b, p) {
  return [
    (b[0]-a[0])*p+a[0],
    (b[1]-a[1])*p+a[1]
  ];
}
function vec2LerpShift(a, b, p, s) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var r = s/Math.sqrt( x*x + y*y );
  var x2 = 0 * x - r * y;
  var y2 = 0 * y + r * x;
  return [
    a[0] + x*p + x2,
    a[1] + y*p + y2
  ];
}

function drawLightning(a, b) {
	console.log(a+" "+b);
  var ps = [];
  var sx,sy;
  sx = sy = -500
  for( var i=0 ; i<8 ; ++i ) {
    ps.push([Math.random(),Math.random()]);
  }
  ps.sort();
  var t, l = vec2Len(a,b), sf = l*0.25, sf2;
  ctx.beginPath();
  ctx.moveTo(a[0]+sx,a[1]+sx);
  for( var i=0 ; i<ps.length ; ++i ) {
    sf2 = (1 - Math.abs(ps[i][0]-0.5) * 2) * sf;
    t = vec2LerpShift( a,b,ps[i][0], ps[i][1]*sf2-sf2*0.5 );
    ctx.lineTo(t[0]+sx,t[1]+sx);
  }
  ctx.lineTo(b[0]+sx,b[1]+sx);
  ctx.lineWidth = l/80;
  ctx.shadowBlur = l/8;
  ctx.shadowOffsetX = -sx;
  ctx.shadowOffsetY = -sy;
  ctx.strokeStyle = 'rgba(255,255,255,1)';
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(a[0],a[1]);
  for( var i=0 ; i<ps.length ; ++i ) {
    sf2 = (1 - Math.abs(ps[i][0]-0.5) * 2) * sf;
    t = vec2LerpShift( a,b,ps[i][0], ps[i][1]*sf2-sf2*0.5 );
    ctx.lineTo(t[0],t[1]);
  }
  ctx.lineTo(b[0],b[1]);
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.lineTo(b[0],b[1]);
}

var a = [0,100];
var b = [1237,100];
/*var c = lerpShift(a,b,0.25,10);
drawPoint(c);*/
var render = function() {
  ctx.fillStyle = 'transparent';
  ctx.globalAlpha = 0.3;
  console.log("a ");
  ctx.fillRect(0,0, canvas.width,canvas.height);
  ctx.globalAlpha = 1;
  drawLightning(a, b);
  drawPoint(a);
  drawPoint(b);
  setTimeout(render, 500);
};
render();