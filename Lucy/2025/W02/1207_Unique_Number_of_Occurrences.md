# 1207. Unique Number of Occurrences

## 문제 정보

- URL: https://leetcode.com/problems/unique-number-of-occurrences/
- Level: Easy
- Topic: Array, Hash Table

## 문제 접근

처음에는 주어진 `arr`라는 배열의 요소들이 고유한 값을 가져야 하는 거로 이해했으나 예시를 보니 `arr`라는 배열 요소들의 발생 횟수가 고유한지를 판단하는 문제였다.

Example 1)

- Input: arr [1, 2, 2, 1, 1, 3]

  arr 배열의 요소로 1, 2, 3이 있고 각 요소가 배열에 몇 개 존재하는지 카운트 해보면 1은 3번, 2는 2번, 3은 1번이다. 1: 3번, 2: 2번, 3: 1번으로 고유하게 발생하는 것을 알 수 있다.

- Output: true

Example 2)

- Input: arr [1, 2]

  arr 배열의 요소로 1, 2가 있고 각 요소가 배열에 몇 개 존재하는지 카운트 해보면 1: 1번, 2: 1번으로 발생 횟수가 고유하지 않다.

- Output: false

### 풀이 아이디어: 각 요소의 발생 횟수를 카운트해보자!

arr 배열의 요소들의 발생 횟수를 카운트한 뒤, 발생 횟수가 중복되지 않는지 확인해야 합니다. 이를 위해 카운트 정보를 저장할 때, Map 자료구조를, 카운트 정보의 중복 값을 제거하기 위해 Set 자료구조를 사용하기로 결정했다.

1. Map: 배열의 요소를 key로 배열 요소의 발생 횟수를 value로 저장
   > JavaScript에서 Map? 키-값 쌍인 집합
2. Set: 배열 요소의 발생 횟수를 저장하여 중복 여부를 확인
   > JavaScript에서 Set? 값의 컬렉션, Set의 값은 고유함

풀이 절차:

1. arr 배열을 순회하면서 각 요소의 발생 횟수를 카운트하고 이를 Map에 저장
2. 발생 횟수만 추출(Map.prototype.values() 사용)하여 occurrences 배열에 저장
3. occurrences 배열을 Set으로 변환하여 중복된 발생 횟수를 제거하고, 결과를 uniqueOccurrences 변수에 저장
4. occurrences의 길이와 uniqueOccurrences의 크기를 비교하여 각 요소의 발생 횟수가 고유한지 판단

### 풀이에 사용한 자료구조와 메서드

- [Map - MDN Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Set - MDN Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Array.prototype.forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Array.from()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Map.prototype.values()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map/values)
- [Set.prototype.size](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set/size)

## 문제 회고

문제의 지문을 읽었을 때는 잘못 이해하고 있었는데 문제에서 제시한 예시들을 보고 올바르게 이해할 수 있었다. occurrence 라는 단어에 대해 새롭게 알게 되고 Map과 Set에 대해 공부하는 시간을 가질 수 있었다. Map 객체를 Array로 전환하기 위해서는 Array.from() 메서드를 사용해야 한다는 것을 알게 됐다.
