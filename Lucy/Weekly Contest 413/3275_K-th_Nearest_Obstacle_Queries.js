/**
 * 3275. K-th Nearest Obstacle Queries
 *
 * url: https://leetcode.com/problems/k-th-nearest-obstacle-queries/
 * topic: Array, Heap(Priority Queue)
 * difficulty: Medium
 * date: 2024.09.10(TUE)
 */

/**
 * 두 번째 풀이:
 *
 * 아래 두 힌트를 보고 max heap을 사용하여 문제를 풀이했다.
 * Hide Hint 2. Maintain a max heap of size k, thus heap will contain minimum element at the top in that queue.
 * Hide Hint 3. Remove top element and insert new element from input array if current max is larger than this.
 *
 */
/**
 * @param {number[][]} queries
 * @param {number} k
 * @return {number[]}
 */
var resultsArray = function (queries, k) {
  const heap = new PriorityQueue({
    compare: (a, b) => b.distance - a.distance,
  });

  const results = [];

  queries.forEach((query) => {
    const [x, y] = query;
    const distance = Math.abs(x) + Math.abs(y);

    heap.enqueue({ x, y, distance });

    if (heap.size() > k) heap.dequeue();

    if (heap.size() < k) results.push(-1);
    else {
      results.push(heap.front().distance);
    }
  });

  return results;
};

/**
 * 첫 번째 풀이:
 * 586 / 591 test cases passed.
 * Status: Time Limit Exceeded
 */
/**
 * @param {number[][]} queries
 * @param {number} k
 * @return {number[]}
 */
var resultsArray = function (queries, k) {
  const heap = new PriorityQueue({
    compare: (a, b) => a.distance - b.distance,
  });

  const results = [];

  queries.forEach((query) => {
    const [x, y] = query;
    const distance = Math.abs(x) + Math.abs(y);

    heap.enqueue({ x, y, distance });

    if (heap.size() < k) results.push(-1);
    else {
      results.push(heap.toArray().at(k - 1).distance);
    }
  });

  return results;
};
