# 1657. Determine if Two Strings Are Close

## 문제 정보

- URL: https://leetcode.com/problems/determine-if-two-strings-are-close
- Level: Medium
- Topic: Hash Table, String, Sorting, Counting

## 문제 접근

주어진 두 문자열 word1과 word2를 다음 두 가지 연산을 통해 word1을 word2로 변경할 수 있다면 true, 그렇지 않다면 false를 반환하는 문제이다.

### 문제 이해 및 규칙 도출

Example 1)

Input: word1 = "abc", word2 = "bca"

Output: true

- Apply Operation 1: "abc" -> "acb" (b 와 c를 Swap!)
- Apply Operation 2: "acb" -> "bca" (a 와 b를 Swap!)

> 분석 결과: 두 문자열의 구성 문자가 동일하며, 각 문자의 개수도 동일하다면, 연산을 통해 word1을 word2로 변경할 수 있다.

Example 2)

Input: word1 = "a", word2 = "aa"

Output: false

> 분석 결과: 문자열의 길이가 다르면 word1을 word2로 변경할 수 없다.

Example 3)

Input: word1 = "cabbba", word2 = "abbccc"

Output: true

- Apply Operation 1: "cabbba" -> "caabbb" (word1의 3번째 위치, 6번째 위치 Swap!)
- Apply Operation 2: "caabbb" -> "baaccc" (word1의 c -> b, b -> c Transform!)
- Apply Operation 2: "baaccc" -> "abbccc" (word1의 b -> a, a -> b Transform!)

> 분석 결과: 두 문자열의 구성 문자가 동일하고, 각 문자의 개수도 동일하면 연산을 통해 변경할 수 있다.

Example 4)

Input: word1 = "uau", word2 = "ssx"

Ouput: false

> 분석 결과: 두 문자열의 구성 문자가 동일하지 않으면 연산으로 word1을 word2로 만들 수 없다.

#### 도출한 규칙

1. 두 문자열의 길이가 동일
2. 두 문자열의 구성 문자가 동일
3. 두 문자열의 각 문자의 개수가 동일

> 위 세 가지 조건을 모두 만족하면 true, 하나라도 만족하지 않으면 false를 반환

### 풀이 절차

1. 길이 비교: word1과 word2의 길이가 동일한지 확인
2. 문자 개수 카운트: 두 문자열을 각각 순회하며, 각 문자의 개수를 Map 객체에 저장
3. 구성 문자 비교: word1의 문자가 모두 word2에 존재하는지 확인
4. 문자 개수 배열 변환: Map 객체에서 각 문자의 개수를 배열로 변환
5. 개수 비교: 변환한 두 배열이 동일한지 확인

### 풀이에 사용한 자료

- [Check if two arrays are equal or not - Geeks for Geeks](https://www.geeksforgeeks.org/check-if-two-arrays-are-equal-or-not/)

## 문제 회고

처음에는 문제의 예시를 보고, 주어진 두 문자열의 길이가 동일하며, 각 문자열을 구성하는 문자의 개수가 동일하다는 두 가지 조건만으로 문제를 풀이했다. 하지만, Example 4에서 Wrong Answer 결과가 나왔다.

문제의 테스트 케이스는 word1 = "uau", word2 = "ssx"였다. 여기서 나는 Transform 연산을 수행할 때, 문자열에 이미 존재하는 기존 문자 간에만 교환이 가능한대 문자열에 없는 새로운 문자로도 교환이 가능하다고 잘못 이해했다.

문제를 좀 더 꼼꼼히 읽는 습관을 길러야겠다고 느꼈다.
