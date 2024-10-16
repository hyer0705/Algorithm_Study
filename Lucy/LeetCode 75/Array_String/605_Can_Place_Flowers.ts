/**
 * 605. Can Place Flowers
 *
 * url: https://leetcode.com/problems/can-place-flowers/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Easy
 * topic:
 * date: 2024.10.16(WED)
 */

function isPlanted(flower: number): boolean {
  return flower === 1;
}

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  const beforePlanted = flowerbed.filter(isPlanted).length;

  for (let i = 0; i < flowerbed.length; i++) {
    if (
      !isPlanted(flowerbed[i]) &&
      !isPlanted(flowerbed[i - 1]) &&
      !isPlanted(flowerbed[i + 1])
    ) {
      flowerbed[i] = 1;
    }
  }

  const afterPlanted = flowerbed.filter(isPlanted).length;
  return Math.abs(beforePlanted - afterPlanted) >= n;
}

console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1)); // true
console.log(canPlaceFlowers([1, 0, 0, 0, 1], 2)); // false
console.log(canPlaceFlowers([1, 0, 0, 0, 0, 1], 2)); // false
console.log(canPlaceFlowers([0, 0, 1, 0, 1], 1)); // true
console.log(canPlaceFlowers([0, 0, 1, 0, 0], 1)); // true
