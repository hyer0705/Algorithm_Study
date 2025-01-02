# 724. Find Pivot Index

## 문제 정보

- URL: https://leetcode.com/problems/find-pivot-index
- Level: Easy
- Topic: Array, Prefix Sum

## 문제 접근

### Pivot Index란?

임의의 인덱스를 기준으로 왼쪽에 있는 모든 배열 요소의 합이 오른쪽에 있는 모든 배열 요소의 합과 같은 경우의 인덱스를 Pivot Index라 한다.

nums = [1,7,3,6,5,6] 이 주어졌을 때, 인덱스가 3을 기준으로 왼쪽 요소들의 합은 11(nums[0] + nums[1] + nums[2]), 오른쪽 요소들의 합은 11(nums[4] + nums[5])이다. 이때, 인덱스 3을 Pivot Index라 부른다.

### Prefix Sum이란?

Prefix Sum(누적 합)은 배열에서 각 요소까지의 합을 미리 계산해 저장해 두는 알고리즘입니다.

```plaintext
// 길이가 N인 배열 arr가 주어졌을 때,

arr = [10, 20, 30, 40, 60] 이라면,

prefixSum[i] = arr[0] + arr[1] + ... + arr[i]

공식에 따르면, prefixSum = [10, 30, 60, 100, 160] 이 된다.

```

PrefixSum은 구간의 합을 O(1)의 시간 복잡도로 빠르게 계산할 수 있도록 도와준다.

- 구간 합 계산 방법: rangeSum[i:j] = prefixSum[j] - prefixSum[i - 1]

### 문제에 Prefix Sum을 적용한다면?

1. Prefix Sum 계산 prefixSum[i] = nums[0] + nums[1] + ... + nums[i]
2. 구간 합 계산
   - rangeSum[i]: index i를 기준으로 왼쪽 요소들의 구간 합과 오른쪽 요소들의 구간 합을 저장하는 배열
   - index i를 기준으로 왼쪽 요소들의 합: prefixSum[i - 1]
   - index i를 기준으로 오른쪽 요소들의 합: prefixSum[numsLen - 1] - prefixSum[i]
3. Pivot Index 판별
   - rangeSum[i]에서 왼쪽 요소들의 합과 오른쪽 요소들의 합이 동일한 경우를 Pivot Index로 판단하고 i를 반환
4. 예외 처리
   - 배열의 길이가 1인 경우, Pivot Index는 무조건 0
     - 배열의 유일한 요소가 양쪽의 합을 모두 만족하기 때문
     - 인덱스 0을 기준으로 왼쪽, 오른쪽 요소들이 모두 없기 때문에 왼쪽 요소들의 합 = 0, 오른쪽 요소들의 합 = 0으로 동일하므로 0을 반환
   - Pivot Index가 없는 경우 -1 반환

## 문제 회고

- Prefix Sum 알고리즘에 대해 공부하게 됨
- Prefix Sum 알고리즘을 활용해서 어떻게 문제를 풀이할지 고민하다가 구간 합에 대해서 생각하게 되고 index를 기준으로 왼쪽 요소들의 합, 오른쪽 요소들의 합을 구하는 방법을 알아내어 풀이하게 됨
- test case: nums = [0]에서 Wrong Answer 상태가 떠서 길이가 1인 경우에 대한 예외처리 코드를 작성하고 통과하게 됨
