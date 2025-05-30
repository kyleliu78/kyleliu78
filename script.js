let level = 1;
let p1;
let floor, boundaries, boundaries2;
let l1walls, l1lavas, l1boosters, l1portals;
let l2walls, l2lavas, l2boosters, l2portals;
let l3walls = [], l3lavas = [], l3boosters = [], l3portals = [];

function setup() {
  createCanvas(1200, 800);
  p1 = new Player(100, 350);

  floor = new Wall(0, 700, 1200, 300);
  boundaries = new Wall(-10, 0, 10, 800);
  boundaries2 = new Wall(1200, 0, 10, 800);

  l1walls = [
    floor,
    new Wall(250, 650, 40, 50), new Wall(600, 500, 50, 200),
    new Wall(450, 600, 40, 100), new Wall(450, 400, 40, 100),
    new Wall(200, 400, 100, 40), new Wall(700, 620, 40, 80),
    new Wall(300, 150, 100, 40), new Wall(610, 250, 20, 20),
    new Wall(700, 150, 20, 20), new Wall(800, 100, 100, 40),
    new Wall(975, 265, 200, 20), new Wall(900, 490, 40, 20),
    new Wall(975, 550, 100, 40), new Wall(1100, 450, 100, 40)
  ];
  l1lavas = [
    new Lava(200, 650, 40, 50),
    new Lava(975, 225, 200, 40),
    new Lava(900, 450, 40, 40)
  ];
  l1boosters = [
    new Booster(225, 390, 40, 10)
  ];
  l1portals = [
    new Portal(1150, 380, 80, 120)
  ];

  l2walls = [
    floor, new Wall(240, 600, 40, 100), new Wall(50, 350, 20, 20),
    new Wall(75, 250, 20, 20), new Wall(250, 200, 253, 40),
    new Wall(725, 450, 40, 40), new Wall(900, 400, 20, 20),
    new Wall(1050, 500, 40, 40), new Wall(1020, 200, 150, 40)
  ];
  l2lavas = [
    new Lava(475, 150, 10, 50),
    new Lava(825, 0, 40, 90),
    new Lava(825, 230, 40, 200),
    new Lava(1100, 400, 40, 40)
  ];
  l2boosters = [
    new Booster(240, 600, 40, 10),
    new Booster(725, 440, 40, 10),
    new Booster(1050, 490, 40, 10)
  ];
  l2portals = [
    new Portal(1150, 100, 80, 120)
  ];
}

function draw() {
  background(255);
  p1.drawPlayer();
  boundaries.display();
  boundaries2.display();
  p1.intersect(boundaries);
  p1.intersect(boundaries2);

  let levelWalls = [l1walls, l2walls, l3walls][level - 1];
  let levelLavas = [l1lavas, l2lavas, l3lavas][level - 1];
  let levelBoosters = [l1boosters, l2boosters, l3boosters][level - 1];
  let levelPortals = [l1portals, l2portals, l3portals][level - 1];

  for (let wall of levelWalls) {
    wall.display();
    p1.intersect(wall);
  }
  for (let lava of levelLavas) {
    lava.display();
    p1.touchLava(lava);
  }
  for (let booster of levelBoosters) {
    booster.display();
    p1.touchBooster(booster);
  }
  for (let portal of levelPortals) {
    portal.display();
    p1.touchPortal(portal);
  }

  if (p1.dead) {
    background(255, 100, 100);
    fill(0);
    textSize(100);
    text("You died!", 400, 425);
    textSize(30);
    text("Press r to restart", 500, 500);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) p1.up = true;
  if (keyCode === RIGHT_ARROW) p1.right = true;
  if (keyCode === LEFT_ARROW) p1.left = true;

  if (key === 'r' && p1.dead) {
    p1.dead = false;
    p1.x = 100;
    p1.y = 400;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) p1.up = false;
  if (keyCode === RIGHT_ARROW) p1.right = false;
  if (keyCode === LEFT_ARROW) p1.left = false;
}

