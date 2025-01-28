class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        '''
        이해하기 힘든 문제였지만..
        요약하면 asteroids 리스트 안에서 
        우측으로 진행하는 양수와 좌측으로 진행하는 음수끼리 충돌이 일어난다.
        따라서 양수가 나오는 부분부터 충돌 처리를 해주었다.
        '''

        # [1] asteroids에서 앞에 있는 음수는 충돌하지 않으므로 answer에 미리 빼둔다.
        n = 0
        length = len(asteroids)
        while n < length and asteroids[n] < 0:
            n += 1
        
        answer = asteroids[:n+1]
        asteroids = asteroids[n+1:]

        # [2] 양수를 차례대로 answer에 담으면서 음수를 만나면 충돌 처리를 진행한다.
        for asteroid in asteroids:
            if asteroid > 0:
                answer.append(asteroid)
            # [3] 음수를 만났을 때 answer 스택에 담긴 부분과 크기를 비교하여 작은 쪽을 없앤다.
            else:
                negative = asteroid
                while answer and answer[-1] > 0:
                    positive = answer[-1]
                    if positive > -negative:
                        negative = 0
                        break
                    elif positive == -negative:
                        answer.pop()
                        negative = 0
                        break
                    elif positive < -negative:
                        answer.pop()
                        continue
                if negative:
                    answer.append(negative)
        
        return answer
