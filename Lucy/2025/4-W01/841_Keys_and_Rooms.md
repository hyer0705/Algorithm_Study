# 841. Keys and Rooms

## 문제 정보

- URL: [841. Keys and Rooms 풀어보기](https://leetcode.com/problems/keys-and-rooms/description/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Depth-First Search, Breadth-First Search, Graph

## 문제 회고

이 문제는 그래프 탐색 문제로 볼 수 있었고, 각 방을 노드로, 열쇠를 통해 접근할 수 있는 방을 간선으로 해석해 DFS로 접근했다.

처음엔 canVisitAllRooms 함수 내부에 dfs 함수를 정의해서 풀이했는데, 이 방식은 49ms로 다소 느렸다. 이후 다른 사람들의 풀이를 참고하니 함수를 외부에 정의하거나, 구조를 조금 단순하게 구성한 경우가 많았다.

함수 내부에 함수를 정의해서 성능이 저하된 이유는 명확히 모르겠지만, 재귀 함수가 매 호출 시 새로운 스코프를 생성하고, 클로저로 인해 메모리 사용량이 증가할 수도 있다는 생각이 들었다.

이 문제를 통해 그래프 DFS 방식을 복습할 수 있었다. DFS 방식이 익숙해졌지만, 여전히 성능 최적화 관점에서는 더 깊이 있는 공부가 필요하다고 느꼈다.
