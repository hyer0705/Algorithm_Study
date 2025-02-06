# 933. Number of Recent Calls

## 문제 정보

- URL: https://leetcode.com/problems/number-of-recent-calls/description/
- Level: Easy
- Topics: Design, Queue, Data Stream

## 문제 접근

이 문제는 Queue 자료구조의 특징을 활용하여 해결할 수 있다.

### 첫 번째 풀이

Queue의 특징을 활용하지 않은 풀이이다.

- PAST_TIME와 queue를 private 접근제어자로 정의한다.
- ping() 메서드가 호출되면, 매개변수 t를 queue에 추가한다.
- Array.prototype.filter() 메서드를 사용해 [t - 3000, t] 범위에 해당하는 요소의 개수를 계산해 반환한다.

```typescript
class RecentCounter {
  private PAST_TIME: number = 3000;
  private queue: number[] = [];

  constructor() {}

  ping(t: number): number {
    this.queue.push(t);
    const [timeStart, timeEnd] = [t - this.PAST_TIME, t];

    const count = this.queue.filter((time) => time >= timeStart && time <= timeEnd).length;

    return count;
  }
}
```

### 두번째 풀이

Queue의 특징을 활용한 풀이이다.

- PAST_TIME와 queue를 private 접근제어자로 정의한다.
- ping() 메서드 호출 시, t를 queue에 추가한다.
- while 문을 사용해 t - 3000보다 작은 요소를 Array.prototype.shift()로 제거한다.
- 최종적으로 queue의 길이를 반환한다.

```typescript
class RecentCounter {
  private PAST_TIME: number = 3000;
  private queue: number[];

  constructor() {
    this.queue = [];
  }

  ping(t: number): number {
    this.queue.push(t);
    const timeStart = t - this.PAST_TIME;

    while (this.queue.length > 0 && this.queue[0] < timeStart) {
      this.queue.shift();
    }

    return this.queue.length;
  }
}
```

## 문제 회고

처음 문제를 읽었을 때, 입력으로 두 개의 배열이 주어지는 것처럼 보였지만, 실제로는 매개변수로 숫자 t 하나만 전달되는 구조라 어떻게 동작하는지 이해가 어려웠다. 미리 제공된 코드의 주석을 읽으며 어떤 값이 들어오는지 파악할 수 있었다.

ping 함수를 구현할 때는 클래스 변수로 queue를 정의하고, ping() 메서드가 호출될 때 매개변수 t 값을 queue에 추가했다. 이후 Array.prototype.filter() 메서드를 사용해 [t - 3000, t] 범위에 속하는 값들을 찾아내고, 그 개수를 반환하는 방식으로 구현했다.

그런데 다른 사람들이 푼 코드를 보니, queue의 자료구조적 특성을 더 잘 활용한 방식이어서 이를 참고해 [t - 3000, t] 범위에 해당되지 않는 값은 dequeue() 동작을 해서 빼내고 queue에 남아있는 값들의 갯수를 반환하는 방식으로 구현했다. 이 경험을 통해 문제를 해결할 때 제공된 topics에 언급된 자료구조나 알고리즘을 최대한 활용하는 방법을 떠올리고 적용해보는 연습이 필요하다는 것을 느꼈다.

## 참고자료

- [Array.prototype.shift()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
