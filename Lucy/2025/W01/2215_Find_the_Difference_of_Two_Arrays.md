# 2215. Find the Difference of Two Arrays

## 문제 정보

Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:

answer[0] is a list of all distinct integers in nums1 which are not present in nums2. answer[1] is a list of all distinct integers in nums2 which are not present in nums1. Note that the integers in the lists may be returned in any order.

- URL: https://leetcode.com/problems/find-the-difference-of-two-arrays/description/?envType=study-plan-v2&envId=leetcode-75
- Level: Easy
- Topic: Array, Hash Table

## 문제 접근

### Set 이란?

Set 객체는 원시값이나 객체 참조 값 등 모든 유형의 고유 값을 저장할 때 사용할 수 있습니다. Set 객체는 값의 컬렉션입니다.

[출처: [Set - MDN Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)]

### Set을 사용한다면?

문제에서 요구하는 답변은 두 배열 nums1과 nums2 간의 서로 겹치지 않는 고유한 값들을 구하는 것이다.

Set 객체를 활용하면 중복된 요소를 제거하고 고유한 값을 저장할 수 있어 문제 풀이에 적합한 자료구조라고 생각했다.

1. Set 생성자를 이용해 nums1, nums2 배열의 중복 요소 제거
2. 교집합 구하기
   - nums1과 nums2 두 배열에 공통으로 포함된 값들 구하기
3. 차집합 구하기
   - 2에서 구한 교집합을 사용하여 nums1 - nums2, nums2 - nums1 값 구하기
4. 결과 반환
   - 두 차집합의 값을 반환할 배열에 추가

- [Set 생성자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set#%EC%83%9D%EC%84%B1%EC%9E%90)
- [Array.prototype.filter()](illa.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.includes()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

## 문제 회고

- Set 인스턴스 메서드로 Set.prototype.difference()를 사용하여 문제를 풀려했으나 Leet Code에서는 없는 메서드라고 에러가 떴다. 그래서 Array.prototype.filter(), Array.prototype.includes()를 사용하여 교집합을 찾아내고 차집합 값을 구했다.
- MDN Docs에서 Set.prototype.has() 메서드가 Array.prototype.includes() 메서드보다 평균적으로 빠르다고 적혀있다는 것을 회고를 쓸 때쯤 발견했다. 다음에는 Set.prototype.has() 메서드를 사용하는 것을 생각해봐야겠다.
