/**
 * 3170. Lexicographically Minimum String After Removing Stars
 * URL: https://leetcode.com/problems/lexicographically-minimum-string-after-removing-stars/
 * TOPIC: Hash Table, String, Stack, Greedy, Heap(Priority Queue)
 * DIFFICULTY: Medium
 * DATE: 2024.06.08(SAT)
 */

/**
 * @param {string} s
 * @return {string}
 */

// Discuss Tab에서 heap을 사용한 답을 보고 구현
var clearStars = function (s) {
  // "*" 문자열을 저장하는 상수 STAR 선언 및 초기화
  const STAR = "*";

  // s에서 지워지지 않은 문자열을 파악할 배열 include 선언 및 초기화(s 길이 만큼 배열 공간을 생성하고 모든 요소를 true 값으로 초기화)
  let include = new Array(s.length).fill(true);

  // Leet Code 내장함수 PriorityQueue 사용
  // constructor에 compare(PriorityQueue의 우선순위를 정의 하는 콜백 함수)를 넘겨주어 어떤 식으로 정렬할지 설정
  // 우선순위 기준
  //  - 문자가 같은 경우 index 값이 큰 것이 우선순위가 높다
  //  - 문자가 같지 않은 경우 문자가 큰 것이 우선순위가 높다
  const heap = new PriorityQueue({
    compare: (a, b) => {
      if (s[a] === s[b]) {
        if (a < b) return 1;
        else return -1;
      } else {
        if (s[a] > s[b]) return 1;
        else return -1;
      }
    },
  });

  // s 문자열 순회
  for (let i = 0; i < s.length; i++) {
    // s[i] 가 STAR인 경우, include[i] 를 false로 변경, include[heap의 root node] 를 false로 변경
    if (s[i] === STAR) {
      include[i] = false;
      include[heap.dequeue()] = false;
    }
    // s[i]가 STAR가 아닌 경우, heap에 현재 index를 삽입
    else {
      heap.enqueue(i);
    }
  }

  // 연산 진행 후 결과값을 저장할 변수 res 선언 및 초기화
  let res = "";
  // s 문자열 순회
  for (let i = 0; i < s.length; i++) {
    // include[i] 가 true인 경우만 제거가 되지 않은 문자를 뜻함, res에 s[i]를 추가
    if (include[i]) res += s[i];
  }

  // res 변수를 반환
  return res;
};

// Time Limit Exceeded. 596 / 602 test cases passed.
// MinimumPriorityQueue 구현
class MinimumPriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  enqueue(data) {
    this.heap.push(data);
    let currIdx = this.size() - 1;
    let parentIdx = Math.floor((currIdx - 1) / 2);

