// https://stackoverflow.com/questions/3706219/algorithm-for-iterating-over-an-outward-spiral-on-a-discrete-2d-grid-from-the-or

export let x: number = 0;
export let y: number = 0;
export let delta: number[] | null = null;

export function setDeltaNull(): void {
  delta = null;
}

export function spiralOut(iterations: number): number[] {
  x = 0;
  y = 0;
  delta = [0, -1];

  for (let i: number = 0; i <= iterations; i++) {
    if (
      x === y ||
      (x < 0 && x === -y) ||
      (x > 0 && x === 1 - y)
    ) {
      // change direction
      delta = [-delta[1], delta[0]];
    }

    x += delta[0];
    y += delta[1];
  }
  x -= delta[0];
  y -= delta[1];

  return [x, y];
}

export function spiralOutPerformance(): number[] {
  if(delta) {
    x += delta[0]
    y += delta[1]
  }

  if (
    x === y ||
    (x < 0 && x === -y) ||
    (x > 0 && x === 1 - y)
  ) {
    // change direction
    if(delta) delta = [-delta[1], delta[0]];
  }

  return [x, y];
}