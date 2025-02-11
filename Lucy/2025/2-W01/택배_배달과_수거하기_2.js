// pointer를 사용해서 풀어봤습니다~

function findLastIndex(arr, start) {
  for (let i = start; i >= 0; i--) {
    if (arr[i] > 0) return i;
  }
  return -1;
}

function solution(cap, n, deliveries, pickups) {
  let minimumDistance = 0;

  let deliveryPointer = n - 1;
  let pickupPointer = n - 1;

  while (true) {
    deliveryPointer = findLastIndex(deliveries, deliveryPointer);
    pickupPointer = findLastIndex(pickups, pickupPointer);

    if (deliveryPointer < 0 && pickupPointer < 0) break;

    minimumDistance += (Math.max(deliveryPointer, pickupPointer) + 1) * 2;

    let currentCap = 0;
    while (deliveryPointer >= 0) {
      if (deliveries[deliveryPointer] + currentCap > cap) {
        deliveries[deliveryPointer] -= cap - currentCap;
        currentCap = cap;

        break;
      } else {
        currentCap += deliveries[deliveryPointer];
        deliveries[deliveryPointer] -= deliveries[deliveryPointer];
      }

      deliveryPointer--;
    }

    currentCap = 0;
    while (pickupPointer >= 0) {
      if (pickups[pickupPointer] + currentCap > cap) {
        pickups[pickupPointer] -= cap - currentCap;
        currentCap = cap;

        break;
      } else {
        currentCap += pickups[pickupPointer];
        pickups[pickupPointer] -= pickups[pickupPointer];
      }

      pickupPointer--;
    }
  }

  return minimumDistance;
}

solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]); // 16
solution(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]); // 30
solution(1, 5, [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]); // 6
solution(2, 2, [0, 0], [0, 4]); // 8
solution(3, 2, [2, 4], [4, 2]); // 8
