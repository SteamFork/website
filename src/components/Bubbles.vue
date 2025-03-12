<script setup lang="ts">
import {onMounted, ref} from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const canvasEl = canvas.value;
  if (!canvasEl) return;
  const ctx = canvasEl.getContext("2d");
  if (!ctx) return;

  // Screen object for canvas resizing
  const screen = {
    elem: canvasEl,
    callback: null as (() => void) | null,
    ctx,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    init(callback: () => void, initRes: boolean) {
      this.callback = callback || null;
      window.addEventListener("resize", () => {
        this.resize();
      }, false);
      canvasEl.onselectstart = () => false;
      canvasEl.ondrag = () => false;
      if (initRes) this.resize();
      return this;
    },
    resize() {
      this.width = canvasEl.offsetWidth;
      this.height = canvasEl.offsetHeight;
      this.left = 0;
      this.top = 0;
      let current: HTMLElement | null = canvasEl;
      while (current) {
        this.left += current.offsetLeft;
        this.top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      if (this.ctx) {
        canvasEl.width = this.width;
        canvasEl.height = this.height;
      }
      this.callback && this.callback();
    }
  };

  screen.init(() => {
  }, true);

  // Point constructor
  function Point(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.magnitude = x * x + y * y;
    this.computed = 0;
    this.force = 0;
  }

  Point.prototype.add = function (p: any) {
    return new Point(this.x + p.x, this.y + p.y);
  };

  // Ball constructor
  function Ball(parent: any) {
    const min = 0.1, max = 1.5;
    this.vel = new Point(
        (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.25),
        (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
    );
    this.pos = new Point(
        parent.width * 0.2 + Math.random() * parent.width * 0.6,
        parent.height * 0.2 + Math.random() * parent.height * 0.6
    );
    this.size = (parent.wh / 15) + ((Math.random() * (max - min) + min) * (parent.wh / 15));
    this.width = parent.width;
    this.height = parent.height;
  }

  // Define the move method on Ball.prototype
  Ball.prototype.move = function () {
    // Bounce off left/right borders
    if (this.pos.x >= this.width - this.size) {
      if (this.vel.x > 0) this.vel.x = -this.vel.x;
      this.pos.x = this.width - this.size;
    } else if (this.pos.x <= this.size) {
      if (this.vel.x < 0) this.vel.x = -this.vel.x;
      this.pos.x = this.size;
    }
    // Bounce off top/bottom borders
    if (this.pos.y >= this.height - this.size) {
      if (this.vel.y > 0) this.vel.y = -this.vel.y;
      this.pos.y = this.height - this.size;
    } else if (this.pos.y <= this.size) {
      if (this.vel.y < 0) this.vel.y = -this.vel.y;
      this.pos.y = this.size;
    }
    // Update position with velocity
    this.pos = this.pos.add(this.vel);
  };

  // LavaLamp constructor
  function LavaLamp(width: number, height: number, numBalls: number, c0: string, c1: string) {
    this.step = 5;
    this.width = width;
    this.height = height;
    this.wh = Math.min(width, height);
    this.sx = Math.floor(this.width / this.step);
    this.sy = Math.floor(this.height / this.step);
    this.paint = false;
    this.metaFill = createRadialGradient(width, height, width, c0, c1);
    this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
    this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
    this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
    this.ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1];
    this.grid = [];
    this.balls = [];
    this.iter = 0;
    this.sign = 1;

    // Initialize grid
    for (let i = 0; i < (this.sx + 2) * (this.sy + 2); i++) {
      this.grid[i] = new Point((i % (this.sx + 2)) * this.step, Math.floor(i / (this.sx + 2)) * this.step);
    }
    // Create metaballs
    for (let k = 0; k < numBalls; k++) {
      this.balls[k] = new Ball(this);
    }
  }

  // Compute force for a grid cell
  LavaLamp.prototype.computeForce = function (x: number, y: number, idx?: number) {
    let force;
    const id = idx || x + y * (this.sx + 2);
    if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
      force = 0.6 * this.sign;
    } else {
      force = 0;
      const cell = this.grid[id];
      let i = 0;
      let ball;
      while (ball = this.balls[i++]) {
        force += ball.size * ball.size / (-2 * cell.x * ball.pos.x - 2 * cell.y * ball.pos.y + ball.pos.magnitude + cell.magnitude);
      }
      force *= this.sign;
    }
    this.grid[id].force = force;
    return force;
  };

  // Marching squares algorithm for rendering
  LavaLamp.prototype.marchingSquares = function (next: any) {
    const x = next[0], y = next[1], pdir = next[2];
    const id = x + y * (this.sx + 2);
    if (this.grid[id].computed === this.iter) {
      return false;
    }
    let dir, mscase = 0;
    for (let i = 0; i < 4; i++) {
      const idn = (x + this.ix[i + 12]) + (y + this.ix[i + 16]) * (this.sx + 2);
      let force = this.grid[idn].force;
      if ((force > 0 && this.sign < 0) || (force < 0 && this.sign > 0) || !force) {
        force = this.computeForce(x + this.ix[i + 12], y + this.ix[i + 16], idn);
      }
      if (Math.abs(force) > 1) mscase += Math.pow(2, i);
    }
    if (mscase === 15) {
      return [x, y - 1, false];
    } else {
      if (mscase === 5) dir = (pdir === 2) ? 3 : 1;
      else if (mscase === 10) dir = (pdir === 3) ? 0 : 2;
      else {
        dir = this.mscases[mscase];
        this.grid[id].computed = this.iter;
      }
      const ix = this.step / (
          Math.abs(Math.abs(this.grid[(x + this.plx[4 * dir + 2]) + (y + this.ply[4 * dir + 2]) * (this.sx + 2)].force) - 1) /
          Math.abs(Math.abs(this.grid[(x + this.plx[4 * dir + 3]) + (y + this.ply[4 * dir + 3]) * (this.sx + 2)].force) - 1) + 1
      );
      ctx.lineTo(
          this.grid[(x + this.plx[4 * dir]) + (y + this.ply[4 * dir]) * (this.sx + 2)].x + this.ix[dir] * ix,
          this.grid[(x + this.plx[4 * dir + 1]) + (y + this.ply[4 * dir + 1]) * (this.sx + 2)].y + this.ix[dir + 4] * ix
      );
      this.paint = true;
      return [x + this.ix[dir + 4], y + this.ix[dir + 8], dir];
    }
  };

  // Render metaballs using computed forces
  LavaLamp.prototype.renderMetaballs = function () {
    let i = 0, ball;
    while (ball = this.balls[i++]) {
      ball.move();
    }
    this.iter++;
    this.sign = -this.sign;
    this.paint = false;
    ctx.fillStyle = this.metaFill;
    ctx.beginPath();
    i = 0;
    while (ball = this.balls[i++]) {
      let next = [
        Math.round(ball.pos.x / this.step),
        Math.round(ball.pos.y / this.step), false
      ];
      do {
        next = this.marchingSquares(next);
      } while (next);
      if (this.paint) {
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        this.paint = false;
      }
    }
  };

  // Create a radial gradient
  const createRadialGradient = function (w: number, h: number, r: number, c0: string, c1: string) {
    const gradient = ctx.createRadialGradient(w, h, 0, w, h, r);
    gradient.addColorStop(0, c0);
    gradient.addColorStop(1, c1);
    return gradient;
  };

  // Main animation loop
  const run = function () {
    requestAnimationFrame(run);
    ctx.clearRect(0, 0, screen.width, screen.height);
    lava0.renderMetaballs();
  };

  let colour1 = getComputedStyle(document.documentElement)
      .getPropertyValue('--v-theme-primary')
      .trim();
  if (colour1 && !colour1.startsWith('rgb') && !colour1.startsWith('#')) {
    colour1 = `rgb(${colour1})`;
  }

  let colour2 = getComputedStyle(document.documentElement)
      .getPropertyValue('--v-theme-accent')
      .trim();
  if (colour2 && !colour2.startsWith('rgb') && !colour2.startsWith('#')) {
    colour2 = `rgb(${colour2})`;
  }

  // Create a LavaLamp instance with 6 metaballs and desired colors
  const lava0 = new LavaLamp(screen.width, screen.height, 6, colour1, colour2);
  run();
});
</script>

<template>
  <div class="wrap">
    <canvas id="bubble" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.wrap {
  height: 100%;
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(to bottom, transparent 0%, rgb(var(--v-theme-surface)) 20%, rgb(var(--v-theme-background)) 100%);
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
