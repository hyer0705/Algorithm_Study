# 2352. Equal Row and Column Pairs

## 문제 정보

- URL: https://leetcode.com/problems/equal-row-and-column-pairs/description/
- Level: Medium
- Topic: Array, Hash Table, Matrix, Simulation

## 문제 접근

Hash Map을 활용하여 행과 열의 패턴을 비교하는 방식으로 문제를 풀이했습니다.

### 풀이 절차

1. **행과 열의 패턴 저장**

   - 각 행과 열을 특정 구분자("|")로 연결하여 유일한 Key로 표현합니다.
   - 이를 기반으로 행과 열의 숫자 패턴을 각각 `rowNumberCount`와 `colNumberCount` Map 객체에 저장하며, 등장 횟수를 카운트합니다.

   ```javascript
   const SEPARATION = "|";
   const INIT_VALUE = 0;

   let answer = 0;
   const rowNumberCount = new Map();
   const colNumberCount = new Map();

   grid.forEach((row, i, arr) => {
     const joinedRow = row.join(SEPARATION);
     rowNumberCount.set(joinedRow, (rowNumberCount.get(joinedRow) || INIT_VALUE) + 1);

     const joinedCol = arr.map((row) => row[i]).join(SEPARATION);
     colNumberCount.set(joinedCol, (colNumberCount.get(joinedCol) || INIT_VALUE) + 1);
   });
   ```

2. **중복된 패턴 확인**

   - `rowNumberCount`와 `colNumberCount` Map 객체에서 Key 값들을 추출하여 Set 객체에 저장합니다.
   - Set 객체를 사용하여 행과 열의 동일한 숫자 패턴을 빠르게 탐지할 수 있도록 중복을 제거합니다.

   ```javascript
   const rowNumbers = Array.from(rowNumberCount.keys());
   const colNumbers = Array.from(colNumberCount.keys());

   const numberKeys = new Set([...rowNumbers, ...colNumbers]);
   ```

3. **패턴 매칭과 카운트 곱셈**

   - Set 객체를 순회하며, `rowNumberCount`와 `colNumberCount`에 동일한 Key 값이 존재하는 경우 두 값의 곱을 계산합니다.
   - 이 값은 해당 패턴이 행과 열에서 겹치는 횟수를 의미하며, 이를 모두 더해 최종 값을 `answer`에 저장합니다.

   ```javascript
   let answer = 0;
   // ...

   numberKeys.forEach((key) => {
     if (rowNumberCount.has(key) && colNumberCount.has(key)) {
       answer += rowNumberCount.get(key) * colNumberCount.get(key);
     }
   });
   ```

4. **결과 반환**
   - 최종적으로 모든 겹치는 패턴의 횟수를 더한 `answer` 값을 반환합니다.

#### 예제

- 입력: `grid = [[11,1],[1,11]]`
- 행 패턴: "11|1", "1|11"
- 열 패턴: "11|1", "1|11"
- 동일한 패턴 "11|1", "1|11"의 카운트를 각각 곱하면:
  - "11|1" => 1 \* 1
  - "1|11" => 1 \* 1
- 결과: `answer = 1 + 1 = 2`

## 문제 회고

처음에 Hash Map을 사용하면 문제를 빠르게 풀 수 있을 거라고 생각했습니다. 처음 접근은 행(row)과 열(col)을 구분하지 않고 하나의 Map 객체에 모든 데이터를 저장해 계산하려는 방식이었지만, 이 방법이 잘못되었다는 것을 깨닫고 다시 접근 방법을 고민하게 되었습니다.

고민 끝에, 행과 열을 각각 별도의 Map 객체(rowNumberCount, colNumberCount)에 저장해 계산하는 방법으로 방향을 수정했습니다. 이번에는 제대로 해결됐을 거라고 생각했지만, 테스트 케이스 grid = [[11,1],[1,11]]에서 틀렸다는 결과가 나왔습니다.

이 문제를 해결하기 위해 Array.prototype.join() 메서드에 임의의 문자 "|"를 구분자로 사용해 숫자 패턴을 Key 값으로 구분하는 방법을 떠올렸습니다. 이를 적용한 후, 모든 테스트 케이스를 통과할 수 있었습니다.

## 출처

- [Get column from a two dimensional array - StackOverflow (2차원 배열에서 같은 행에 나오는 숫자들 추출하는 방법)](https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array)
- [Map - MDN Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Set - MDN Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)
