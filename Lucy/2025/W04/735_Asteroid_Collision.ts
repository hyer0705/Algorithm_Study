function asteroidCollision(asteroids: number[]): number[] {
  const left: number[] = [];
  const right: number[] = [];
  let pointer = 0;

  while (pointer < asteroids.length) {
    if (right.length > 0 && asteroids[pointer] < 0) {
      let popValue = -1001;
      while (Math.abs(asteroids[pointer]) > Math.abs(right[right.length - 1])) {
        if (right.length > 0) {
          popValue = right.pop()!;
        }
      }

      if (Math.abs(asteroids[pointer]) === Math.abs(right[right.length - 1])) {
        right.pop();
      } else if (right.length < 1 && Math.abs(asteroids[pointer]) > Math.abs(popValue)) {
        left.push(asteroids[pointer]);
      }
    } else {
      if (asteroids[pointer] < 0) {
        left.push(asteroids[pointer]);
      } else if (asteroids[pointer] > 0) {
        right.push(asteroids[pointer]);
      }
    }
    pointer++;
  }

  return [...left, ...right];
}
