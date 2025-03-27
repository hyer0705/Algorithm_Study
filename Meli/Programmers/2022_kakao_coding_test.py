def solution(alp, cop, problems):
    # 문제들의 최대 알고력과 코딩력 요구사항 계산
    max_alp_req = max(max(problem[0] for problem in problems), alp)
    max_cop_req = max(max(problem[1] for problem in problems), cop)
    
    # DP 테이블 초기화 (150 + 1 크기로 초기화)
    # 각 지점까지 도달하는 최소 시간을 저장
    dp = [[float('inf')] * 151 for _ in range(151)]
    dp[alp][cop] = 0
    
    # 알고력과 코딩력에 대해 반복
    for i in range(alp, max_alp_req + 1):
        for j in range(cop, max_cop_req + 1):
            # 알고력 1 증가
            if i + 1 <= max_alp_req:
                dp[i+1][j] = min(dp[i+1][j], dp[i][j] + 1)
            
            # 코딩력 1 증가
            if j + 1 <= max_cop_req:
                dp[i][j+1] = min(dp[i][j+1], dp[i][j] + 1)
            
            # 각 문제 해결 시도
            for alp_req, cop_req, alp_rwd, cop_rwd, cost in problems:
                # 현재 알고력/코딩력으로 문제를 풀 수 있는 경우
                if i >= alp_req and j >= cop_req:
                    # 문제 해결 후 도달할 수 있는 알고력/코딩력
                    new_alp = min(max_alp_req, i + alp_rwd)
                    new_cop = min(max_cop_req, j + cop_rwd)
                    
                    # 최소 시간 갱신
                    dp[new_alp][new_cop] = min(
                        dp[new_alp][new_cop], 
                        dp[i][j] + cost
                    )
    
    # 최대 알고력/코딩력에 도달하는 최소 시간 반환
    return dp[max_alp_req][max_cop_req]