def solution(n, tops):
    '''
    점화식을 찾는 것이 핵심인 문제였다.
    n = 1일 때, tops가 1이면 4가지, 0이면 3가지 경우의 수를 갖는다.
    n = 2 이상일 땐 tops에 따라 앞의 경우에서 4나 3을 곱하면 되는데,
    도형의 마지막이 \_\ 사다리꼴인 경우는 n이 늘어날 때 /_/ 사다리꼴의 경우와 공존할 수 없으므로 그 경우의 수를 빼줘야 한다.
    따라서 빼줘야 하는 경우의 수를 answer[1]에 저장하고 점화식을 적용해서 풀이했다.
    '''
    # n = 1
    if tops[0]:
        answer = [4, 1]
    else: answer = [3, 1]

    # n > 1
    for i in range(1, n):        
        if tops[i]:
            answer = [answer[0] * 4 - answer[1], answer[0]]
        else: answer = [answer[0] * 3 - answer[1], answer[0]]
        
    return answer[0] % 10007