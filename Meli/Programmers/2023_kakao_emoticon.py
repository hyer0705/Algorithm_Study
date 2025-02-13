def solution(users, emoticons):
    answer = [0, 0]
    discount = [10, 20, 30, 40]

    def product(*enum, repeat:int):
        pools = [tuple(pool) for pool in enum] * repeat
        result = [[]]
        for pool in pools:
            result = [x+[y] for x in result for y in pool]

        for prod in result:
            yield prod
    
    enum = product(discount, repeat=len(emoticons))

    for discount_list in enum:
        enroll = 0
        revenue = 0
        for user in users:
            discount_limit, cost_limit = user
            cost = 0
            for i, d in enumerate(discount_list):
                if d >= discount_limit:
                    cost += emoticons[i] * (100-d)/100
                if cost >= cost_limit:
                    enroll += 1
                    cost = 0
                    break
            if cost:
                revenue += cost
        
        if answer[0] < enroll:
            answer[0] = enroll
            answer[1] = int(revenue)
        elif answer[0] == enroll:
            answer[1] = max(int(revenue), answer[1])
    
    return answer

print(solution([[40, 10000], [25, 10000]], [7000, 9000]))