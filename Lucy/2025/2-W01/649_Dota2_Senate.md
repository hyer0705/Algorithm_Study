# 649. Dota2 Senate

## 문제 정보

- URL: https://leetcode.com/problems/dota2-senate/description/
- Level: Medium
- Topics: String, Greedy, Queue

## 문제 접근

### 첫 번째 풀이

- `senate` 문자열을 이루는 `R`, `D` 문자를 각각 radiantQueue와 direQueue에 넣어준다.
- for문으로 순회하면서 `R`이 나온 경우에는 direQueue에서 `D`를 빼낸다. `D`가 나온 경우에는 radiantQueue에서 `R`을 빼낸다.
- direQueue 혹은 radiantQueue에 아무 요소도 남지 않은 경우 `Radiant` 혹은 `Dire`를 반환한다.

#### 문제점...

권한이 금지된 의원을 알 수 없고 순회할 수 없는 구조이다.

```typescript
function predictPartyVictory(senate: string): string {
  const SENATOR = {
    Radiant: "R",
    Dire: "D",
  };

  const n = senate.length;
  const radiantQueue = [...senate].filter((senator) => senator === SENATOR.Radiant);
  const direQueue = [...senate].filter((senator) => senator === SENATOR.Dire);

  for (const senator of senate) {
    if (senator === SENATOR.Radiant) {
      direQueue.shift();
      if (direQueue.length === 0) return "Radiant";
    } else if (senator === SENATOR.Dire) {
      radiantQueue.shift();
      if (radiantQueue.length === 0) return "Dire";
    }
  }

  return "";
}
```

### 두 번째 풀이

- queue에 `senate`문자열을 spread operator로 나열하여 문자들을 넣는다.
- queue의 peek를 꺼내 `currentSenator` 변수에 담고 queue에서 `currentSenator`와 다른 문자의 인덱스를 찾아서 `compareSenator` 변수에 담는다.
- `compareSenator`가 -1인 경우, queue에 `currentSenator`를 넣고 반복문을 종료한다.
- `compareSenator`가 -1이 아닌 경우, queue에 `currentSenator`를 넣고 `compareSenator`를 제거한다.

#### 그림 설명

![Image](https://github.com/user-attachments/assets/1072e560-7069-4cb0-8229-ce5cdb3e2666)

```typescript
function predictPartyVictory(senate: string): string {
  const PARTY = {
    radiant: "Radiant",
    dire: "Dire",
  };
  let queue: string[] = [...senate];

  while (queue.length > 1) {
    const currentSenator = queue.shift();

    const compareSenator = queue.findIndex((senator) => senator !== currentSenator);

    if (compareSenator === -1) {
      if (currentSenator) {
        queue.push(currentSenator);
      }
      break;
    } else {
      if (currentSenator) {
        queue.push(currentSenator);
        queue.splice(compareSenator, 1);
      }
    }
  }

  if (queue[0] === "R") return PARTY.radiant;
  return PARTY.dire;
}
```

### 세 번째 풀이

- for문으로 `senate` 문자열을 순회하면서 `'R'`은 `radiantSenators`에 `'D'`는 `direSenators`에 인덱스 값을 enqueue()한다.
- while문으로 `radiantSenators`, `direSenators`의 size가 0보다 큰 경우, 즉 각 당에서 투표를 할 수 있는 의원의 인원수가 0보다 크면 반복한다.
- `radiantSenator`에 담긴 인덱스 값과 `direSenator`에 담긴 인덱스 값을 비교하여 인덱스가 더 작은 경우만 다시 enqueue()한다. 이때, enequeue()하는 값은 순회한다는 의미를 주기 위해 `n(senate 문자열 길이)만큼 더한 값`을 넣는다.
- while문을 빠져나온 후 `radiantSenators`의 size가 0보다 크다면 즉 의원이 남아있다면 `'Radiant'`를 반환하고 `direSenators`의 size가 0보다 크다면 즉 의원이 남아있다면 `'Dire'`를 봔환한다.

#### 그림 설명

![Image](https://github.com/user-attachments/assets/cd6d154f-d6df-483f-b6e2-fe832ba0cae8)

```typescript
function predictPartyVictory(senate: string): string {
  const n = senate.length;

  const radiantSenators = new Queue();
  const direSenators = new Queue();

  for (let i = 0; i < senate.length; i++) {
    const senator = senate[i];
    if (senator === "R") {
      radiantSenators.enqueue(i);
    } else {
      direSenators.enqueue(i);
    }
  }

  while (radiantSenators.size() > 0 && direSenators.size() > 0) {
    const radiantSenator = radiantSenators.dequeue();
    const direSenator = direSenators.dequeue();

    if (radiantSenator > direSenator) {
      direSenators.enqueue(direSenator + n);
    } else {
      radiantSenators.enqueue(radiantSenator + n);
    }
  }

  if (radiantSenators.size() === 0) return "Dire";
  return "Radiant";
}
```

## 문제 회고

처음에는 `senate` 문자열을 순회하며 `radiantQueue`와 `direQueue`에 각각 `R`과 `D`를 추가하는 방식으로 접근했다. for문으로 `senate` 문자열을 순회하며 `R`이 나오면 `direQueue`에서 `dequeue()` 연산을 수행해 Dire의 의원을 권한을 금지했다. `D`가 나오면, `radiantQueue`에서 `dequeue()` 연산을 수행해 Radiant 의원의 권한을 금지하는 식으로 풀이를 진행했다.

그러나 이 접근법에서는 아래와 같은 문제점이 있었다:

- 이미 차단된 의원을 기억하고 처리하는 로직을 작성하기가 까다로웠다.

이 풀이는 잘못된 접근 방식이라는 것을 깨닫고 다른 풀이 방법을 떠올리기 위해 2시간 정도 고민했다. 그런데 떠오르지 않아 다른 사람들의 풀이 아이디어를 참고했다. `senate` 문자열을 이루는 문자들을 queue에 넣어 놓고 `dequeue()` 연산을 한 값과 다른 값을 찾아내서 제거하고 `dequeue()` 연산으로 빼낸 값은 `enqueue()` 연산으로 다시 넣는 작업을 통해 승리한 당을 찾아낼 수 있었다.

하나의 queue를 사용한 풀이가 다른 사람보다 속도가 많이 느려서 개선해야 겠다고 생각했다. 다른 사람의 풀이를 참고해서 두 개의 queue와 `senate`문자열의 인덱스를 사용하여 풀이하는 방법을 알아냈다. runtime을 74ms 에서 15ms로 개선할 수 있었다.

분명 Queue라는 자료구조는 First in First out 이라는 특징을 가지고 있는 걸 알고 있는데도 풀이를 떠올리지 못했다. Queue 유형의 문제를 쉬운 문제부터 다시 풀어보는 연습이 필요한 것 같다.
