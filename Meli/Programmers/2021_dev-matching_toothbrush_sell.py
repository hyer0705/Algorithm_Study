def solution(enroll, referral, seller, amount):
    name_to_index = {name: i for i, name in enumerate(enroll)}
    parent = {enroll[i]: referral[i] for i in range(len(enroll))}
    answer = [0] * len(enroll)

    for s, a in zip(seller, amount):
        profit = a * 100
        current = s

        while current != "-" and profit >= 1:
            idx = name_to_index[current]
            give_up = profit // 10
            answer[idx] += profit - give_up
            profit = give_up
            current = parent[current]

    return answer