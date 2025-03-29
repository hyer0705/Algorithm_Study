from itertools import product

def solution(users, emoticons):
    # 변수 설정
    가입자 = 0
    최대매출 = 0
    할인율 = [10, 20, 30, 40]

    # [1] product를 사용해서 각 이모티콘과 할인율의 중복순열 경우의 수만큼 완전탐색한다.
    for 할인조합 in list(product(할인율, repeat=len(emoticons))):
        
        # [2] 각 사용자는 할인율에 맞게 이모티콘을 구매하며, 생각한 가격보다 비용이 크다면 서비스에 가입한다.
        가입 = 0
        매출 = 0
        for 비율, 가격 in users:
            비용 = 0
            for i in range(len(emoticons)):
                if 할인조합[i] >= 비율:
                    비용 += (1-할인조합[i]/100)*emoticons[i]
            if 비용 >= 가격:
                가입 += 1
            else:
                매출 += 비용
                
        # [3] 서비스에 가입한 사용자가 가장 많은 경우의 매출을 계산한다.
        if 가입 > 가입자:
            가입자 = 가입
            최대매출 = 매출
        elif 가입 == 가입자:
            최대매출 = max(매출, 최대매출)
            
    answer = [가입자, 최대매출]
    return answer