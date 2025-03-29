def solution(n, m, x, y, r, c, k):    
    # 맨해튼 거리
    def manhattan(a, b, c, d):
        return abs(a - c) + abs(b - d)
    
    diff = manhattan(x, y, r, c)
    if diff > k or (k - diff) % 2 != 0:
        return "impossible"
    
    moves = [('d', 1, 0), ('l', 0, -1), ('r', 0, 1), ('u', -1, 0)]
    answer = ""
    cur_x, cur_y = x, y
    
    # k번의 이동을 진행
    for i in range(k):
        found = False
        # 남은 이동 횟수 (현재 단계 이후로 남은 횟수)
        remain = k - len(answer) - 1
        
        # 사전순으로 가능한 이동을 하나씩 시도
        for move_char, dx, dy in moves:
            nx, ny = cur_x + dx, cur_y + dy
            if not (1 <= nx <= n and 1 <= ny <= m):
                continue
            # 목표까지의 남은 맨해튼 거리 계산
            dist = manhattan(nx, ny, r, c)
            # 남은 이동횟수 내에 도착이 가능하고, 차이가 짝수여야 함
            if dist <= remain and (remain - dist) % 2 == 0:
                answer += move_char
                cur_x, cur_y = nx, ny
                found = True
                break
        if not found:
            return "impossible"
    return answer

# 테스트 예시
if __name__ == "__main__":
    # 예시 1
    print(solution(3, 4, 2, 3, 3, 1, 5))  # 출력: "dllrl"
    # 예시 2
    print(solution(2, 2, 1, 1, 2, 2, 2))  # 출력: "dr"
    # 예시 3
    print(solution(3, 3, 1, 2, 3, 3, 4))  # 출력: "impossible"
