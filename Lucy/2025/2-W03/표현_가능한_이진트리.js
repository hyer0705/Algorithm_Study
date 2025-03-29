function solution(numbers) {
  var answer = [];

  const isValidSubtree = (binary, startIndex, endIndex) => {
    if (startIndex >= endIndex) return true;

    const parentIndex = Math.floor((startIndex + endIndex) / 2);
    if (binary[parentIndex] === "0") {
      for (let i = startIndex; i <= endIndex; i++) {
        if (binary[i] === "1") return false;
      }
    }

    return isValidSubtree(binary, startIndex, parentIndex - 1) && isValidSubtree(binary, parentIndex + 1, endIndex);
  };

  for (const number of numbers) {
    let binary = number.toString(2);

    let h = 0;
    let totalNode = 1;
    while (totalNode < binary.length) {
      h++;
      totalNode = 2 ** (h + 1) - 1;
    }

    binary = binary.padStart(totalNode, "0");

    let rootNodeIndex = Math.floor(totalNode / 2);
    if (binary[rootNodeIndex] === "1" && isValidSubtree(binary, 0, totalNode - 1)) {
      answer.push(1);
    } else {
      answer.push(0);
    }
  }

  return answer;
}

// 첫 번째 풀이 -> 포화 이진트리의 특징을 담고 있지 않아서 1번 테스트 케이스만 통과
// function solution(numbers) {
//   var answer = [];

//   const toBinary = numbers.map((number) => number.toString(2));

//   const checkRoot = (binary) => {
//     if (binary.length === 1) {
//       if (binary == 0) return 0;
//       return 1;
//     }

//     for (let i = 1; i < binary.length; i += 2) {
//       if (binary[i] == 0) return 0;
//     }

//     return 1;
//   };

//   for (const binary of toBinary) {
//     if (binary.length % 2 === 1) {
//       answer.push(checkRoot(binary));
//     } else {
//       if (checkRoot(binary + "0") || checkRoot("0" + binary)) {
//         answer.push(1);
//       } else {
//         answer.push(0);
//       }
//     }
//   }

//   console.log(answer);
//   return answer;
// }

solution([7, 42, 5]); // [1, 1, 0]
solution([63, 111, 95]); // [1, 1, 0]
