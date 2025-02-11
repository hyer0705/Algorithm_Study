function solution(cap, n, deliveries, pickups) {
  let answer = 0;

  const deliveryStack = [];
  const pickupStack = [];

  for (let i = 0; i < n; i++) {
    const currentDelivery = deliveries[i];
    const currentPickup = pickups[i];

    if (currentDelivery > 0) {
      deliveryStack.push({ position: i, cap: currentDelivery });
    }
    if (currentPickup > 0) {
      pickupStack.push({ position: i, cap: currentPickup });
    }
  }

  while (deliveryStack.length > 0 || pickupStack.length > 0) {
    const peakDelivery = deliveryStack[deliveryStack.length - 1];
    const peakPickup = pickupStack[pickupStack.length - 1];

    if (peakDelivery && peakPickup) {
      answer += (Math.max(peakDelivery.position, peakPickup.position) + 1) * 2;
    } else if (peakDelivery) {
      answer += (peakDelivery.position + 1) * 2;
    } else if (peakPickup) {
      answer += (peakPickup.position + 1) * 2;
    }

    let truck = 0;
    while (deliveryStack.length > 0 && truck < cap) {
      if (truck + deliveryStack[deliveryStack.length - 1].cap > cap) {
        deliveryStack[deliveryStack.length - 1].cap -= cap - truck;
        truck = cap;

        break;
      } else {
        truck += deliveryStack.pop().cap;
      }
    }

    truck = 0;
    while (pickupStack.length > 0 && truck < cap) {
      if (truck + pickupStack[pickupStack.length - 1].cap > cap) {
        pickupStack[pickupStack.length - 1].cap -= cap - truck;
        truck = cap;

        break;
      } else {
        truck += pickupStack.pop().cap;
      }
    }
  }

  return answer;
}

solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]); // 16
solution(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]); // 30
solution(3, 5, [2, 3, 4, 1, 2], [0, 0, 0, 0, 0]); // 26

// function solution(cap, n, deliveries, pickups) {
//   let deliveriesPointer = deliveries.findLastIndex((delivery) => delivery > 0);
//   let pickupsPointer = pickups.findLastIndex((pickup) => pickup > 0);

//   let res = 0;
//   while (deliveriesPointer >= 0 && pickupsPointer >= 0) {
//     if (deliveries.reduce((acc, curr) => acc + curr, 0) === 0 && pickups.reduce((acc, curr) => acc + curr, 0) === 0) break;
//     res += (deliveriesPointer + 1) * 2;

//     let truck = 0;

//     for (let i = deliveriesPointer; i >= 0; i--) {
//       const currentDelivery = deliveries[i];

//       if (truck + currentDelivery > cap) {
//         deliveriesPointer = i;

//         break;
//       }

//       if (currentDelivery <= cap) {
//         deliveries[i] = 0;
//         truck += currentDelivery;
//       } else {
//         deliveries[i] -= cap;
//         truck += cap;

//         deliveriesPointer = i;
//         break;
//       }
//     }

//     truck = 0;

//     for (let i = pickupsPointer; i >= 0; i--) {
//       const currentPickup = pickups[i];

//       if (truck + currentPickup > cap) {
//         pickupsPointer = i;
//         truck = 0;

//         break;
//       }

//       if (currentPickup <= cap) {
//         pickups[i] = 0;
//         truck += currentPickup;
//       } else {
//         pickups[i] -= cap;
//         truck += cap;

//         pickupsPointer = i;
//         truck = 0;
//         break;
//       }
//     }
//   }

//   console.log(res);
//   return res;
// }

// solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]); // 16
// solution(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]); // 30
