# 378ms, 17.9MB
class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        # [1] queue로 사용하기 위해 문자열 senate를 list로 변환한다.
        list_senate = list(senate)
        while list_senate:
            senator = list_senate.pop(0)

            # [2] 다음 투표자가 D인 경우, queue 가장 앞의 R을 퇴출하고 D를 다시 queue에 넣는다.
            #     queue에 더이상 'R'이 없다면 Dire가 승리한다.
            if senator == 'D':
                if 'R' in list_senate:
                    list_senate.remove('R')
                    list_senate.append('D')
                else: return 'Dire'
            
            # [3] 다음 투표자가 R인 경우, queue 가장 앞의 D를 퇴출하고 R을 다시 queue에 넣는다.
            #     queue에 더이상 'D'가 없다면 Radiant가 승리한다.
            elif senator == 'R':
                if 'D' in list_senate:
                    list_senate.remove('D')
                    list_senate.append('R')
                else: return 'Radiant'

# 67ms, 18.3MB 
# 첫 번째 풀이와는 다르게 정당별로 queue를 따로 구현하고, 문자열이 아닌 숫자 인덱스를 사용한다.
class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        # [1] 두 정당의 투표순서 queue를 생성하고 투표순번 index를 저장한다.
        Radiants, Dires = [], []
        for i in range(len(senate)):
            if senate[i] == 'R': Radiants.append(i)
            else: Dires.append(i)
        
        # [2] 두 정당의 맨 앞 투표순서를 비교하고, 투표 처리를 진행한다.
        n = len(senate)
        while Radiants and Dires:
            if Radiants[0] < Dires[0]:
                Radiants.pop(0)
                Dires.pop(0)
                Radiants.append(n)
            else:
                Dires.pop(0)
                Radiants.pop(0)
                Dires.append(n)
            n += 1
        
        # [3] 두 queue중 하나라도 비게 된다면, 비어있지 않은 정당이 승리한다.
        return 'Radiant' if Radiants else 'Dire'