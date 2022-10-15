export function getDistance(el1, el2) {
  return Math.sqrt((el1.x - el2.x)**2 + (el1.y - el2.y)**2);
}

export function getAngle(el1, el2) {
  return Math.PI + Math.atan2(el1.y - el2.y, el1.x - el2.x);
}

export function generateDot({x = 0, y = 0, f = 0, a = 0, radius = 1, color = 'rgba(0,0,0,0)', isStationary}, ctx) {
  const dot = {
    x,
    y,
    f,
    a,
    radius,
    color,
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath;
      ctx.fillStyle = this.color;
      ctx.fill();
    },
  };
  dot.recalc = isStationary ? function(){} : function(fn, an) {
    const xn = this.f * Math.cos(this.a) + fn * Math.cos(an);
    const yn = this.f * Math.sin(this.a) + fn * Math.sin(an);
    this.f = Math.sqrt(xn**2 + yn**2);
    this.a = Math.atan2(yn, xn);
  }
  return dot;
}

export function generateDotsCluster({groupDimension, radius, isGraviCener, groupWidth, groupHeight}, ctx) {
  let dotsCluster = [];

  for (let i = 0; i < groupDimension.x; i++) {
    for (let j = 0; j < groupDimension.y; j++) {
      dotsCluster.push(generateDot({
        x: (canvas.width - groupWidth) / 2 + i * (groupWidth / (groupDimension.x > 1 ? groupDimension.x - 1 : 1)),
        y: (canvas.height - groupHeight) / 2 + j * (groupHeight / (groupDimension.y > 1 ? groupDimension.y - 1 : 1)),
        radius,
        color: `rgb(${150+(i*2)**3},${150+(j*2)**2},${Math.floor(Math.random()*50)+205})`,
      }, ctx));
    }
  }

  if (isGraviCener) {
    const centerDot = generateDot({x: canvas.width / 2, y: canvas.height / 2}, ctx);
    centerDot.recalc = () => {};
    dotsCluster.push(centerDot);
  }
  return dotsCluster;
}

export class animatedDots {
  constructor({backgroundImage, foregroundImage, dotsArray, gravityValue, ctx}) {
    this.backgroundImage = backgroundImage;
    this.foregroundImage = foregroundImage;
    this.dotsArray = dotsArray;
    this.gravityValue = gravityValue;
    this.ctx = ctx;
    this.isAnimatingNow = false;
  }
  drawDots() {
    this.ctx.drawImage(this.backgroundImage, 0, 0); // Draw background image
    for (let i = 0; i < this.dotsArray.length; i++) {
      for (let j = i+1; j < this.dotsArray.length; j++) {
        const distance = getDistance(this.dotsArray[i], this.dotsArray[j]);
        if (distance > 100) {
          const f = this.gravityValue / distance * (this.dotsArray[i].radius / 2 + this.dotsArray[j].radius / 2);
          this.dotsArray[i].recalc(f, getAngle(this.dotsArray[i], this.dotsArray[j]));
          this.dotsArray[j].recalc(f, getAngle(this.dotsArray[j], this.dotsArray[i]));
        }
      }
    }
    for (const dot of this.dotsArray) {
      dot.x += dot.f * Math.cos(dot.a);
      dot.y += dot.f * Math.sin(dot.a);
      dot.draw();
    }
    this.ctx.drawImage(this.foregroundImage, 908, 225); // Draw foreground image
    if (this.isAnimatingNow) {
      setTimeout(() => { window.requestAnimationFrame(this.drawDots.bind(this)) }, 10);
    }
  }
}
