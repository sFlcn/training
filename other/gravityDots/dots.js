export function generateDotsArray({groupDimension, radius, isGraviCener, groupWidth, groupHeight}, ctx) {
  let dotsArray = [];

  function generateDot(i, j, isCenter) {
    const dot = {
      x: (canvas.width - groupWidth) / 2 + i * (groupWidth / (groupDimension.x > 1 ? groupDimension.x - 1 : 1)),
      y: (canvas.height - groupHeight) / 2 + j * (groupHeight / (groupDimension.y > 1 ? groupDimension.y - 1 : 1)),
      f: 0,
      a: 0,
      radius,
      color: `rgb(${150+(i*2)**3},${150+(j*2)**2},${Math.floor(Math.random()*50)+205})`,
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
    }
    if (isCenter) {
      dot.color = 'rgba(0,0,0,0)';
      dot.x = canvas.width / 2;
      dot.y = canvas.height / 2;
      dot.recalc = () => {};
    }
    return dot;
  }

  for (let i = 0; i < groupDimension.x; i++) {
    for (let j = 0; j < groupDimension.y; j++) {
      dotsArray.push(generateDot(i, j));
    }
  }
  if (isGraviCener) {
    dotsArray.push(generateDot(0,0,'isCenter'))
  }
  return dotsArray;
}


export function dist(el1, el2) {
  return Math.sqrt((el1.x - el2.x)**2 + (el1.y - el2.y)**2);
}

export function angle(el1, el2) {
  return Math.PI + Math.atan2(el1.y - el2.y, el1.x - el2.x);
}

