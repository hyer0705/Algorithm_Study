/**
 * 3242. Design Neighbor Sum Service
 * url: https://leetcode.com/problems/design-neighbor-sum-service/
 *
 * topic:
 * difficulty: Easy
 * date: 2024.08.06(TUE)~
 */

/**
 * class 없이 객체를 어떻게 정의하라는 건지? 이해가 가지 않았다.
 * ES5 문법으로는 어떻게 객체를 만들어내는 것인지 궁금하여 인터넷에 검색해보았다.
 * 참고 링크: https://dev.to/martyhimmel/javascript-es5-objects-3cce
 *
 * 생각보다 ES6문법과 비슷했다.
 * this를 일반 함수에서 사용하게 되면 전역 객체를 가리킨다는 개념에 사로잡혀서 생성자 함수에서의 this의 역할을 까먹고 있었다.
 * 문제에서 말하는 object를 초기화 하라는 말은 this를 사용하여 생성자 함수가 받는 파라미터인 grid를 초기화하면 되는 것이었다.
 *
 * adjacentSum(value) 메서드는 value 값을 grid 배열에서 어느 위치에 있는지 i와 j 인덱스 값을 찾아서
 *  해당 위치에 인접한 상, 하, 좌, 우에 있는 요소들을 더한 값을 반환하는 함수를 구현하면 된다.
 * diagonalSum(value) 메서드는 adjacentSum(value) 메서드와 동일하게 value 값을 grid 배열에서 어느 위치에 있는지 i와 j 인덱스 값을 찾은 후
 *  해당 위치에서 대각선에 위치한 요소들을 더한 값을 더한 값을 반환하는 함수를 구현하면 된다.
 *
 * 이때, adjacentSum(), diagonalSum() 메서드에 넘겨진 value의 인덱스를 찾는 것은 중복되는 행위이므로 findIndexOfValue() 메서드를 정의해서 문제를 풀이했다.
 *
 * 인접한 배열 요소의 위치와 대각선 배열 요소의 위치를 구할 때, 배열을 벗어나는 인덱스인지 확인하는 연산을 코드로 표현해는 것만 머리를 살짝 썼을 뿐, 쉬운 문제였다.
 *
 * 이런 문제는 처음 접해서 처음에 어떻게 풀어야 할지 감을 잡지 못해 시간을 보냈지만 다른 사람의 풀이를 참고했을 때, this를 사용하여 객체를 초기화하는 것과
 *  ES5 문법에서 생성자 함수에서는 객체를 어떻게 초기화하는지 이해하게 된 후 감을 잡아 순식간에 문제를 풀 수 있었다.
 *
 * 진짜 생각보다 간단한 문제였다...!
 */

/**
 * @param {number[][]} grid
 */
var NeighborSum = function (grid) {
  this.grid = grid;
};

NeighborSum.prototype.findIndexOfValue = function (value) {
  const N = this.grid.length;
  let findI = -1,
    findJ = -1;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (this.grid[i][j] === value) {
        findI = i;
        findJ = j;
        break;
      }
    }
  }

  return [findI, findJ];
};

/**
 * @param {number} value
 * @return {number}
 */
NeighborSum.prototype.adjacentSum = function (value) {
  const N = this.grid.length;

  let sum = 0;

  let [findI, findJ] = this.findIndexOfValue(value);

  // 상
  if (findI - 1 >= 0 && findI - 1 < N) sum += this.grid[findI - 1][findJ];
  // 하
  if (findI + 1 >= 0 && findI + 1 < N) sum += this.grid[findI + 1][findJ];
  // 좌
  if (findJ - 1 >= 0 && findJ - 1 < N) sum += this.grid[findI][findJ - 1];
  // 우
  if (findJ + 1 >= 0 && findJ + 1 < N) sum += this.grid[findI][findJ + 1];

  return sum;
};

/**
 * @param {number} value
 * @return {number}
 */
NeighborSum.prototype.diagonalSum = function (value) {
  const N = this.grid.length;

  let sum = 0;

  let [findI, findJ] = this.findIndexOfValue(value);

  // 좌측상단
  if (findI - 1 >= 0 && findJ - 1 >= 0) sum += this.grid[findI - 1][findJ - 1];
  // 우측상단
  if (findI - 1 >= 0 && findJ + 1 < N) sum += this.grid[findI - 1][findJ + 1];
  // 좌측하단
  if (findI + 1 < N && findJ - 1 >= 0) sum += this.grid[findI + 1][findJ - 1];
  // 욱측하단
  if (findI + 1 < N && findJ + 1 < N) sum += this.grid[findI + 1][findJ + 1];

  return sum;
};

/**
 * Your neighborSum object will be instantiated and called as such:
 * var obj = new neighborSum(grid)
 * var param_1 = obj.adjacentSum(value)
 * var param_2 = obj.diagonalSum(value)
 */
