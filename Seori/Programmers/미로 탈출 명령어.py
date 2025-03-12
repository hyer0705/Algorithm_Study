def solution(n, m, x, y, r, c, k):
    # [1] k가 거리보다 작거나, 홀짝이 다른 경우는 불가능
    distance = abs(c - y) + abs(r - x)
    if k < distance or (distance % 2 != k % 2):
        return "impossible"
    
    # [2] 시작점에서 도착점까지의 경로를 구함
    path = ''
    y_move = r - x
    if y_move > 0:
        path += 'd' * y_move
        y_max = r
    else: 
        path += 'u' * (-y_move)
        y_max = x
    
    x_move = c - y
    if x_move > 0:
        path += 'r' * x_move
        x_min = y
    else: 
        path += 'l' * (-x_move)
        x_min = c
    
    # [3] 시작점과 도착점 중 영점(가장 왼쪽 밑)에 가까운 곳에서 영점까지의 경로를 구함.
    #     사전순 d, l, r, u 순에서 유리한게 왼쪽 밑이기 때문
    k -= distance
    while k:
        if y_max < n: 
            path += 'du'
            y_max += 1
            k -= 2
            continue
        
        if x_min > 1:
            path += 'lr'
            x_min -= 1
            k -= 2
            continue
        break
    
    # [4] 지금까지 경로를 사전순으로 정렬하고, 남은 이동 횟수에 따라서 loop(rl 반복)를 추가함
    answer = ''.join(sorted(path))
    loop = 'rl' * (k // 2)

    r_index = answer.find('r')
    if r_index == -1:
        u_index = answer.find('u')
        if u_index == -1:
            return answer + loop
        return answer[:u_index] + loop + answer[u_index:]
    return answer[:r_index] + loop + answer[r_index:]
