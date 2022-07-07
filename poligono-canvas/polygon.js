
var canvas = null;
var coords = [];

canvas = document.getElementById('canvas');
canvas.addEventListener("mousedown", drawDot, false);

function screenToCanvas(point) {
  var canvas_rect = canvas.getBoundingClientRect();
  return { x: (point.x - canvas_rect.left) * (canvas.width  / canvas_rect.width), y: (point.y - canvas_rect.top)  * (canvas.height / canvas_rect.height) };
};

function drawDot(event) {
  if (coords.length < 4) {
    var point = screenToCanvas({x:event.clientX, y:event.clientY});

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgba(0, 255, 0, 1)";
    ctx.fillRect(point.x-4, point.y-4, 8, 8);

    coords.push({x:point.x,y:point.y});
  }
}

function drawROI() {
  sortCoords();
  drawRect();
}

function removeROI()
{
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  coords = [];
}

//====================================================================================================
// Sort coordinates
//====================================================================================================
function samePoint(p1, p2) {
  return p1.x == p2.x && p1.y == p2.y;
}

function pointDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function left_oriented(p1, p2, candidate) {
  var det = (p2.x - p1.x) * ( candidate.y - p1.y) - (candidate.x - p1.x) * (p2.y - p1.y);
  if (det > 0) return true;  // left-oriented
  if (det < 0) return false; // right oriented
  // select the farthest point in case of colinearity
  return pointDistance(p1, candidate) > pointDistance(p1,p2);
}

function sortCoords() {
  var tmo = 4;
  var min = 0;
  for (var i=1; i < coords.length; i++) {
    if (coords[i].y < coords[min].y) {
      min = i;
    }
  }
  var h = [];
  var hp = coords[min];
  // walk the h
  while (true) {
    h.push(hp);
    var nhp = coords[0];
    for (var i=1; i < coords.length; i++) {
      if (samePoint(hp, nhp) || left_oriented(hp, nhp, coords[i])) {
        nhp = coords[i];
      }
    }
    hp = nhp;
    tmo = tmo-1;

    if (samePoint(nhp, h[0])) {
      break;
    } else if (tmo==0) {
      h = [];
      break;
    }
  }
  coords = h;
}

//====================================================================================================
// Draw rectangle for ROI coordinates
//====================================================================================================
function drawRect() {
  var ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.moveTo(coords[0].x, coords[0].y);
  ctx.lineTo(coords[1].x, coords[1].y);
  ctx.lineTo(coords[2].x, coords[2].y);
  ctx.lineTo(coords[3].x, coords[3].y);
  ctx.lineTo(coords[0].x, coords[0].y);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.fillStyle = 'rgba(0,0,255,0.4)';
  ctx.fill();
}
