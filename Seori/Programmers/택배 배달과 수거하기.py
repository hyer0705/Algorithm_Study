def solution(cap, n, deliveries, pickups):
    answer = 0
    rest_delivery, rest_pickup = 0, 0
    # [1] 가장 먼 집부터 순차적으로 방문한다.
    #     집 now에서 해결해야할 택배 수는 주어진 값(deliveries, pickups) - 더 먼 집에서 남은 값(rest_delivery, rest_pickup)이다.
    for now in range(n-1, -1, -1):
        round = 0
        next_delivery, next_pickup = deliveries[now] - rest_delivery, pickups[now] - rest_pickup
        
        # [2-1] 해결할 택배가 있는 경우는 배달/수거 대소비교를 통해 더 큰 값만큼 왕복 횟수 round를 정한다.
        if next_delivery >= next_pickup and next_delivery > 0:
            round = ((next_delivery - 1) // cap + 1)
        elif next_pickup > next_delivery and next_pickup > 0:
            round = ((next_pickup - 1) // cap + 1)
        
        # [2-2] 해결할 택배가 없는 경우는 round가 0이 되어 거리 계산을 생략한다.
        answer += 2 * round * (now + 1)
        
        # [2-3] 이후 round만큼 왕복하면서 남은 배달/수거값은 각각 rest_delivery, rest_pickup 변수에 저장한다.
        rest_delivery = cap * round - next_delivery
        rest_pickup = cap * round - next_pickup
            
    return answer