# 2390. Removing Stars From a String

## 문제 정보

- URL: https://leetcode.com/problems/removing-stars-from-a-string/description/
- Level: Medium
- Topics: String, Stack, Simulation

## 문제 접근

Stack 자료 구조의 특성을 활용해 문제를 해결했습니다. 아래는 풀이 과정입니다.

1. 스택 초기화

   - 결과를 저장할 빈 배열 stack을 생성합니다. 문자열을 하나씩 처리하며, 필요한 요소만 stack에 저장하거나 제거합니다.

   ```javascript
   const stack: string[] = [];
   ```

2. 문자열 순회

   - for...of문을 사용하여 입력 문자열 s를 순회합니다. 현재 문자가 '\*'일 경우, 스택의 마지막 요소를 제거하기 위해 pop() 연산을 수행합니다. 문자가 '\*'가 아닌 경우, 스택에 추가하기 위해 push() 연산을 수행합니다.

   ```javascript
   for (const ch of s) {
     if (ch === STAR) {
       stack.pop();
     } else {
       stack.push(ch);
     }
   }
   ```

3. 결과 반환

   - 스택에 남아 있는 문자들을 Array.prototype.join() 메서드를 사용해 문자열로 합칩니다. 최종 문자열을 반환합니다.

   ```javascript
   return stack.join("");
   ```

## 문제 회고

Stack 을 사용한 문제는 많이 풀이를 해와서 그런지 금방 풀이할 수 있었다. Stack은 First In Last Out 특징을 생각했더니 풀이를 금방 생각해낼 수 있었다. 이제 문제가 Stack 유형이라는 것만 알아채는 것만 잘 해낼 수 있으면 문제 없이 문제를 풀어낼 수 있을 것 같다.

## 참고 자료

- [What is Stack Data Structure? A Complete Tutorial - Geeks for Geeks](https://www.geeksforgeeks.org/introduction-to-stack-data-structure-and-algorithm-tutorials/)
