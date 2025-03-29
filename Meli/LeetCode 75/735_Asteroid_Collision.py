from typing import List

# runtime 39ms, memory 18.7 MB
# time complexity O(n^2)
class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        answer = []
        while asteroids:
            cur_asteroid = asteroids.pop(0)
            if cur_asteroid > 0:
                answer.append(cur_asteroid)
            else:
                add = True
                while answer:
                    if answer[-1] < 0:
                        break
                    if -cur_asteroid > answer[-1]:
                        answer = answer[:-1]
                    elif -cur_asteroid == answer[-1]:
                        answer = answer[:-1]
                        add = False
                        break
                    else:
                        add = False
                        break
                if add:
                    answer.append(cur_asteroid)
        return answer