    while (
      this.heap[parentIdx] !== undefined &&
      this.heap[parentIdx] > this.heap[currIdx]
    ) {
      [this.heap[parentIdx], this.heap[currIdx]] = [
        this.heap[currIdx],
        this.heap[parentIdx],
      ];
      currIdx = parentIdx;
      parentIdx = Math.floor((currIdx - 1) / 2);
    }
  }

  dequeue() {
    if (this.size() === 0) return null;

    const root = this.peek();
    this.heap[0] = this.heap[this.size() - 1];
    this.heap.pop();

    let currIdx = 0;
    let leftChildIdx = currIdx * 2 + 1;
    let rightChildIdx = currIdx * 2 + 2;

    while (this.heap[leftChildIdx] !== undefined) {
      const childIdx =
        this.heap[leftChildIdx] > this.heap[rightChildIdx]
          ? rightChildIdx
          : leftChildIdx;

      if (this.heap[childIdx] > this.heap[currIdx]) {
        break;
      } else {
        [this.heap[childIdx], this.heap[currIdx]] = [
          this.heap[currIdx],
          this.heap[childIdx],
        ];
      }

      currIdx = childIdx;
      leftChildIdx = (currIdx + 1) * 2 - 1;
      rightChildIdx = (currIdx + 1) * 2;
    }

    return root;
  }

  print() {
    console.log(this.heap);
  }
}
var clearStars = function (s) {
  // 문자를 저장할 minHeap 선언 및 초기화
  const minHeap = new MinimumPriorityQueue();
  // 문자의 인덱스를 저장할 알파벳의 갯수만큼 길이를 설정한 배열 indices 선언 및 초기화
  const indices = new Array(26).fill().map(() => []);

  // "*" 문자를 저장할 상수 STAR 선언 및 초기화
  const STAR = "*";
  // "a" 문자의 UTF-16 코드 단위 값(정수)를 저장하는 상수 A_CODE 선언 및 초기화
  const A_CODE = "a".charCodeAt(0);

  // s 문자열 순회
  for (let i = 0; i < s.length; i++) {
    // s[i] 가 "*" 인 경우
    if (s[i] === STAR) {
      // 현재 minHeap의 root node 값을 rootStr 변수에 저장
      const rootStr = minHeap.peek();

      // indies에 저장된 s[i](문자)의 index 값을 pop() (가장 작은 문자 중에서 인덱스가 큰 값)
      const removedIdx = indices[rootStr.charCodeAt(0) - A_CODE].pop();

      // removedIdx 가 undefined가 아닌 경우(pop() 메서드의 결과 값으로 undefined가 나올 경우가 있어서)
      if (removedIdx !== undefined)
        s = s.slice(0, removedIdx) + "$" + s.slice(removedIdx + 1); // String.prototype.slice() 메서드를 사용해서 s[i]의 값을 $ 변환(어떤 문자가 지워졌는지 체크해놓기 위함)

      // indices 에 저장된 s[i](문자)의 index 값이 없을 경우, minHeap에서 root node에 있는 값을 dequeue()
      if (indices[rootStr.charCodeAt(0) - A_CODE].length === 0) {
        minHeap.dequeue();
      }
    }
    // s[i]가 "*" 가 아닌 경우
    else {
      // indices에 저장된 값이 없는 경우 minHeap에 s[i](문자) enqueue
      if (indices[s.charCodeAt(i) - A_CODE].length === 0) minHeap.enqueue(s[i]);
      // indices 배열에 현재 index push
      indices[s.charCodeAt(i) - A_CODE].push(i);
    }
  }

  // 연산의 결과에서 s 문자열에서 $, * 인 경우를 ""로 치환한 값을 res 변수에 저장
  const res = s.replace(/[$*]/g, "");

  // 연산 결과 반환
  return res;
};

// Time Limit Exceeded. 528 / 602 test cases passed.
var clearStars = function (s) {
  // "*" 의 index와 "*" 를 저장할 array starArr 선언 및 초기화
  const starArr = [];
  // "*" 가 아닌 문자의 index와 문자를 저장할 array nonStarArr 선언 및 초기화
  const nonStarArr = [];

  // starArr와 nonStarArr 에 값 push
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "*")
      starArr.push({
        index: i,
        value: s[i],
      });
    else
      nonStarArr.push({
        index: i,
        value: s[i],
      });
  }

  // sort nonStarArr
  // 가장 왼쪽의 "*"와 그 왼쪽의 "*"가 아닌 가장 작은 문자를 알아내기 위해 정렬
  // nonStarArr.value의 오름차순, nonStarArr.index의 내림차순
  nonStarArr.sort((a, b) => {
    if (a.value < b.value) return -1;
    else if (a.value > b.value) return 1;
    else {
      if (a.index < b.index) return 1;
      else if (a.index > b.index) return -1;
      else return 0;
    }
  });

  // starArr 순회하면서 가장 왼쪽의 "*" 의 인덱스보다 작으면서 가장 작은 문자를 nonStarArr에서 찾아서 제거
  for (let i = 0; i < starArr.length; i++) {
    for (let j = 0; j < nonStarArr.length; j++) {
      if (nonStarArr[j].index < starArr[i].index) {
        nonStarArr.splice(j, 1);
        break;
      }
    }
  }

  // nonStarArr.index 기준으로 오름차순으로 정렬
  // Array.prototype.map 메서드로 nonStartArr.value만 빼서 새로운 배열 만듬
  // Array.prototype.join 메서드로 string으로 변환
  const res = nonStarArr
    .sort((a, b) => {
      if (a.index < b.index) return -1;
      else if (a.index > b.index) return 1;
      return 0;
    })
    .map((val) => val.value)
    .join("");

  // res 변수에 담긴 "*" 를 제거한 문자열 반환
  return res;
};
