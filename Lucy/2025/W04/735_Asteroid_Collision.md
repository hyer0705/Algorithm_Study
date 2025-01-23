# 735. Asteroid Collision

## 문제 정보

- URL: https://leetcode.com/problems/asteroid-collision/description/
- Level: Meduim
- Topics: Array, Stack, Simulation

## 문제 접근

소행성 충돌 문제를 해결하기 위해 배열을 두 개(left, right)로 나누어 관리했습니다. 각 배열은 소행성의 이동 방향에 따라 사용됩니다.

- left: 왼쪽으로 이동 중인 소행성
- right: 오른쪽으로 이동 중인 소행성

### 주요 변수

- left: 최종적으로 충돌에서 살아남은 왼쪽 방향(-)으로 이동 중인 소행성을 저장하는 배열
- right: 오른쪽 방향(+)으로 이동 중인 소행성들을 저장하고 충돌 시 비교와 제거를 진행하는 배열
- pointer: asteroids 배열을 순회하는 포인터

```typescript
const left: number[] = [];
const right: number[] = [];
let pointer = 0;
```

### 절차

#### 소행성의 처리

- asteroids[pointer] > 0: 오른쪽 방향으로 이동 중인 소행성이므로 right에 추가
- asteroids[pointer] < 0: 왼쪽 방향으로 이동 중인 소행성이고 충돌 가능성이 있는지 확인

#### 충돌 처리

right 배열에 소행성이 존재하고, 현재 소행성이 왼쪽 방향(asteroids[pointer] < 0)이라면 충돌 조건 성립

- 충돌 조건에서는 while 루프를 통해 다음을 수행:
  - 현재 소행성(asteroids[pointer])의 절댓값이 right의 최상단 소행성보다 크면: right에서 최상단 소행성을 제거(pop 연산)
  - 두 소행성의 크기가 같다면: right에서 최상단 소행성을 제거하고, 현재 소행성도 소멸
  - 현재 소행성(asteroids[pointer])이 더 작으면: 현재 소행성이 소멸(아무처리 하지 않음)

right가 비어 있고 현재 소행성이 살아남았다면, 이는 더 이상 충돌하지 않으므로 left에 추가

```typescript
while (pointer < asteroids.length) {
  // 충돌 조건: right 배열에 소행성이 존재하고, 현재 소행성이 왼쪽 방향(asteroids[pointer] < 0)
  if (right.length > 0 && asteroids[pointer] < 0) {
    let popValue = -1001;
    // 현재 소행성(asteroids[pointer])의 절댓값이 right의 최상단 소행성보다 크면
    while (Math.abs(asteroids[pointer]) > Math.abs(right[right.length - 1])) {
      if (right.length > 0) {
        popValue = right.pop()!;
      }
    }

    // 두 소행성의 크기가 같다면
    if (Math.abs(asteroids[pointer]) === Math.abs(right[right.length - 1])) {
      right.pop();
    }
    // right가 비어 있고 현재 소행성이 살아남았다면, 이는 더 이상 충돌하지 않으므로 left에 추가
    else if (right.length < 1 && Math.abs(asteroids[pointer]) > Math.abs(popValue)) {
      left.push(asteroids[pointer]);
    }
  }
  // ...
}
```

#### 반복

pointer를 1 증가시켜 다음 소행성 처리

#### 결과 반환

left와 right 배열을 병합하여 충돌 후 남아 있는 모든 소행성을 반환

```typescript
return [...left, ...right];
```

## 문제 회고

처음 문제를 접했을 때, "Stack"이라는 문제 유형을 보고 비교적 간단히 풀 수 있을 거라 생각했습니다. push, pop, peek 연산만 적절히 사용하면 될 것 같았거든요. 하지만 예상보다 까다로웠습니다.

### 초기 접근 방법과 문제점

while문을 사용해 asteroids 배열을 순회하며 현재 소행성과 스택의 최상단 요소(peek)를 비교하도록 구현했습니다.

스택의 최상단 요소와 현재 소행성만 비교했기에 모든 충돌 상황을 고려하지 못했습니다.

#### Example

asteroids = [10, 2, -5] 테스트 케이스에서 오른쪽으로 이동 중인 소행성 10과 2 뒤에 왼쪽으로 이동하는 소행성 -5가 충돌합니다. 하지만 이 경우를 고려하지 않아 잘못된 결과를 반환했습니다.

### 문제 해결 과정

문제를 해결하기 위해 스택에 이미 존재하는 소행성들과 현재 소행성응ㄹ 반복적으로 비교하도록 코드를 수정했습니다.

이제 while문을 사용하여 스택의 최상단 요소(peek)와 현재 소행성이 충돌 조건에 해당하는 경우(서로 부호가 다른 경우)를 모두 처리하도록 개선했습니다.

### 추가 문제점 발견

asteroids = [-2, -1, 1, 2] 테스트 케이스에서 오류가 발생했습니다. 이 경우, 왼쪽으로 이동 중인 소행성 -2, -1과 오른쪽으로 이동 중인 소행성 1, 2는 서로 만나지 않으므로 그대로 반환해야 합니다.

하지만 저는 소행성의 부호가 다르면 무조건 충돌 여부를 비교하도록 작성했기 때문에, 불필요하게 충돌 연산을 시도했고 잘못된 결과를 반환했습니다.

### 문제 해결 과정

스택에 있는 소행성과 현재 소행성이 충돌할 조건을 명확히 정의했습니다.

    충돌 조건: 오른쪽으로 이동 중(+)인 소행성이 먼저 나오고 왼쪽으로 이동 중(-)인 소행성이 나중에 나오는 경우

이 조건을 충족하지 않으면 충돌 검사를 생략하고 그대로 진행하도록 로직을 수정했습니다.

이후에, 테스트 케이스가 틀렸다는 결과를 받을 때마다 디버깅 과정을 반복해서 문제를 해결할 수 있었습니다. Stack이어서 마음 편히 접근했지만 생각보다 까다로운 문제여서 시간을 잡아먹은 문제였습니다.

## 참고 자료

- [Math.abs()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)
- [전개 구문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
