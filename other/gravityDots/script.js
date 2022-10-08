'use strict';

const canvas = document.querySelector('#canvas');
const startButton = document.querySelector('#start');
const ctx = canvas.getContext('2d');

const size = 4;
const radius = 4;
const G = 1;


let raf;

let dots = [];
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    dots.push({
      x: i * 100 + 350,
      y: j * 100 + 100,
      f: 0,
      a: 0,
      radius,
      color: `rgb(${(i*3)**2},${(j*3)**2},0)`,
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath;
        ctx.fillStyle = this.color;
        ctx.fill();
      },
      recalc(fn, an) {
        const xn = this.f * Math.cos(this.a) + fn * Math.cos(an);
        const yn = this.f * Math.sin(this.a) + fn * Math.sin(an);
        this.f = Math.sqrt(xn**2 + yn**2);
        this.a = Math.atan2(yn, xn);
      },
    });
  }
}

function dist(el1, el2) {
  return Math.sqrt((el1.x - el2.x)**2 + (el1.y - el2.y)**2);
}

function angle(el1, el2) {
  return Math.PI + Math.atan2(el1.y - el2.y, el1.x - el2.x);
}

function draw() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const dot1 of dots) {
    for (const dot2 of dots) {
      if (dot1 != dot2) {
        const d = dist(dot1, dot2);
        if (d > 100) {
          const f = G /d;
          const a = angle(dot1, dot2);
          dot1.recalc(f, a);
        }
      }
    }
  }
  for (const dot of dots) {
    dot.x += dot.f * Math.cos(dot.a);
    dot.y += dot.f * Math.sin(dot.a);
    dot.draw();
  }
  setTimeout(() => {
    raf = window.requestAnimationFrame(draw);
  }, 10);
}

window.requestAnimationFrame(draw);