class Wall {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
  }
  display() {
    fill(255, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }
  getPos() {
    return [this.x, this.x + this.w, this.y, this.y + this.h];
  }
}

class Lava {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
  }
  display() {
    fill(255, 127, 80);
    rect(this.x, this.y, this.w, this.h);
  }
  getPos() {
    return [this.x, this.x + this.w, this.y, this.y + this.h];
  }
}

class Booster {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
  }
  display() {
    fill(0, 0, 255);
    rect(this.x, this.y, this.w, this.h);
  }
  getPos() {
    return [this.x, this.x + this.w, this.y, this.y + this.h];
  }
}

class Portal {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
  }
  display() {
    fill(0, 255, 255);
    ellipse(this.x, this.y, this.w, this.h);
    fill(255);
    ellipse(this.x, this.y, this.w - 10, this.h - 10);
    fill(0, 20, 255);
    ellipse(this.x, this.y, this.w - 18, this.h - 20);
    fill(0);
    ellipse(this.x, this.y, this.w - 30, this.h - 32);
  }
  getPos() {
    return [this.x, this.x + this.w, this.y, this.y + this.h];
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.x_vel = 0;
    this.y_vel = 0;
    this.dead = false;
    this.right = this.left = this.up = false;
    this.grounded = false;
  }

  drawPlayer() {
    fill(255, 0, 0);
    rect(this.x - 25, this.y - 25, 50, 50);
    fill(255, 255, 0);
    rect(this.x - 2.5, this.y - 25, 5, 5);

    this.x += this.x_vel;
    if (this.right) this.x_vel += 3;
    if (this.left) this.x_vel -= 3;
    if (Math.abs(this.x_vel) < 0.01) this.x_vel = 0;
    this.x_vel /= 2;

    this.y -= this.y_vel;
    if (this.grounded && this.up) {
      this.y_vel = 10;
      this.grounded = false;
    }
    if (this.y_vel !== 0) this.grounded = false;
    this.y_vel -= 0.4;
  }

  intersect(wall) {
    let [lx, rx, ty, by] = wall.getPos();
    if ((this.x + 25 > lx && this.x - 25 < rx) && this.y + 25 > ty && this.y - 25 < by) {
      if (this.x_vel > 0 && this.x + 25 > lx && this.x - this.x_vel + 25 <= lx) {
        this.x_vel = 0;
        this.x = lx - 25;
      }
      if (this.x_vel < 0 && this.x - 25 < rx && this.x - this.x_vel - 25 >= rx) {
        this.x_vel = 0;
        this.x = rx + 25;
      }
      if (this.y_vel < 0 && (this.y + 25) - this.y_vel >= ty &&
          this.x + 25 >= lx && this.x - 25 <= rx && this.y + this.y_vel + 25 <= ty) {
        this.y_vel = 0;
        this.y = ty - 25;
        this.grounded = true;
      }
      if (this.y_vel > 0 && this.y >= by && this.y - 25 + this.y_vel < by) {
        this.y_vel = 0;
        this.y = by + 25;
      }
    }
  }

  touchLava(lava) {
    let [lx, rx, ty, by] = lava.getPos();
    if ((this.x + 25 >= lx && this.x - 25 <= rx) && this.y + 25 >= ty && this.y - 25 <= by) {
      this.dead = true;
    }
  }

  touchBooster(booster) {
    let [lx, rx, ty, by] = booster.getPos();
    if ((this.x + 25 >= lx && this.x - 25 <= rx) && this.y + 25 >= ty && this.y - 25 <= by) {
      this.y_vel = 15;
    }
  }

  touchPortal(portal) {
    let [lx, rx, ty, by] = portal.getPos();
    if ((this.x + 25 >= lx && this.x - 25 <= rx) && this.y + 25 >= ty && this.y - 25 <= by) {
      level++;
      this.x = 100;
      this.y = 400;
    }
  }
}
