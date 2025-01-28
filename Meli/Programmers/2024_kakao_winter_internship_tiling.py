def solution(n, tops):
    dp = []
    if tops[0]:
        dp.append((4, 1))
    else:
        dp.append((3, 1))
    for i in range(1, n):
        count, dup = dp[-1]
        if tops[i]:
            dp.append((count*4-dup, count))
        else:
            dp.append((count*3-dup, count))
    return dp[-1][0] % 10007