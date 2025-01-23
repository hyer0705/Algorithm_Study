# 394. Decode String

## 문제 정보

- URL: https://leetcode.com/problems/decode-string/description/
- Level: Medium
- Topics: String, Stack, Recursion

## 문제 접근

### 초기화

- OPEN: 여는 대괄호 "\["
- CLSE: 닫는 대괄호 "\]"
- numStack: 반복 횟수를 저장하는 스택
- strStack: 문자나 중간 결과 문자열을 저장하는 스택
- numStr: 숫자를 임시로 저장하기 위한 변수

```typescript
const OPEN = "[";
const CLOSE = "]";

const numStack: number[] = [];
const strStack: string[] = [];

let numStr = "";
```

### 문자 순회

문자열 s를 하나씩 순회하며 문자의 종류에 따라 처리

```typescript
for (const ch of s) {
  // ...
}
```

#### 숫자 처리

- Number.isIntegers(+ch)를 사용해 숫자인지 확인
- 숫자가 연속으로 나올 수 있으므로 numStr에 추가

```typescript
if (Number.isInteger(+ch)) {
  numStr += ch;
}
```

#### 여는 대괄호("\[")

여는 대괄호("\[")를 만날 경우:

- 현재까지 저장된 숫자(numStr)를 numStack에 저장하고 초기화
- strStack에 push

```typescript
else if (ch === OPEN) {
    strStack.push(OPEN);
    numStack.push(+numStr);
    numStr = "";
}
```

#### 닫는 대괄호("\]")

닫는 대괄호("\]")를 만날 경우:

- strStack에서 여는 대괄호를 만날 때까지 pop하여 디코딩할 문자열(targetStr)을 생성
- numStack에서 반복 횟수(repeatCount)를 꺼내와 문자열을 반복
- 디코딩한 문자열을 strStack에 저장

```typescript
else if (ch === CLOSE) {
    let targetStr = "";

    while (strStack.length > 0) {
    if (strStack[strStack.length - 1] === OPEN) {
        strStack.pop();
        break;
    }

    targetStr = strStack.pop() + targetStr;
    }

    const repeatCount = numStack.pop();

    if (repeatCount) {
    strStack.push(targetStr.repeat(repeatCount));
    }
}
```

#### 일반 문자

- 일반 문자를 strStack에 추가

```typescript
else {
    strStack.push(ch);
}
```

### 결과 조합

- 문자열 순회가 끝나면, strStack에는 최종적으로 디코딩된 문자열들이 남아 있게됨
- join() 메서드를 사용하여 하나의 문자열로 합쳐서 반환

```typescript
return strStack.join("");
```

## 문제 회고

문제를 해결하기 위해 숫자와 문자를 각각 numStack과 strStack에 저장하는 방식으로 접근했습니다. 문자열을 순회하며 숫자가 나오면 numStack에 number로 형변환하여 저장했습니다. 문자가 나오면 "\]"가 아닌 경우 strStack에 추가했습니다. "\]"를 만나면 strStack에서 "\["가 나올 때까지 pop 연산을 사용해 반복해야 할 문자열을 만들어내고, 반복 횟수는 numStack에서 pop 연산으로 가져왔습니다. 이렇게 디코딩된 문자열은 다시 strStack에 추가했고, 문자열 순회를 마친 후에는 strStack에 남아 있는 문자열을 join메서드로 합쳐 최종 결과를 얻어냈습니다.

하지만 테스트 케이스 중 "100[LeetCode]"에서 문제가 발생했습니다. numStack에 [1, 0,0]이 들어가 잘못된 결과가 나왔습니다. 숫자가 연속으로 나오는 경우를 처리하기 위해 "\["를 만날 때까지 숫자들을 임시 변수에 저장한 후 이를 하나의 숫자로 병합하는 로직을 추가했습니다. 문제를 해결하면서 예상하지 못한 함정을 발견했지만, 테스트 케이스를 통해 원인을 파악하고 빠르게 수정할 수 있었습니다.

## 참고 자료

- [Number.isInteger()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
- [String.prototype.repeat()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)
- [Array.prototype.join()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
